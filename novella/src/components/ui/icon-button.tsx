import * as React from 'react';
import { cn } from '@/lib/cn';

export type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        'inline-flex items-center justify-center rounded-md p-1.5 text-gray-500 transition-colors hover:bg-white/[0.06] hover:text-gray-300',
        className,
      )}
      {...props}
    />
  ),
);
IconButton.displayName = 'IconButton';
