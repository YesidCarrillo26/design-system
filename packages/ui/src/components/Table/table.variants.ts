import { tv } from '../../lib/tv';

export const tableStyles = tv({
  slots: {
    root: 'w-full rounded-lg border border-border bg-card',
    caption: 'px-3 py-2 text-left text-body-sm font-medium text-muted-foreground',
    row: 'border-b border-border',
    head: 'px-3 py-2 text-body-sm font-medium text-muted-foreground',
    headLabel: 'text-body-sm font-medium text-muted-foreground',
    sortButton: 'flex-row items-center gap-1 px-3 py-2',
    cell: 'px-3 py-2 text-body-md text-foreground',
    selectCell: 'w-10 items-center justify-center px-3 py-2',
    empty: 'px-3 py-6 text-center text-body-md text-muted-foreground',
  },
  variants: {
    align: {
      start: { head: 'text-left', cell: 'text-left', sortButton: 'justify-start' },
      end: { head: 'text-right', cell: 'text-right', sortButton: 'justify-end' },
    },
    selected: { true: { row: 'bg-primary-subtle' }, false: {} },
    sorted: { true: { head: 'text-foreground', headLabel: 'text-foreground' }, false: {} },
  },
  defaultVariants: { align: 'start', selected: false, sorted: false },
});

/** Texto que se anuncia para el botón de ordenar (en native no existe `aria-sort`, así que va en la etiqueta). */
export function sortLabel(header: string, direction: 'asc' | 'desc' | null): string {
  if (direction === 'asc') return `${header}, orden ascendente`;
  if (direction === 'desc') return `${header}, orden descendente`;
  return `${header}, ordenar`;
}
