import type { Express } from 'express';
import type { Story } from '../src/types';
import {
  deleteStory,
  getStory,
  listStories,
  upsertStory,
  type StorySummary,
} from './story-store';
import { deleteStoryAssets } from './asset-storage';
import { getSessionId, requireSession } from './middleware/session';
import { getDailyUsage } from './usage-store';

export function registerStoryRoutes(app: Express): void {
  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'novella' });
  });

  app.get('/api/usage', requireSession, (_req, res) => {
    try {
      const sessionId = getSessionId(res);
      res.json(getDailyUsage(sessionId));
    } catch (err) {
      console.error('usage error:', err);
      res.status(500).json({ error: 'Failed to load usage' });
    }
  });

  app.get('/api/stories', requireSession, (req, res) => {
    try {
      const sessionId = getSessionId(res);
      const limit = Math.min(Number(req.query.limit) || 20, 100);
      const offset = Math.max(Number(req.query.offset) || 0, 0);
      const result = listStories(sessionId, limit, offset);
      res.json(result);
    } catch (err) {
      console.error('list stories error:', err);
      res.status(500).json({ error: 'Failed to load library' });
    }
  });

  app.get('/api/stories/:id', requireSession, (req, res) => {
    try {
      const sessionId = getSessionId(res);
      const story = getStory(sessionId, req.params.id);
      if (!story) {
        res.status(404).json({ error: 'Story not found' });
        return;
      }
      res.json(story);
    } catch (err) {
      console.error('get story error:', err);
      res.status(500).json({ error: 'Failed to load story' });
    }
  });

  app.put('/api/stories/:id', requireSession, (req, res) => {
    try {
      const sessionId = getSessionId(res);
      const story = req.body as Story;
      if (!story?.title || !Array.isArray(story.frames)) {
        res.status(400).json({ error: 'Invalid story payload' });
        return;
      }
      if (story.id !== req.params.id) {
        res.status(400).json({ error: 'Story id mismatch' });
        return;
      }
      upsertStory(sessionId, story);
      res.json({ ok: true });
    } catch (err) {
      console.error('save story error:', err);
      res.status(500).json({ error: 'Failed to save story' });
    }
  });

  app.delete('/api/stories/:id', requireSession, (req, res) => {
    try {
      const sessionId = getSessionId(res);
      const removed = deleteStory(sessionId, req.params.id);
      if (!removed) {
        res.status(404).json({ error: 'Story not found' });
        return;
      }
      deleteStoryAssets(req.params.id);
      res.json({ ok: true });
    } catch (err) {
      console.error('delete story error:', err);
      res.status(500).json({ error: 'Failed to delete story' });
    }
  });
}

export type { StorySummary };
