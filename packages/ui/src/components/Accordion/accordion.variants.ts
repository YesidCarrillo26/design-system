import { tv } from '../../lib/tv';


export const accordionStyles = tv({
  slots: {
    root: 'flex flex-col rounded-lg border border-border',
    item: 'border-b border-border',
    trigger: 'min-h-11 flex-row items-center justify-between px-4 py-2',
    title: 'text-body-md font-medium text-foreground',
    panel: 'px-4 pb-4',
  },
});
