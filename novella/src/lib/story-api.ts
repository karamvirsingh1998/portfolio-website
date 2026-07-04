import type { Story, StoryListResponse } from '@/types';
import { getSessionId } from './session';

export interface DailyUsage {
  storiesCreated: number;
  imagesGenerated: number;
  storiesRemaining: number;
  imagesRemaining: number;
}

export function apiHeaders(extra?: Record<string, string>): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    'x-novella-session': getSessionId(),
    ...extra,
  };
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: {
      ...apiHeaders(),
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error ?? `Request failed (${res.status})`);
  }

  return res.json() as Promise<T>;
}

export function fetchDailyUsage(): Promise<DailyUsage> {
  return apiFetch<DailyUsage>('/api/usage');
}

export function fetchStoryLibrary(limit = 50, offset = 0): Promise<StoryListResponse> {
  return apiFetch<StoryListResponse>(`/api/stories?limit=${limit}&offset=${offset}`);
}

export function fetchStory(id: string): Promise<Story> {
  return apiFetch<Story>(`/api/stories/${id}`);
}

export function saveStory(story: Story): Promise<{ ok: boolean }> {
  return apiFetch<{ ok: boolean }>(`/api/stories/${story.id}`, {
    method: 'PUT',
    body: JSON.stringify(story),
  });
}

export function deleteStory(id: string): Promise<{ ok: boolean }> {
  return apiFetch<{ ok: boolean }>(`/api/stories/${id}`, { method: 'DELETE' });
}

export async function generateStory(body: Record<string, unknown>) {
  return apiFetch<{ title: string; frames: Array<{ frameNumber: number; narration: string; imagePrompt: string }> }>(
    '/api/generate-story',
    { method: 'POST', body: JSON.stringify(body) },
  );
}

export async function generateImage(body: Record<string, unknown>) {
  return apiFetch<{ imageUrl: string; source: 'openai' | 'unsplash' }>(
    '/api/generate-image',
    { method: 'POST', body: JSON.stringify(body) },
  );
}
