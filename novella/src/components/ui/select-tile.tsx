import * as React from 'react';
import { cn } from '@/lib/cn';

export interface SelectTileProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

export const SelectTile = React.forwardRef<HTMLButtonElement, SelectTileProps>(
  ({ className, selected, type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        'rounded-xl border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40',
        selected
          ? 'border-blue-500/60 bg-blue-500/10'
          : 'border-white/[0.08] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]',
        className,
      )}
      {...props}
    />
  ),
);
SelectTile.displayName = 'SelectTile';
