import { tv } from '../../lib/tv';

export const tabsStyles = tv({
  slots: {
    root: 'flex flex-col gap-3',
    list: 'flex-row border-b border-border',
    tab: 'h-11 items-center justify-center border-b-2 px-4',
    tabLabel: 'text-body-md font-medium',
    panel: 'py-2',
  },
  variants: {
    selected: {
      true: { tab: 'border-primary', tabLabel: 'text-foreground' },
      false: { tab: 'border-transparent', tabLabel: 'text-muted-foreground' },
    },
  },
  defaultVariants: { selected: false },
});
