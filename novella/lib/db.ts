import Database from 'better-sqlite3';
import path from 'path';
import { mkdirSync } from 'fs';

const DATA_DIR = process.env.VERCEL
  ? '/tmp/novella'
  : path.resolve(process.cwd(), 'novella/storage');
const DB_PATH = path.join(DATA_DIR, 'novella.db');

mkdirSync(DATA_DIR, { recursive: true });

export const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS stories (
    id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL,
    title TEXT NOT NULL,
    premise TEXT NOT NULL,
    style TEXT NOT NULL,
    aspect_ratio TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS frames (
    story_id TEXT NOT NULL,
    frame_number INTEGER NOT NULL,
    narration TEXT NOT NULL,
    image_prompt TEXT NOT NULL,
    image_url TEXT,
    PRIMARY KEY (story_id, frame_number),
    FOREIGN KEY (story_id) REFERENCES stories(id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_stories_session_created
    ON stories(session_id, created_at DESC);

  CREATE TABLE IF NOT EXISTS usage_daily (
    session_id TEXT NOT NULL,
    usage_date TEXT NOT NULL,
    stories_created INTEGER NOT NULL DEFAULT 0,
    images_generated INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (session_id, usage_date)
  );
`);
