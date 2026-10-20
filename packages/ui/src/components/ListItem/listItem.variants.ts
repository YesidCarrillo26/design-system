import { tv } from '../../lib/tv';

export const listItemStyles = tv({
  slots: {
    root: 'min-h-14 flex-row items-center gap-3 px-4 py-2',
    body: 'flex-1 gap-0.5',
    title: 'text-body-md text-foreground',
    description: 'text-body-sm text-muted-foreground',
    value: 'text-body-md text-muted-foreground',
  },
  variants: {
    divider: { true: { root: 'border-b border-border' }, false: {} },
    destructive: { true: { title: 'text-destructive-subtle-foreground' }, false: {} },
    disabled: { true: { root: 'opacity-disabled' }, false: {} },
  },
  defaultVariants: { divider: true, destructive: false, disabled: false },
});
