import { config } from './config';
import { db } from './db';

export interface DailyUsage {
  storiesCreated: number;
  imagesGenerated: number;
  storiesRemaining: number;
  imagesRemaining: number;
}

function todayUtc(): string {
  return new Date().toISOString().slice(0, 10);
}

function getCounts(sessionId: string, usageDate: string): { stories: number; images: number } {
  const row = db
    .prepare(
      `SELECT stories_created, images_generated FROM usage_daily
       WHERE session_id = ? AND usage_date = ?`,
    )
    .get(sessionId, usageDate) as
    | { stories_created: number; images_generated: number }
    | undefined;

  return {
    stories: row?.stories_created ?? 0,
    images: row?.images_generated ?? 0,
  };
}

export function getDailyUsage(sessionId: string): DailyUsage {
  const usageDate = todayUtc();
  const { stories, images } = getCounts(sessionId, usageDate);

  return {
    storiesCreated: stories,
    imagesGenerated: images,
    storiesRemaining: Math.max(0, config.dailyStoryLimit - stories),
    imagesRemaining: Math.max(0, config.dailyImageLimit - images),
  };
}

export function assertStoryQuota(sessionId: string): void {
  const { storiesRemaining } = getDailyUsage(sessionId);
  if (storiesRemaining <= 0) {
    throw new QuotaError(
      `Daily story limit reached (${config.dailyStoryLimit}/day). Try again tomorrow.`,
    );
  }
}

export function assertImageQuota(sessionId: string): void {
  const { imagesRemaining } = getDailyUsage(sessionId);
  if (imagesRemaining <= 0) {
    throw new QuotaError(
      `Daily image limit reached (${config.dailyImageLimit}/day). Try again tomorrow.`,
    );
  }
}

export function recordStoryCreated(sessionId: string): void {
  const usageDate = todayUtc();
  db.prepare(
    `INSERT INTO usage_daily (session_id, usage_date, stories_created, images_generated)
     VALUES (?, ?, 1, 0)
     ON CONFLICT(session_id, usage_date) DO UPDATE SET
       stories_created = stories_created + 1`,
  ).run(sessionId, usageDate);
}

export function recordImageGenerated(sessionId: string): void {
  const usageDate = todayUtc();
  db.prepare(
    `INSERT INTO usage_daily (session_id, usage_date, stories_created, images_generated)
     VALUES (?, ?, 0, 1)
     ON CONFLICT(session_id, usage_date) DO UPDATE SET
       images_generated = images_generated + 1`,
  ).run(sessionId, usageDate);
}

export class QuotaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'QuotaError';
  }
}
