import { tv } from '../../lib/tv';

export const skeletonStyles = tv({
  base: 'bg-muted',
  variants: {
    shape: {
      text: 'h-4 w-full rounded-sm',
      rect: 'h-24 w-full rounded-md',
      circle: 'h-10 w-10 rounded-full',
    },
  },
  defaultVariants: { shape: 'text' },
});
