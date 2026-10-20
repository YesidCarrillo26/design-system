import { tv } from '../../lib/tv';

/** Mismo lenguaje visual que `Tabs variant="pill"`: pista atenuada y segmento activo elevado. */
export const segmentedControlStyles = tv({
  slots: {
    root: 'flex-row gap-1 self-start rounded-lg bg-muted p-1',
    segment: 'items-center justify-center rounded-md px-3',
    label: 'text-body-sm font-medium',
  },
  variants: {
    size: { sm: { segment: 'h-8' }, md: { segment: 'h-10' } },
    selected: {
      true: { segment: 'bg-card shadow-xs', label: 'text-foreground' },
      false: { segment: 'bg-transparent', label: 'text-muted-foreground' },
    },
    disabled: { true: { segment: 'opacity-disabled' }, false: {} },
  },
  defaultVariants: { size: 'md', selected: false, disabled: false },
});
