import { tv } from '../../lib/tv';

export const cardStyles = tv({
  base: 'rounded-lg border border-border bg-card',
  variants: {
    padding: { none: 'p-0', md: 'p-4', lg: 'p-6' },
    elevation: { none: '', sm: 'shadow-sm', md: 'shadow-md' },
  },
  defaultVariants: { padding: 'md', elevation: 'sm' },
});
