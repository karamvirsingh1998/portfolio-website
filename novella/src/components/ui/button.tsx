import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-medium transition-colors disabled:pointer-events-none disabled:opacity-40 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'rounded-lg bg-blue-600 text-white hover:bg-blue-500',
        accent: 'rounded-lg bg-blue-600 text-white hover:bg-blue-500',
        outline:
          'rounded-lg border border-white/10 bg-transparent text-gray-300 hover:border-white/20 hover:bg-white/[0.04]',
        ghost: 'rounded-lg text-gray-400 hover:bg-white/[0.04] hover:text-white',
        soft: 'rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/15',
        pill: 'rounded-full border border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/20 hover:text-gray-200',
        dark: 'rounded-lg bg-white/10 text-white hover:bg-white/15',
      },
      size: {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-5 py-2.5 text-sm',
        icon: 'size-8 rounded-lg p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = 'Button';

export { buttonVariants };
