import { tv } from '../../lib/tv';

export const popoverStyles = tv({
  slots: {
    trigger: 'h-11 items-center justify-center rounded-md border border-border bg-card px-4',
    triggerLabel: 'text-body-md font-medium text-foreground',
    popup: 'gap-2 rounded-lg border border-border bg-popover p-4 shadow-md',
  },
});
