import { tv } from '../../lib/tv';

export const tableStyles = tv({
  slots: {
    root: 'w-full rounded-lg border border-border bg-background',
    caption: 'px-3 py-2 text-left text-body-sm font-medium text-muted-foreground',
    row: 'border-b border-border',
    head: 'px-3 py-2 text-body-sm font-medium text-muted-foreground',
    cell: 'px-3 py-2 text-body-md text-foreground',
    empty: 'px-3 py-6 text-center text-body-md text-muted-foreground',
  },
  variants: {
    align: {
      start: { head: 'text-left', cell: 'text-left' },
      end: { head: 'text-right', cell: 'text-right' },
    },
  },
  defaultVariants: { align: 'start' },
});
