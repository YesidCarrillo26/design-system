import type { ColorToken } from '@chroma-yesid/tokens';
import { tv } from '../../lib/tv';
import type { ProgressSize, ProgressTone } from './Progress.types';

export const progressStyles = tv({
  slots: {
    root: 'flex-row items-center gap-3',
    track: 'flex-1 overflow-hidden rounded-full bg-muted',
    fill: 'h-full rounded-full',
    value: 'min-w-10 text-right text-body-sm text-muted-foreground',
  },
  variants: {
    size: { sm: { track: 'h-1' }, md: { track: 'h-2' }, lg: { track: 'h-3' } },
    tone: {
      primary: { fill: 'bg-primary' },
      success: { fill: 'bg-success' },
      warning: { fill: 'bg-warning' },
      info: { fill: 'bg-info' },
      destructive: { fill: 'bg-destructive' },
    },
  },
  defaultVariants: { size: 'md', tone: 'primary' },
});

/** Porcentaje 0–100 (redondeado) de `value` sobre `max`; `null` si es indeterminado. */
export function progressPercent(value: number | null | undefined, max = 100): number | null {
  if (value === null || value === undefined) return null;
  if (max <= 0) return 0;
  return Math.round(Math.min(Math.max(value / max, 0), 1) * 100);
}

/** Diámetro y grosor del anillo, en px. */
export const ringMetrics: Record<ProgressSize, { px: number; stroke: number }> = {
  sm: { px: 24, stroke: 3 },
  md: { px: 40, stroke: 4 },
  lg: { px: 64, stroke: 6 },
};

/** Token de color del trazo del anillo en native, que no puede usar clases en un SVG. */
export const ringToneToken: Record<ProgressTone, ColorToken> = {
  primary: 'primary',
  success: 'success',
  warning: 'warning',
  info: 'info',
  destructive: 'destructive',
};
