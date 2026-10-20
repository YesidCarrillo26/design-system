import type { IconName } from '../Icon/icons';

/** Contrato compartido de `Chip`: etiqueta compacta que puede alternarse (filtro) y/o quitarse. */
export interface ChipBaseProps {
  /** Texto del chip. */
  label: string;
  /** Estado de selección (controlado). Si no se indica nada de selección, el chip no es alternable. */
  selected?: boolean;
  /** Selección inicial (no controlado). */
  defaultSelected?: boolean;
  /** Se invoca con el nuevo estado al alternar. Hace que el chip sea un botón de alternancia. */
  onSelectedChange?: (selected: boolean) => void;
  /** Si se indica, muestra un botón para quitar el chip. */
  onRemove?: () => void;
  /**
   * Nombre accesible del botón de quitar. Por defecto, `Quitar <label>`.
   */
  removeLabel?: string;
  /** Ícono delante del texto. */
  icon?: IconName;
  /**
   * Deshabilita la interacción.
   * @default false
   */
  disabled?: boolean;
  /** Clases adicionales. Se fusionan con las del componente (gana la última). */
  className?: string;
}
