import { motion, AnimatePresence } from 'motion/react';
import { Trash2, ArrowRight, BookOpen, Calendar } from 'lucide-react';
import type { StorySummary } from '@/types';
import { EmptyState, PageHeader } from '@/components/shared';
import { Badge, Button, Card, IconButton, styleBadgeVariant } from '@/components/ui';

interface StoryLibraryProps {
  stories: StorySummary[];
  total: number;
  activeStoryId: string | null;
  onOpenStory: (story: StorySummary) => void;
  onDeleteStory: (id: string) => void;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function StoryLibrary({
  stories,
  total,
  activeStoryId,
  onOpenStory,
  onDeleteStory,
}: StoryLibraryProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PageHeader
        title="Library"
        description="Your saved stories."
        action={<Badge variant="pill">{total}</Badge>}
      />

      {stories.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="No stories yet"
          description="Generate a story and save it here."
        />
      ) : (
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {stories.map((story) => {
              const isActive = story.id === activeStoryId;
              const coverUrl =
                story.coverUrl ??
                'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=200&h=200&fit=crop';

              return (
                <motion.div
                  key={story.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Card
                    className={`flex gap-4 p-4 transition-colors hover:bg-white/[0.04] ${
                      isActive ? 'ring-1 ring-blue-500/40' : ''
                    }`}
                  >
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-black/30">
                      <img src={coverUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-1.5 flex flex-wrap gap-1.5">
                        <Badge variant={styleBadgeVariant(story.style)}>{story.style}</Badge>
                        <Badge variant="neutral">{story.panelCount} panels</Badge>
                      </div>
                      <h3 className="truncate font-medium text-white">{story.title}</h3>
                      <p className="mt-0.5 line-clamp-1 text-xs text-gray-600">{story.premise}</p>

                      <div className="mt-3 flex items-center justify-between">
                        <span className="flex items-center gap-1 text-[11px] text-gray-600">
                          <Calendar className="h-3 w-3" />
                          {formatDate(story.createdAt)}
                        </span>
                        <div className="flex items-center gap-1">
                          <IconButton
                            onClick={() => onDeleteStory(story.id)}
                            className="hover:text-red-400"
                            aria-label="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </IconButton>
                          {isActive ? (
                            <Badge variant="soft">Viewing</Badge>
                          ) : (
                            <Button variant="outline" size="sm" onClick={() => onOpenStory(story)}>
                              Open <ArrowRight className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
