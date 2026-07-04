import type { GenerateStoryRequest } from '../src/types';
import { IMAGE_PROMPT_GUIDELINES } from './image-generation';
import { getOpenAI } from './openai';

export const STORY_MODEL = 'gpt-4.1-mini';

const STORY_SCHEMA = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    frames: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          frameNumber: { type: 'number' },
          narration: { type: 'string' },
          imagePrompt: { type: 'string' },
        },
        required: ['frameNumber', 'narration', 'imagePrompt'],
        additionalProperties: false,
      },
    },
  },
  required: ['title', 'frames'],
  additionalProperties: false,
} as const;

export interface StoryGenerationResult {
  title: string;
  frames: Array<{
    frameNumber: number;
    narration: string;
    imagePrompt: string;
  }>;
}

function buildStoryPrompt(req: GenerateStoryRequest): string {
  const { premise, style, stylePromptAddon, aspectRatio, numFrames } = req;

  return `Create a ${numFrames}-panel illustrated story.

PREMISE: ${premise}
ART STYLE: ${style} — ${stylePromptAddon}
ASPECT RATIO: ${aspectRatio}

Requirements:
- Write a compelling title for the story
- Create exactly ${numFrames} sequential storyboard panels
- Each panel needs a vivid narration caption (2-4 sentences, literary prose)
- Panels must tell a complete narrative arc with clear beginning, middle, and end
- Maintain visual and character consistency across all panels
${IMAGE_PROMPT_GUIDELINES}`;
}

export async function generateStoryScript(
  req: GenerateStoryRequest,
): Promise<StoryGenerationResult> {
  const openai = getOpenAI();
  if (!openai) {
    throw new Error('OPENAI_API_KEY is not configured. Add it to your .env file.');
  }

  const response = await openai.chat.completions.create({
    model: STORY_MODEL,
    messages: [
      {
        role: 'system',
        content:
          'You are a master storyteller and visual storyboard director. Return only valid JSON matching the provided schema.',
      },
      { role: 'user', content: buildStoryPrompt(req) },
    ],
    response_format: {
      type: 'json_schema',
      json_schema: {
        name: 'storyboard',
        strict: true,
        schema: STORY_SCHEMA,
      },
    },
  });

  const text = response.choices[0]?.message?.content;
  if (!text) {
    throw new Error('Empty response from GPT-4.1 mini');
  }

  const parsed = JSON.parse(text) as StoryGenerationResult;

  parsed.frames = parsed.frames
    .slice(0, req.numFrames)
    .map((frame, i) => ({
      ...frame,
      frameNumber: i + 1,
    }));

  return parsed;
}
