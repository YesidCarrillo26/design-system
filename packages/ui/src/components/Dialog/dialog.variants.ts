import { tv } from '../../lib/tv';

export const dialogStyles = tv({
  slots: {
    backdrop: 'bg-foreground/40',
    popup: 'w-full max-w-md gap-3 rounded-lg border border-border bg-background p-6 shadow-lg',
    title: 'text-body-lg font-semibold text-foreground',
    description: 'text-body-sm text-muted-foreground',
    close: 'absolute right-3 top-3 size-9 items-center justify-center rounded-md',
  },
});
