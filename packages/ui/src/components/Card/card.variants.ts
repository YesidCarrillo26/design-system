import { tv } from '../../lib/tv';

export const cardStyles = tv({
  base: 'rounded-lg border',
  variants: {
    variant: {
      default: 'border-border bg-card',
      muted: 'border-transparent bg-muted',
      outline: 'border-border bg-transparent',
    },
    padding: { none: 'p-0', sm: 'p-3', md: 'p-4', lg: 'p-6' },
    elevation: { none: '', sm: 'shadow-sm', md: 'shadow-md' },
  },
  defaultVariants: { variant: 'default', padding: 'md', elevation: 'sm' },
});
