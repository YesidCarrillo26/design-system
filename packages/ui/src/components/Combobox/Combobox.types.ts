import type { SelectBaseProps } from '../Select/Select.types';

export type { SelectOption as ComboboxOption } from '../Select/Select.types';

/** Contrato compartido de `Combobox`: un `Select` con búsqueda, para listas largas. */
export interface ComboboxBaseProps extends SelectBaseProps {
  /**
   * Texto de ejemplo del campo de búsqueda.
   * @default 'Buscar…'
   */
  searchPlaceholder?: string;
  /**
   * Mensaje cuando ninguna opción coincide.
   * @default 'Sin resultados'
   */
  emptyText?: string;
}
