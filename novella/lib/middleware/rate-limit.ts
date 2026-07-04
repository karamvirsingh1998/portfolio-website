import type { Request, Response, NextFunction } from 'express';
import { getSessionId } from './session';

interface WindowCounter {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, WindowCounter>();

const HOUR_MS = 60 * 60 * 1000;

function checkBurst(key: string, limit: number): boolean {
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || now >= entry.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + HOUR_MS });
    return true;
  }

  if (entry.count >= limit) return false;
  entry.count += 1;
  return true;
}

/** In-memory hourly burst limiter — fine for single-server / low traffic. */
export function burstLimit(kind: 'story' | 'image', limit: number) {
  return (_req: Request, res: Response, next: NextFunction): void => {
    const sessionId = getSessionId(res);
    const key = `${kind}:${sessionId}`;

    if (!checkBurst(key, limit)) {
      res.status(429).json({
        error: 'Too many requests. Please wait a bit before trying again.',
      });
      return;
    }

    next();
  };
}

/** Prevent unbounded Map growth from abandoned sessions. */
export function pruneBurstBuckets(): void {
  const now = Date.now();
  for (const [key, entry] of buckets) {
    if (now >= entry.resetAt) buckets.delete(key);
  }
}

setInterval(pruneBurstBuckets, HOUR_MS).unref();
