export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerTone = 'primary' | 'muted' | 'on-primary' | 'on-secondary' | 'on-destructive';

/** Contrato compartido de `Spinner`: indicador de carga indeterminado. */
export interface SpinnerBaseProps {
  /**
   * Tamaño: sm 16px, md 20px, lg 24px (en native md es "small" y lg "large").
   * @default 'md'
   */
  size?: SpinnerSize;
  /**
   * Color. Usa `on-*` cuando el spinner va sobre un relleno (p. ej. un botón con `loading`).
   * @default 'primary'
   */
  tone?: SpinnerTone;
  /**
   * Nombre accesible del estado de carga.
   * @default 'Cargando'
   */
  label?: string;
  /** Clases adicionales (solo web). */
  className?: string;
}
