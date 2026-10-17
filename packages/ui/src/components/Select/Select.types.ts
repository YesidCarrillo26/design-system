import type { RadioOption } from '../RadioGroup/RadioGroup.types';

export type SelectOption = RadioOption;

/** Contrato compartido de `Select`: lista desplegable de opciones. */
export interface SelectBaseProps {
  /** Etiqueta visible; también es el nombre accesible. */
  label: string;
  /** Opciones disponibles. */
  options: SelectOption[];
  /** Valor controlado (`''` = sin selección). */
  value?: string;
  /** Valor inicial (modo no controlado). */
  defaultValue?: string;
  /** Texto cuando no hay selección. */
  placeholder?: string;
  /** Texto de ayuda. */
  description?: string;
  /** Mensaje de error. Marca el campo como inválido. */
  error?: string;
  /**
   * Campo obligatorio.
   * @default false
   */
  required?: boolean;
  /**
   * Deshabilita el control.
   * @default false
   */
  disabled?: boolean;
  /** Se invoca con el valor elegido. */
  onValueChange?: (value: string) => void;
  /** Clases adicionales para el control. */
  className?: string;
}
