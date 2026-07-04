export type AspectRatio = '1:1' | '3:4' | '4:3' | '16:9';

export interface Frame {
  frameNumber: number;
  narration: string;
  imagePrompt: string;
  imageUrl?: string | null;
  isLoading?: boolean;
  error?: string;
}

export interface Story {
  id: string;
  title: string;
  premise: string;
  style: string;
  aspectRatio: AspectRatio;
  frames: Frame[];
  createdAt: string;
}

export interface ArtStyle {
  id: string;
  name: string;
  description: string;
  promptAddon: string;
  previewUrl: string;
  bgColor: string;
}

export type ViewTab = 'craft' | 'library';

export type RenderLayout = 'grid' | 'flipbook' | 'cinematic';

export interface Toast {
  id: string;
  message: string;
  type: 'info' | 'success' | 'error';
}

export interface GenerateStoryRequest {
  premise: string;
  style: string;
  stylePromptAddon: string;
  aspectRatio: AspectRatio;
  numFrames: number;
}

export interface GenerateStoryResponse {
  title: string;
  frames: Array<{
    frameNumber: number;
    narration: string;
    imagePrompt: string;
  }>;
}

export interface GenerateImageRequest {
  imagePrompt: string;
  aspectRatio: AspectRatio;
  storyId: string;
  frameNumber: number;
}

export interface GenerateImageResponse {
  imageUrl: string;
  source: 'openai' | 'unsplash';
}

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

export interface StoryListResponse {
  stories: StorySummary[];
  total: number;
}
