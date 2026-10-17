import { tv } from '../../lib/tv';

export const avatarStyles = tv({
  slots: {
    root: 'items-center justify-center overflow-hidden rounded-full bg-muted',
    label: 'font-medium text-muted-foreground',
    image: 'size-full',
  },
  variants: {
    size: {
      sm: { root: 'size-8', label: 'text-caption' },
      md: { root: 'size-10', label: 'text-body-sm' },
      lg: { root: 'size-12', label: 'text-body-md' },
    },
  },
  defaultVariants: { size: 'md' },
});
