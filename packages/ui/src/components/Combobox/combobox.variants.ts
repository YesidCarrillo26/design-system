import { tv } from '../../lib/tv';
import { selectStyles } from '../Select/select.variants';

/** Mismo disparador que `Select`, más el campo de búsqueda y el mensaje de "sin resultados". */
export const comboboxStyles = tv({
  extend: selectStyles,
  slots: {
    search: 'h-11 rounded-md border border-input bg-card px-3 text-body-md text-foreground',
    empty: 'px-4 py-6 text-center text-body-sm text-muted-foreground',
  },
});
