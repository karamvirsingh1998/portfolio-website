import { loadEnv } from '../novella/lib/load-env';
import { createApp } from '../novella/lib/create-app';

loadEnv();

/** Vercel @vercel/node runs Express apps via default export. */
export default createApp();
