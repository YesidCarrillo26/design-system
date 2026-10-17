export type SpinnerSize = 'sm' | 'md' | 'lg';

/** Contrato compartido de `Spinner`: indicador de carga indeterminado. */
export interface SpinnerBaseProps {
  /**
   * Tamaño: sm 16px, md 20px, lg 24px (en native md es "small" y lg "large").
   * @default 'md'
   */
  size?: SpinnerSize;
  /**
   * Nombre accesible del estado de carga.
   * @default 'Cargando'
   */
  label?: string;
  /** Clases adicionales (solo web). */
  className?: string;
}
