import type { Express } from 'express';
import type { AspectRatio, GenerateStoryRequest } from '../src/types';
import { config } from './config';
import { generatePanelImage } from './image-generation';
import { getOpenAI } from './openai';
import { generateStoryScript } from './story-generation';
import { parseDataUrl, savePanelImage } from './asset-storage';
import { burstLimit } from './middleware/rate-limit';
import { getSessionId, requireSession } from './middleware/session';
import {
  assertImageQuota,
  assertStoryQuota,
  QuotaError,
  recordImageGenerated,
  recordStoryCreated,
} from './usage-store';

const CURATED_UNSPLASH: Record<string, string> = {
  robot:
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=1067&fit=crop',
  forest:
    'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=1067&fit=crop',
  city: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop',
  neon: 'https://images.unsplash.com/photo-1550745165-9bc0b4b6836e?w=800&h=600&fit=crop',
  space:
    'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&h=600&fit=crop',
  ocean:
    'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop',
  mountain:
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  fantasy:
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=1067&fit=crop',
  clock:
    'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800&h=1067&fit=crop',
  bakery:
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop',
  default:
    'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800&h=1067&fit=crop',
};

const ASPECT_DIMENSIONS: Record<AspectRatio, { w: number; h: number }> = {
  '1:1': { w: 800, h: 800 },
  '3:4': { w: 800, h: 1067 },
  '4:3': { w: 800, h: 600 },
  '16:9': { w: 1280, h: 720 },
};

function extractKeywords(text: string): string[] {
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
    'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
    'could', 'should', 'may', 'might', 'must', 'shall', 'can', 'this',
    'that', 'these', 'those', 'it', 'its', 'they', 'them', 'their', 'he',
    'she', 'his', 'her', 'as', 'into', 'through', 'during', 'before',
    'after', 'above', 'below', 'between', 'under', 'again', 'further',
    'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all',
    'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor',
    'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'just',
    'style', 'aspect', 'ratio', 'illustration', 'image', 'scene', 'panel',
  ]);

  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 3 && !stopWords.has(w))
    .slice(0, 5);
}

function getUnsplashFallback(prompt: string, aspectRatio: AspectRatio): string {
  const keywords = extractKeywords(prompt);
  const { w, h } = ASPECT_DIMENSIONS[aspectRatio];

  for (const keyword of keywords) {
    for (const [key, url] of Object.entries(CURATED_UNSPLASH)) {
      if (keyword.includes(key) || key.includes(keyword)) {
        return url.replace(/w=\d+&h=\d+/, `w=${w}&h=${h}`);
      }
    }
  }

  const query = keywords.slice(0, 3).join(',') || 'fantasy,story,art';
  return `https://source.unsplash.com/${w}x${h}/?${encodeURIComponent(query)}`;
}

export function registerAiRoutes(app: Express): void {
  app.post(
    '/api/generate-story',
    requireSession,
    burstLimit('story', config.hourlyStoryBurst),
    async (req, res) => {
      try {
        const sessionId = getSessionId(res);
        assertStoryQuota(sessionId);

        const body = req.body as GenerateStoryRequest;
        if (!body.premise?.trim()) {
          res.status(400).json({ error: 'Premise is required' });
          return;
        }

        const parsed = await generateStoryScript(body);
        recordStoryCreated(sessionId);
        res.json(parsed);
      } catch (err) {
        if (err instanceof QuotaError) {
          res.status(429).json({ error: err.message });
          return;
        }
        console.error('generate-story error:', err);
        res.status(500).json({
          error: err instanceof Error ? err.message : 'Failed to generate story',
        });
      }
    },
  );

  app.post(
    '/api/generate-image',
    requireSession,
    burstLimit('image', config.hourlyImageBurst),
    async (req, res) => {
      try {
        const sessionId = getSessionId(res);
        assertImageQuota(sessionId);

        const { imagePrompt, aspectRatio, storyId, frameNumber } = req.body as {
          imagePrompt: string;
          aspectRatio: AspectRatio;
          storyId?: string;
          frameNumber?: number;
        };

        if (!imagePrompt?.trim()) {
          res.status(400).json({ error: 'imagePrompt is required' });
          return;
        }

        const result = await generatePanelImage(
          getOpenAI(),
          imagePrompt,
          aspectRatio,
          getUnsplashFallback,
        );

        let imageUrl = result.imageUrl;

        if (storyId && frameNumber != null && imageUrl.startsWith('data:')) {
          const buffer = parseDataUrl(imageUrl);
          if (buffer) {
            imageUrl = savePanelImage(storyId, frameNumber, buffer);
          }
        }

        recordImageGenerated(sessionId);
        res.json({ imageUrl, source: result.source });
      } catch (err) {
        if (err instanceof QuotaError) {
          res.status(429).json({ error: err.message });
          return;
        }
        console.error('generate-image error:', err);
        res.status(500).json({
          error: err instanceof Error ? err.message : 'Failed to generate image',
        });
      }
    },
  );
}
