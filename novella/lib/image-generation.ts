import type OpenAI from 'openai';
import type { AspectRatio } from '../src/types';

/** OpenAI GPT Image model for panel illustrations. */
export const IMAGE_MODEL = 'gpt-image-1.5';

const MAX_PROMPT_CHARS = 4000;

const ASPECT_TO_SIZE: Record<AspectRatio, '1024x1024' | '1024x1536' | '1536x1024'> = {
  '1:1': '1024x1024',
  '3:4': '1024x1536',
  '4:3': '1536x1024',
  '16:9': '1536x1024',
};

/**
 * Enhances a scene prompt with subject, context, style, and quality modifiers.
 * @see https://platform.openai.com/docs/api-reference/images/create
 */
export function enhanceImagePrompt(scenePrompt: string, aspectRatio: AspectRatio): string {
  let prompt = scenePrompt.trim();

  const hasQuality = /high.?quality|detailed|professional|beautiful|stylized|4k|hdr/i.test(
    prompt,
  );
  if (!hasQuality) {
    prompt = `High-quality, detailed, beautiful illustration. ${prompt}`;
  }

  if (!/\b(1:1|3:4|4:3|16:9|9:16)\b/.test(prompt)) {
    prompt = `${prompt} (${aspectRatio} aspect ratio)`;
  }

  if (prompt.length > MAX_PROMPT_CHARS) {
    prompt = `${prompt.slice(0, MAX_PROMPT_CHARS - 1)}…`;
  }

  return prompt;
}

export interface PanelImageResult {
  imageUrl: string;
  source: 'openai' | 'unsplash';
}

/**
 * Generates a panel image via OpenAI Images API (gpt-image-1.5).
 * Falls back to curated Unsplash URLs when the API is unavailable or fails.
 */
export async function generatePanelImage(
  openai: OpenAI | null,
  imagePrompt: string,
  aspectRatio: AspectRatio,
  fallback: (prompt: string, ratio: AspectRatio) => string,
): Promise<PanelImageResult> {
  const prompt = enhanceImagePrompt(imagePrompt, aspectRatio);

  if (!openai) {
    return { imageUrl: fallback(prompt, aspectRatio), source: 'unsplash' };
  }

  try {
    const response = await openai.images.generate({
      model: IMAGE_MODEL,
      prompt,
      n: 1,
      size: ASPECT_TO_SIZE[aspectRatio],
      quality: 'auto',
      output_format: 'png',
    });

    const b64 = response.data?.[0]?.b64_json;
    if (b64) {
      return { imageUrl: `data:image/png;base64,${b64}`, source: 'openai' };
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn(`OpenAI image generation failed, using fallback: ${message}`);
  }

  return { imageUrl: fallback(prompt, aspectRatio), source: 'unsplash' };
}

/** Prompt instructions for the story-script model to write image-ready visual cues. */
export const IMAGE_PROMPT_GUIDELINES = `
IMAGE PROMPT WRITING (for OpenAI gpt-image-1.5):
Each imagePrompt must be a single descriptive paragraph structured as:
1. SUBJECT — the main character(s) or focal object with specific visual details
2. CONTEXT — background, environment, and scene setting
3. STYLE — the art style modifier (must match the chosen art style)
4. LIGHTING & MOOD — e.g. golden hour, dramatic shadows, soft ambient glow
5. QUALITY — end with modifiers like "high-quality, detailed, professional illustration"

Use vivid adjectives, reference specific materials/textures, and include camera/composition hints
where helpful (close-up, wide-angle, portrait). Do NOT include text overlays in the image.
Maintain character appearance consistency across all panels.`;
