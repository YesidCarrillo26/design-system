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
   * Deshabilita el control.
   * @default false
   */
  disabled?: boolean;
  /** Clases adicionales para el contenedor. */
  className?: string;
}
