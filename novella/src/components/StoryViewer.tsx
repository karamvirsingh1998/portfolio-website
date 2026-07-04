import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Wand2,
  Pencil,
  LayoutGrid,
  BookOpen,
  Film,
  Save,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from 'lucide-react';
import type { Story, Frame, RenderLayout } from '@/types';
import { SegmentNav } from '@/components/shared';
import {
  AlertBanner,
  Badge,
  Button,
  Card,
  CodeBlock,
  FieldLabel,
  Modal,
  Spinner,
  Textarea,
} from '@/components/ui';

interface StoryViewerProps {
  story: Story;
  isGeneratingImages: boolean;
  isSaving?: boolean;
  onBack: () => void;
  onGenerateAllImages: () => void;
  onUpdateFrame: (frameNumber: number, updates: Partial<Frame>) => void;
  onSaveToLibrary: () => void;
  isSaved: boolean;
}

function EditFrameModal({
  frame,
  onSave,
  onClose,
}: {
  frame: Frame;
  onSave: (narration: string, imagePrompt: string) => void;
  onClose: () => void;
}) {
  const [narration, setNarration] = useState(frame.narration);
  const [imagePrompt, setImagePrompt] = useState(frame.imagePrompt);

  return (
    <Modal
      title={`Edit panel ${frame.frameNumber}`}
      onClose={onClose}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={() => { onSave(narration, imagePrompt); onClose(); }}>
            Save
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <FieldLabel>Narration</FieldLabel>
          <Textarea value={narration} onChange={(e) => setNarration(e.target.value)} rows={4} />
        </div>
        <div>
          <FieldLabel>Scene cue</FieldLabel>
          <Textarea value={imagePrompt} onChange={(e) => setImagePrompt(e.target.value)} rows={5} mono />
        </div>
      </div>
    </Modal>
  );
}

function ComicGridView({ story }: { story: Story }) {
  const cols =
    story.frames.length <= 2 ? 'sm:grid-cols-2' : story.frames.length <= 4 ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-3';

  return (
    <div className={`grid gap-3 ${cols}`}>
      {story.frames.map((frame) => (
        <Card key={frame.frameNumber} className="overflow-hidden">
          <div className="relative aspect-[3/4] bg-black/30">
            {frame.imageUrl ? (
              <img src={frame.imageUrl} alt={`Panel ${frame.frameNumber}`} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-gray-600">No image</div>
            )}
            <Badge variant="accent" className="absolute left-2 top-2">{frame.frameNumber}</Badge>
          </div>
          <p className="p-3 text-xs leading-relaxed text-gray-500">{frame.narration}</p>
        </Card>
      ))}
    </div>
  );
}

function FlipbookView({ story }: { story: Story }) {
  const [page, setPage] = useState(0);
  const frame = story.frames[page];

  return (
    <Card className="overflow-hidden">
      <div className="grid min-h-[400px] md:grid-cols-2">
        <div className="flex flex-col justify-center border-b border-white/[0.06] p-8 md:border-b-0 md:border-r">
          <p className="mb-3 text-xs text-gray-600">
            {page + 1} / {story.frames.length}
          </p>
          <p className="text-base leading-relaxed text-gray-300">{frame?.narration}</p>
          <div className="mt-8 flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>
              <ChevronLeft className="h-4 w-4" /> Prev
            </Button>
            <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.min(story.frames.length - 1, p + 1))} disabled={page === story.frames.length - 1}>
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center bg-black/20 p-6">
          {frame?.imageUrl ? (
            <img src={frame.imageUrl} alt="" className="max-h-[360px] rounded-lg object-contain" />
          ) : (
            <p className="text-sm text-gray-600">No illustration</p>
          )}
        </div>
      </div>
    </Card>
  );
}

