export interface RadioOption {
  /** Valor que se informa al elegir esta opción. */
  value: string;
  /** Texto visible. */
  label: string;
  /** Deshabilita solo esta opción. */
  disabled?: boolean;
}

/** Contrato compartido de `RadioGroup`: elegir una opción entre varias. */
export interface RadioGroupBaseProps {
  /** Título del grupo; también es su nombre accesible. */
  label: string;
  /** Opciones disponibles. */
  options: RadioOption[];
  /** Valor controlado. */
  value?: string;
  /** Valor inicial (modo no controlado). */
  defaultValue?: string;
  /** Se invoca con el valor elegido. */
  onValueChange?: (value: string) => void;
  /**
   * Deshabilita todo el grupo.
   * @default false
   */
  disabled?: boolean;
  /** Clases adicionales para el contenedor. */
  className?: string;
}
