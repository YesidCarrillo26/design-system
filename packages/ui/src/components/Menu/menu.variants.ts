import { tv } from '../../lib/tv';

export const menuStyles = tv({
  slots: {
    trigger: 'h-11 items-center justify-center rounded-md border border-border bg-card px-4',
    triggerLabel: 'text-body-md font-medium text-foreground',
    popup: 'min-w-44 rounded-lg border border-border bg-popover py-1 shadow-md',
    item: 'h-11 flex-row items-center px-4',
    itemLabel: 'text-body-md text-foreground',
  },
  variants: {
    destructive: { true: { itemLabel: 'text-destructive' }, false: {} },
    disabled: { true: { item: 'opacity-disabled' }, false: {} },
  },
  defaultVariants: { destructive: false, disabled: false },
});
