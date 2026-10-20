import { tv } from '../../lib/tv';

export const radioGroupStyles = tv({
  slots: {
    root: 'flex flex-col gap-2',
    legend: 'text-body-sm font-medium text-foreground',
    item: 'flex-row items-center gap-2',
    circle: 'size-5 items-center justify-center rounded-full border',
    dot: 'size-2.5 rounded-full bg-primary',
    label: 'text-body-md text-foreground',
  },
  variants: {
    selected: { true: { circle: 'border-primary' }, false: { circle: 'border-border' } },
    disabled: { true: { item: 'opacity-disabled' }, false: {} },
  },
  defaultVariants: { selected: false, disabled: false },
});
