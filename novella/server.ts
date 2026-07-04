import { loadEnv } from './lib/load-env';

loadEnv();

import express from 'express';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';
import { registerAiRoutes } from './lib/ai-routes';
import { registerStoryRoutes } from './lib/story-routes';
import { assetsRoot } from './lib/asset-storage';
import { config } from './lib/config';

const serverDir = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(serverDir, 'dist');

async function startServer() {
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

  if (config.isProd) {
    app.use(express.static(distPath, { index: false }));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      root: serverDir,
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(config.port, () => {
    console.log(`Novella running at http://localhost:${config.port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
