/** Contrato compartido de `Checkbox`. */
export interface CheckboxBaseProps {
  /** Texto del checkbox; también es su nombre accesible. */
  label: string;
  /** Estado controlado. */
  checked?: boolean;
  /**
   * Estado inicial (modo no controlado).
   * @default false
   */
  defaultChecked?: boolean;
  /** Se invoca con el nuevo estado al cambiar. */
  onCheckedChange?: (checked: boolean) => void;
  /**
   * Estado mixto: una parte de un grupo está marcada (p. ej. "seleccionar todas" con algunas filas elegidas).
   * Se muestra con un guion y se anuncia como `mixed`; `checked` sigue indicando qué pasa al activarlo.
   * @default false
   */
  indeterminate?: boolean;
  /**
   * Oculta el texto sin quitar el nombre accesible. Para casillas dentro de una tabla o lista, donde el texto sobra.
   * @default false
   */
  hideLabel?: boolean;
  /**
   * Deshabilita el control.
   * @default false
   */
  disabled?: boolean;
  /** Clases adicionales para el contenedor. */
  className?: string;
}
