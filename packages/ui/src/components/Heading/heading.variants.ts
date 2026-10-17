import { tv } from '../../lib/tv';

export const headingStyles = tv({
  base: 'font-semibold',
  variants: {
    level: { 1: 'text-title', 2: 'text-body-lg', 3: 'text-body-md', 4: 'text-body-sm' },
    tone: { default: 'text-foreground', muted: 'text-muted-foreground', primary: 'text-primary' },
  },
  defaultVariants: { level: 2, tone: 'default' },
});
