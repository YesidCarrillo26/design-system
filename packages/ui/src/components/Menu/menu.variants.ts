import { tv } from '../../lib/tv';

export const menuStyles = tv({
  slots: {
    trigger: 'h-11 items-center justify-center rounded-md border border-border bg-background px-4',
    triggerLabel: 'text-body-md font-medium text-foreground',
    popup: 'min-w-44 rounded-lg border border-border bg-background py-1 shadow-md',
    item: 'h-11 flex-row items-center px-4',
    itemLabel: 'text-body-md text-foreground',
  },
  variants: {
    destructive: { true: { itemLabel: 'text-destructive' }, false: {} },
    disabled: { true: { item: 'opacity-50' }, false: {} },
  },
  defaultVariants: { destructive: false, disabled: false },
});
