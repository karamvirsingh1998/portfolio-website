import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { loadEnv } from '../novella/lib/load-env';
import { registerAiRoutes } from '../novella/lib/ai-routes';
import { registerStoryRoutes } from '../novella/lib/story-routes';
import { assetsRoot } from '../novella/lib/asset-storage';
import { config } from '../novella/lib/config';

loadEnv();

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const novellaRoot = path.join(root, 'novella');

function mountApi(app: express.Express) {
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
}

async function start() {
  const app = express();
  mountApi(app);

  const novellaVite = await createViteServer({
    root: novellaRoot,
    configFile: path.join(novellaRoot, 'vite.config.ts'),
    server: { middlewareMode: true, hmr: { port: 24681 } },
    appType: 'spa',
    base: '/novella/',
  });

  const portfolioVite = await createViteServer({
    root,
    configFile: path.join(root, 'vite.config.js'),
    server: { middlewareMode: true, hmr: { port: 24679 } },
    appType: 'spa',
  });

  app.use((req, res, next) => {
    if (req.url === '/novella' || req.url?.startsWith('/novella/')) {
      return novellaVite.middlewares(req, res, next);
    }
    return portfolioVite.middlewares(req, res, next);
  });

  const port = 5173;
  app.listen(port, () => {
    console.log(`Portfolio  http://localhost:${port}/`);
    console.log(`Novella    http://localhost:${port}/novella/`);
  });
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
