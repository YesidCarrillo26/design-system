import { tv } from '../../lib/tv';

export const sheetStyles = tv({
  slots: {
    backdrop: 'bg-overlay',
    popup: 'w-full gap-3 rounded-t-lg border border-border bg-popover p-6 pb-8 shadow-lg',
    title: 'text-body-lg font-semibold text-foreground',
    description: 'text-body-sm text-muted-foreground',
    handle: 'mb-1 h-1 w-10 self-center rounded-full bg-border',
  },
});
