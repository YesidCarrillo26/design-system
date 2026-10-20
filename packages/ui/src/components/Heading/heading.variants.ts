import { tv } from '../../lib/tv';
import type { HeadingLevel, HeadingSize } from './Heading.types';

/** Tamaño visual por defecto de cada nivel semántico. */
export const defaultSizeForLevel: Record<HeadingLevel, HeadingSize> = { 1: 'xl', 2: 'lg', 3: 'md', 4: 'sm' };

export const headingStyles = tv({
  base: 'font-semibold',
  variants: {
    size: {
      sm: 'text-heading-sm',
      md: 'text-heading-md',
      lg: 'text-heading-lg',
      xl: 'text-heading-xl',
      display: 'text-display',
    },
    tone: { default: 'text-foreground', muted: 'text-muted-foreground', primary: 'text-primary' },
  },
  defaultVariants: { size: 'lg', tone: 'default' },
});
