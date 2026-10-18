import type { ColorToken } from '@chroma-yesid/tokens';
import { tv } from '../../lib/tv';
import type { IconSize, IconTone } from './Icon.types';

export const iconSizePx: Record<IconSize, number> = { sm: 16, md: 20, lg: 24 };

/** Token de color de cada tono (lo usa native, que no hereda `currentColor`). */
export const iconToneToken: Record<IconTone, ColorToken> = {
  default: 'foreground',
  muted: 'muted-foreground',
  primary: 'primary',
  destructive: 'destructive',
  'on-primary': 'primary-foreground',
  'on-secondary': 'secondary-foreground',
};

/** Clases de color para web, donde el SVG usa `currentColor`. */
export const iconStyles = tv({
  variants: {
    tone: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
      destructive: 'text-destructive',
      'on-primary': 'text-primary-foreground',
      'on-secondary': 'text-secondary-foreground',
    },
  },
  defaultVariants: { tone: 'default' },
});
