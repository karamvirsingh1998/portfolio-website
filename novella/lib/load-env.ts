import { readFileSync, existsSync } from 'fs';
import path from 'path';

/** Loads `novella/.env` into process.env (does not override existing vars). */
export function loadEnv(): void {
  if (process.env.VERCEL) return;

  const envPath = path.resolve(process.cwd(), 'novella/.env');
  if (!existsSync(envPath)) return;

  for (const line of readFileSync(envPath, 'utf-8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}
