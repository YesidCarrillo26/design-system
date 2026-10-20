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
  success: 'success-subtle-foreground',
  warning: 'warning-subtle-foreground',
  info: 'info-subtle-foreground',
  'on-primary': 'primary-foreground',
  'on-secondary': 'secondary-foreground',
  'on-destructive': 'destructive-foreground',
  'on-success': 'success-foreground',
  'on-warning': 'warning-foreground',
  'on-info': 'info-foreground',
};

/** Clases de color para web, donde el SVG usa `currentColor`. */
export const iconStyles = tv({
  variants: {
    tone: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
      destructive: 'text-destructive',
      success: 'text-success-subtle-foreground',
      warning: 'text-warning-subtle-foreground',
      info: 'text-info-subtle-foreground',
      'on-primary': 'text-primary-foreground',
      'on-secondary': 'text-secondary-foreground',
      'on-destructive': 'text-destructive-foreground',
      'on-success': 'text-success-foreground',
      'on-warning': 'text-warning-foreground',
      'on-info': 'text-info-foreground',
    },
  },
  defaultVariants: { tone: 'default' },
});
