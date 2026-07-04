import type { AspectRatio, Story } from '../src/types';
import { db } from './db';

export interface StorySummary {
  id: string;
  title: string;
  premise: string;
  style: string;
  aspectRatio: AspectRatio;
  panelCount: number;
  coverUrl: string | null;
  createdAt: string;
}

function rowToStory(
  storyRow: {
    id: string;
    title: string;
    premise: string;
    style: string;
    aspect_ratio: string;
    created_at: string;
  },
  frameRows: Array<{
    frame_number: number;
    narration: string;
    image_prompt: string;
    image_url: string | null;
  }>,
): Story {
  return {
    id: storyRow.id,
    title: storyRow.title,
    premise: storyRow.premise,
    style: storyRow.style,
    aspectRatio: storyRow.aspect_ratio as AspectRatio,
    createdAt: storyRow.created_at,
    frames: frameRows
      .sort((a, b) => a.frame_number - b.frame_number)
      .map((f) => ({
        frameNumber: f.frame_number,
        narration: f.narration,
        imagePrompt: f.image_prompt,
        imageUrl: f.image_url,
      })),
  };
}

export function upsertStory(sessionId: string, story: Story): void {
  const now = new Date().toISOString();
  const createdAt = story.createdAt || now;

  const existing = db
    .prepare('SELECT session_id FROM stories WHERE id = ?')
    .get(story.id) as { session_id: string } | undefined;

  if (existing && existing.session_id !== sessionId) {
    throw new Error('Story belongs to another session');
  }

  const upsertStoryStmt = db.prepare(`
    INSERT INTO stories (id, session_id, title, premise, style, aspect_ratio, created_at, updated_at)
    VALUES (@id, @sessionId, @title, @premise, @style, @aspectRatio, @createdAt, @updatedAt)
    ON CONFLICT(id) DO UPDATE SET
      title = excluded.title,
      premise = excluded.premise,
      style = excluded.style,
      aspect_ratio = excluded.aspect_ratio,
      updated_at = excluded.updated_at
  `);

  const deleteFrames = db.prepare('DELETE FROM frames WHERE story_id = ?');
  const insertFrame = db.prepare(`
    INSERT INTO frames (story_id, frame_number, narration, image_prompt, image_url)
    VALUES (@storyId, @frameNumber, @narration, @imagePrompt, @imageUrl)
  `);

  const tx = db.transaction(() => {
    upsertStoryStmt.run({
      id: story.id,
      sessionId,
      title: story.title,
      premise: story.premise,
      style: story.style,
      aspectRatio: story.aspectRatio,
      createdAt,
      updatedAt: now,
    });
    deleteFrames.run(story.id);
    for (const frame of story.frames) {
      insertFrame.run({
        storyId: story.id,
        frameNumber: frame.frameNumber,
        narration: frame.narration,
        imagePrompt: frame.imagePrompt,
        imageUrl: frame.imageUrl ?? null,
      });
    }
  });

  tx();
}

export function listStories(
  sessionId: string,
  limit = 20,
  offset = 0,
): { stories: StorySummary[]; total: number } {
  const total = db
    .prepare('SELECT COUNT(*) as count FROM stories WHERE session_id = ?')
    .get(sessionId) as { count: number };

  const rows = db
    .prepare(
      `
      SELECT s.id, s.title, s.premise, s.style, s.aspect_ratio, s.created_at,
        (SELECT COUNT(*) FROM frames f WHERE f.story_id = s.id) as panel_count,
        (SELECT f.image_url FROM frames f WHERE f.story_id = s.id AND f.image_url IS NOT NULL
         ORDER BY f.frame_number LIMIT 1) as cover_url
      FROM stories s
      WHERE s.session_id = ?
      ORDER BY s.created_at DESC
      LIMIT ? OFFSET ?
    `,
    )
    .all(sessionId, limit, offset) as Array<{
      id: string;
      title: string;
      premise: string;
      style: string;
      aspect_ratio: string;
      created_at: string;
      panel_count: number;
      cover_url: string | null;
    }>;

  return {
    total: total.count,
    stories: rows.map((r) => ({
      id: r.id,
      title: r.title,
      premise: r.premise,
      style: r.style,
      aspectRatio: r.aspect_ratio as AspectRatio,
      panelCount: r.panel_count,
      coverUrl: r.cover_url,
      createdAt: r.created_at,
    })),
  };
}

export function getStory(sessionId: string, storyId: string): Story | null {
  const storyRow = db
    .prepare('SELECT * FROM stories WHERE id = ? AND session_id = ?')
    .get(storyId, sessionId) as
    | {
        id: string;
        title: string;
        premise: string;
        style: string;
        aspect_ratio: string;
        created_at: string;
      }
    | undefined;

  if (!storyRow) return null;

  const frameRows = db
    .prepare('SELECT * FROM frames WHERE story_id = ? ORDER BY frame_number')
    .all(storyId) as Array<{
      frame_number: number;
      narration: string;
      image_prompt: string;
      image_url: string | null;
    }>;

  return rowToStory(storyRow, frameRows);
}

export function deleteStory(sessionId: string, storyId: string): boolean {
  const result = db
    .prepare('DELETE FROM stories WHERE id = ? AND session_id = ?')
    .run(storyId, sessionId);
  return result.changes > 0;
}
