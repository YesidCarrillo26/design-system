import { tv } from '../../lib/tv';

export const toastStyles = tv({
  slots: {
    item: 'flex-row items-center gap-3 rounded-lg border px-4 py-3 shadow-md',
    message: 'flex-1 text-body-sm',
  },
  variants: {
    variant: {
      default: { item: 'border-border bg-background', message: 'text-foreground' },
      destructive: { item: 'border-transparent bg-destructive', message: 'text-destructive-foreground' },
    },
  },
  defaultVariants: { variant: 'default' },
});
