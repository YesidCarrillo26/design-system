import { tv } from '../../lib/tv';

export const tabsStyles = tv({
  slots: {
    root: 'flex flex-col gap-3',
    list: 'flex-row',
    tab: 'items-center justify-center',
    tabLabel: 'text-body-md font-medium',
    panel: 'py-2',
  },
  variants: {
    variant: {
      underline: { list: 'border-b border-border', tab: 'h-11 border-b-2 px-4' },
      pill: { list: 'self-start gap-1 rounded-lg bg-muted p-1', tab: 'h-9 rounded-md px-3' },
    },
    selected: {
      true: { tabLabel: 'text-foreground' },
      false: { tabLabel: 'text-muted-foreground' },
    },
  },
  compoundVariants: [
    { variant: 'underline', selected: true, class: { tab: 'border-primary' } },
    { variant: 'underline', selected: false, class: { tab: 'border-transparent' } },
    { variant: 'pill', selected: true, class: { tab: 'bg-card shadow-xs' } },
  ],
  defaultVariants: { variant: 'underline', selected: false },
});
