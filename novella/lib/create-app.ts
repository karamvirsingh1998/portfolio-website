import express from 'express';
import { registerAiRoutes } from './ai-routes';
import { registerStoryRoutes } from './story-routes';
import { assetsRoot } from './asset-storage';
import { config } from './config';

/** Express app with Novella API routes only (no static UI). */
export function createApp(): express.Express {
  const app = express();
  app.use(express.json({ limit: '2mb' }));

  app.use(
    '/api/assets',
    express.static(assetsRoot, {
      maxAge: config.isProd ? '7d' : 0,
      immutable: config.isProd,
    }),
  );

  registerStoryRoutes(app);
  registerAiRoutes(app);

  return app;
}
