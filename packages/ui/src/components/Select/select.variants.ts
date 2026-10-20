import { tv } from '../../lib/tv';

export const selectStyles = tv({
  slots: {
    trigger: 'h-11 flex-row items-center justify-between rounded-md border bg-card px-3 disabled:opacity-disabled',
    value: 'text-body-md text-foreground',
    option: 'h-11 flex-row items-center justify-between px-4',
    optionLabel: 'text-body-md text-foreground',
  },
  variants: {
    invalid: { true: { trigger: 'border-destructive' }, false: { trigger: 'border-border' } },
    empty: { true: { value: 'text-muted-foreground' }, false: {} },
  },
  defaultVariants: { invalid: false, empty: false },
});
