import serverless from 'serverless-http';
import { loadEnv } from '../novella/lib/load-env';
import { createApp } from '../novella/lib/create-app';

loadEnv();

const app = createApp();
export default serverless(app);
