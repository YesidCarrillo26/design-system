export type SegmentedControlSize = 'sm' | 'md';

export interface SegmentedOption {
  /** Valor que se informa al elegir este segmento. */
  value: string;
  /** Texto visible. */
  label: string;
  /** Deshabilita solo este segmento. */
  disabled?: boolean;
}

/** Contrato compartido de `SegmentedControl`: elegir una vista entre pocas (2 a 5) que cambia lo que se ve. */
export interface SegmentedControlBaseProps {
  /** Nombre accesible del grupo (no se muestra). */
  label: string;
  /** Segmentos disponibles. */
  options: SegmentedOption[];
  /** Valor controlado. */
  value?: string;
  /** Valor inicial (modo no controlado). Por defecto, el primero. */
  defaultValue?: string;
  /** Se invoca con el valor elegido. */
  onValueChange?: (value: string) => void;
  /**
   * Tamaño. `md` cumple el área táctil de 44px en native.
   * @default 'md'
   */
  size?: SegmentedControlSize;
  /**
   * Deshabilita todo el control.
   * @default false
   */
  disabled?: boolean;
  /** Clases adicionales para el contenedor. */
  className?: string;
}
