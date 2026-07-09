import { loadEnv } from '../novella/lib/load-env';
import { createApp } from '../novella/lib/create-app';

loadEnv();

const app = createApp();

/** CJS export (.cjs) — root package.json is ESM so .js would be misread as ESM. */
module.exports = app;
