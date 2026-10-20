import { tv } from '../../lib/tv';

export const checkboxStyles = tv({
  slots: {
    root: 'flex-row items-center gap-2',
    box: 'size-5 items-center justify-center rounded-sm border',
    label: 'text-body-md text-foreground',
  },
  variants: {
    checked: {
      true: { box: 'border-primary bg-primary' },
      false: { box: 'border-border bg-card' },
    },
    disabled: { true: { root: 'opacity-disabled' }, false: {} },
  },
  defaultVariants: { checked: false, disabled: false },
});
