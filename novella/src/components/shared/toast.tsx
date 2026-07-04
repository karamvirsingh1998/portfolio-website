import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Info, X, XCircle } from 'lucide-react';
import { cn } from '@/lib/cn';
import { IconButton } from '@/components/ui';
import type { Toast } from '@/types';

const CONFIG = {
  error: { Icon: XCircle, color: 'text-red-400' },
  success: { Icon: CheckCircle2, color: 'text-emerald-400' },
  info: { Icon: Info, color: 'text-blue-400' },
};

interface ToastContainerProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => {
          const { Icon, color } = CONFIG[toast.type];
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="nv-surface-elevated flex max-w-xs items-center gap-3 px-4 py-3"
            >
              <Icon className={cn('h-4 w-4 shrink-0', color)} />
              <p className="flex-1 text-sm text-gray-300">{toast.message}</p>
              <IconButton onClick={() => onDismiss(toast.id)} aria-label="Dismiss">
                <X className="h-3.5 w-3.5" />
              </IconButton>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
