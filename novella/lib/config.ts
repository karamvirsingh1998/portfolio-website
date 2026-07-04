function intEnv(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) return fallback;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

/** App config — tuned for ~10 active users/day on a single server. */
export const config = {
  port: intEnv('PORT', 3000),
  isProd: process.env.NODE_ENV === 'production',

  /** Max stories a session can generate per UTC day. */
  dailyStoryLimit: intEnv('DAILY_STORY_LIMIT', 5),

  /** Max panel images a session can generate per UTC day. */
  dailyImageLimit: intEnv('DAILY_IMAGE_LIMIT', 30),

  /** Burst guard: story generations per session per hour. */
  hourlyStoryBurst: intEnv('HOURLY_STORY_BURST', 10),

  /** Burst guard: image generations per session per hour. */
  hourlyImageBurst: intEnv('HOURLY_IMAGE_BURST', 60),
} as const;
