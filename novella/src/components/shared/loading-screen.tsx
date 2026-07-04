import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { Spinner } from '@/components/ui';

export function LoadingScreen({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center py-24 text-center"
    >
      <Spinner className="mb-6 h-8 w-8 border-2" />
      <h2 className="font-display text-lg font-semibold text-white">
        Writing your storyboard
      </h2>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-500">{message}</p>
      <Sparkles className="mt-6 h-4 w-4 animate-pulse text-blue-500/50" />
    </motion.div>
  );
}
