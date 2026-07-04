import { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import StoryCreator from '@/components/StoryCreator';
import StoryViewer from '@/components/StoryViewer';
import StoryLibrary from '@/components/StoryLibrary';
import { AppShell, LoadingScreen, ToastContainer } from '@/components/shared';
import {
  deleteStory as deleteStoryApi,
  fetchStory,
  fetchStoryLibrary,
  generateImage,
  generateStory,
  saveStory as saveStoryApi,
} from '@/lib/story-api';
import type {
  Story,
  StorySummary,
  Frame,
  Toast,
  ArtStyle,
  AspectRatio,
} from '@/types';

export default function App() {
  const libraryRef = useRef<HTMLDivElement>(null);
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [library, setLibrary] = useState<StorySummary[]>([]);
  const [libraryTotal, setLibraryTotal] = useState(0);
  const [savedStoryIds, setSavedStoryIds] = useState<Set<string>>(new Set());
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: Toast['type'] = 'info') => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const refreshLibrary = useCallback(async () => {
    try {
      const data = await fetchStoryLibrary();
      setLibrary(data.stories);
      setLibraryTotal(data.total);
      setSavedStoryIds(new Set(data.stories.map((s) => s.id)));
    } catch (err) {
      addToast(
        err instanceof Error ? err.message : 'Failed to load library',
        'error',
      );
    }
  }, [addToast]);

  useEffect(() => {
    refreshLibrary();
  }, [refreshLibrary]);

  const handleGenerateStory = async (params: {
    premise: string;
    style: ArtStyle;
    aspectRatio: AspectRatio;
    numFrames: number;
  }) => {
    setIsGeneratingScript(true);
    addToast('Writing story script and visual descriptions…');

    try {
      const data = await generateStory({
        premise: params.premise,
        style: params.style.name,
        stylePromptAddon: params.style.promptAddon,
        aspectRatio: params.aspectRatio,
        numFrames: params.numFrames,
      });

      const story: Story = {
        id: crypto.randomUUID(),
        title: data.title,
        premise: params.premise,
        style: params.style.name,
        aspectRatio: params.aspectRatio,
        createdAt: new Date().toISOString(),
        frames: data.frames.map((f) => ({
          frameNumber: f.frameNumber,
          narration: f.narration,
          imagePrompt: f.imagePrompt,
          imageUrl: null,
        })),
      };

      setActiveStory(story);
      addToast('Story script drafted! Review your panels.', 'success');
    } catch (err) {
      addToast(
        err instanceof Error ? err.message : 'Story generation failed',
        'error',
      );
    } finally {
      setIsGeneratingScript(false);
    }
  };

  const handleGenerateAllImages = async () => {
    if (!activeStory) return;
    setIsGeneratingImages(true);
    addToast('Rendering panel artwork — this may take a minute…');

    const storyId = activeStory.id;
    const aspectRatio = activeStory.aspectRatio;
    const updatedFrames: Frame[] = [...activeStory.frames];

    for (let i = 0; i < updatedFrames.length; i++) {
      const frame = updatedFrames[i];
      updatedFrames[i] = { ...frame, isLoading: true, error: undefined };
      setActiveStory((prev) => (prev ? { ...prev, frames: [...updatedFrames] } : prev));

      addToast(`Drawing panel ${i + 1} of ${updatedFrames.length}…`);

      try {
        const data = await generateImage({
          imagePrompt: frame.imagePrompt,
          aspectRatio,
          storyId,
          frameNumber: frame.frameNumber,
        });
        updatedFrames[i] = {
          ...frame,
          imageUrl: data.imageUrl,
          isLoading: false,
        };
      } catch (err) {
        updatedFrames[i] = {
          ...frame,
          isLoading: false,
          error: err instanceof Error ? err.message : 'Failed to generate image',
        };
      }

      setActiveStory((prev) => (prev ? { ...prev, frames: [...updatedFrames] } : prev));
    }

    setIsGeneratingImages(false);
    addToast('All panel artwork complete!', 'success');
  };

  const handleUpdateFrame = (frameNumber: number, updates: Partial<Frame>) => {
    setActiveStory((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        frames: prev.frames.map((f) =>
          f.frameNumber === frameNumber ? { ...f, ...updates } : f,
        ),
      };
    });
  };

  const handleSaveToLibrary = async () => {
    if (!activeStory || isSaving) return;

    const allRendered = activeStory.frames.every((f) => f.imageUrl);
    if (!allRendered) {
      addToast('Finish illustrating all panels before saving.', 'error');
      return;
    }

    setIsSaving(true);
    try {
      await saveStoryApi(activeStory);
      setSavedStoryIds((prev) => new Set(prev).add(activeStory.id));
      await refreshLibrary();
      addToast('Story saved to your library!', 'success');
      libraryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (err) {
      addToast(
        err instanceof Error ? err.message : 'Failed to save story',
        'error',
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenStory = async (summary: StorySummary) => {
    try {
      const story = await fetchStory(summary.id);
      setActiveStory(story);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      addToast(
        err instanceof Error ? err.message : 'Failed to open story',
        'error',
      );
    }
  };

  const handleDeleteStory = async (id: string) => {
    try {
      await deleteStoryApi(id);
      if (activeStory?.id === id) {
        setActiveStory(null);
      }
      await refreshLibrary();
      addToast('Story removed from library.');
    } catch (err) {
      addToast(
        err instanceof Error ? err.message : 'Failed to delete story',
        'error',
      );
    }
  };

  const handleBack = () => {
    setActiveStory(null);
  };

  return (
    <AppShell>
      <div className="mb-10 text-center">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Create a <span className="nv-gradient-text">visual story</span>
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-gray-500">
          Write a premise, pick a style, and Novella will script and illustrate every panel.
        </p>
      </div>

      {isGeneratingScript ? (
        <LoadingScreen message="The AI is planning the storyboard sequence, writing narrations, and creating visual cues. This takes about 5–10 seconds." />
      ) : activeStory ? (
        <StoryViewer
          story={activeStory}
          isGeneratingImages={isGeneratingImages}
          isSaving={isSaving}
          onBack={handleBack}
          onGenerateAllImages={handleGenerateAllImages}
          onUpdateFrame={handleUpdateFrame}
          onSaveToLibrary={handleSaveToLibrary}
          isSaved={savedStoryIds.has(activeStory.id)}
        />
      ) : (
        <StoryCreator onGenerate={handleGenerateStory} isGenerating={isGeneratingScript} />
      )}

      <div ref={libraryRef} className="mt-16 border-t border-white/[0.06] pt-12">
        <StoryLibrary
          stories={library}
          total={libraryTotal}
          activeStoryId={activeStory?.id ?? null}
          onOpenStory={handleOpenStory}
          onDeleteStory={handleDeleteStory}
        />
      </div>

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </AppShell>
  );
}
