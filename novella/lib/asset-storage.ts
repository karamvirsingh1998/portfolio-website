import path from 'path';
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STORAGE_ROOT = process.env.VERCEL
  ? '/tmp/novella/assets'
  : path.resolve(__dirname, '../storage/assets');

mkdirSync(STORAGE_ROOT, { recursive: true });

export function storyAssetDir(storyId: string): string {
  const dir = path.join(STORAGE_ROOT, 'stories', storyId);
  mkdirSync(dir, { recursive: true });
  return dir;
}

export function panelFileName(frameNumber: number): string {
  return `panel-${frameNumber}.png`;
}

export function panelAssetPath(storyId: string, frameNumber: number): string {
  return path.join(storyAssetDir(storyId), panelFileName(frameNumber));
}

export function panelPublicUrl(storyId: string, frameNumber: number): string {
  return `/api/assets/stories/${storyId}/${panelFileName(frameNumber)}`;
}

export function savePanelImage(
  storyId: string,
  frameNumber: number,
  buffer: Buffer,
): string {
  const filePath = panelAssetPath(storyId, frameNumber);
  writeFileSync(filePath, buffer);
  return panelPublicUrl(storyId, frameNumber);
}

export function deleteStoryAssets(storyId: string): void {
  const dir = path.join(STORAGE_ROOT, 'stories', storyId);
  if (existsSync(dir)) {
    rmSync(dir, { recursive: true, force: true });
  }
}

export function parseDataUrl(dataUrl: string): Buffer | null {
  const match = /^data:image\/\w+;base64,(.+)$/.exec(dataUrl);
  if (!match) return null;
  return Buffer.from(match[1], 'base64');
}

export const assetsRoot = STORAGE_ROOT;
