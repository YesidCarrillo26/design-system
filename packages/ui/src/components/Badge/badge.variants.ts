import { tv } from '../../lib/tv';

export const badgeStyles = tv({
  slots: {
    root: 'flex-row items-center self-start rounded-full border px-2.5 py-0.5',
    label: 'text-caption font-medium',
  },
  variants: {
    variant: {
      default: { root: 'border-transparent bg-primary', label: 'text-primary-foreground' },
      secondary: { root: 'border-transparent bg-secondary', label: 'text-secondary-foreground' },
      destructive: { root: 'border-transparent bg-destructive', label: 'text-destructive-foreground' },
      outline: { root: 'border-border bg-transparent', label: 'text-foreground' },
    },
  },
  defaultVariants: { variant: 'default' },
});