function CinematicView({ story }: { story: Story }) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const frame = story.frames[current];

  const next = useCallback(() => setCurrent((c) => (c + 1) % story.frames.length), [story.frames.length]);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [playing, next]);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-black">
      <div className="relative aspect-video">
        <AnimatePresence mode="wait">
          {frame?.imageUrl && (
            <motion.img
              key={frame.frameNumber}
              src={frame.imageUrl}
              alt=""
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <p className="absolute inset-x-0 bottom-0 p-6 text-center text-sm leading-relaxed text-white/90 sm:p-8">
          {frame?.narration}
        </p>
      </div>
      <div className="flex items-center justify-center gap-3 border-t border-white/[0.06] py-3">
        <Button variant="ghost" size="icon" onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="dark" size="icon" onClick={() => setPlaying((p) => !p)}>
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setCurrent((c) => Math.min(story.frames.length - 1, c + 1))} disabled={current === story.frames.length - 1}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default function StoryViewer({
  story,
  isGeneratingImages,
  isSaving = false,
  onBack,
  onGenerateAllImages,
  onUpdateFrame,
  onSaveToLibrary,
  isSaved,
}: StoryViewerProps) {
  const [editingFrame, setEditingFrame] = useState<Frame | null>(null);
  const [layout, setLayout] = useState<RenderLayout>('grid');

  const isDraftMode = story.frames.some((f) => !f.imageUrl);
  const renderedCount = story.frames.filter((f) => f.imageUrl).length;

  const layoutTabs = [
    { id: 'grid' as const, label: 'Grid', icon: LayoutGrid },
    { id: 'flipbook' as const, label: 'Flipbook', icon: BookOpen },
    { id: 'cinematic' as const, label: 'Cinematic', icon: Film },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Button variant="ghost" size="sm" onClick={onBack} className="mb-6 -ml-2">
        <ArrowLeft className="h-4 w-4" />
        New story
      </Button>

      <div className="mb-6">
        <div className="mb-3 flex flex-wrap gap-2">
          <Badge variant="neutral">{story.style}</Badge>
          <Badge variant="neutral">{story.aspectRatio}</Badge>
          <Badge variant="neutral">{story.frames.length} panels</Badge>
          <Badge variant={isDraftMode ? 'draft' : 'ready'}>
            {isDraftMode ? 'Draft' : 'Complete'}
          </Badge>
        </div>
        <h1 className="font-display text-2xl font-semibold text-white">{story.title}</h1>
        <p className="mt-2 text-sm text-gray-500">&ldquo;{story.premise}&rdquo;</p>
      </div>

      {isDraftMode && (
        <>
          <AlertBanner className="mb-6">
            <div>
              <p className="text-sm font-medium text-gray-200">Script ready — review and illustrate</p>
              <p className="mt-1 text-xs text-gray-500">Edit any panel, then generate all artwork.</p>
            </div>
            <Button variant="primary" onClick={onGenerateAllImages} disabled={isGeneratingImages}>
              <Wand2 className="h-4 w-4" />
              {isGeneratingImages ? `Drawing ${renderedCount}/${story.frames.length}…` : 'Draw all panels'}
            </Button>
          </AlertBanner>

          {isGeneratingImages && (
            <div className="mb-6 h-1 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className="h-full bg-blue-500"
                animate={{ width: `${(renderedCount / story.frames.length) * 100}%` }}
              />
            </div>
          )}

          <div className="space-y-3">
            {story.frames.map((frame) => (
              <Card key={frame.frameNumber} className="p-5">
                <div className="mb-4 flex items-center justify-between">
                  <Badge variant="accent">Panel {frame.frameNumber}</Badge>
                  {!frame.isLoading && (
                    <Button variant="ghost" size="sm" onClick={() => setEditingFrame(frame)}>
                      <Pencil className="h-3 w-3" /> Edit
                    </Button>
                  )}
                </div>

                {frame.isLoading && (
                  <div className="mb-3 flex items-center gap-2 text-xs text-blue-400">
                    <Spinner /> Generating…
                  </div>
                )}
                {frame.error && <p className="mb-3 text-xs text-red-400">{frame.error}</p>}

                {frame.imageUrl && (
                  <img src={frame.imageUrl} alt="" className="mb-4 max-w-[200px] rounded-lg" />
                )}

                <p className="text-sm leading-relaxed text-gray-400">{frame.narration}</p>
                <CodeBlock className="mt-3">
                  <p className="font-mono text-xs text-gray-600">{frame.imagePrompt}</p>
                </CodeBlock>
              </Card>
            ))}
          </div>
        </>
      )}

      {!isDraftMode && (
        <>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <SegmentNav items={layoutTabs} value={layout} onChange={setLayout} />
            <Button variant="soft" onClick={onSaveToLibrary} disabled={isSaved || isSaving}>
              <Save className="h-4 w-4" />
              {isSaving ? 'Saving…' : isSaved ? 'Saved' : 'Save to library'}
            </Button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={layout} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {layout === 'grid' && <ComicGridView story={story} />}
              {layout === 'flipbook' && <FlipbookView story={story} />}
              {layout === 'cinematic' && <CinematicView story={story} />}
            </motion.div>
          </AnimatePresence>
        </>
      )}

      {editingFrame && (
        <EditFrameModal
          frame={editingFrame}
          onSave={(narration, imagePrompt) =>
            onUpdateFrame(editingFrame.frameNumber, { narration, imagePrompt })
          }
          onClose={() => setEditingFrame(null)}
        />
      )}
    </motion.div>
  );
}
