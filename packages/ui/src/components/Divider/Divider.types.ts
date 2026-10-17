export type DividerOrientation = 'horizontal' | 'vertical';

/** Contrato compartido de `Divider`: una línea que separa contenido. */
export interface DividerBaseProps {
  /**
   * Dirección de la línea.
   * @default 'horizontal'
   */
  orientation?: DividerOrientation;
  /** Clases adicionales. Se fusionan con las del componente (gana la última). */
  className?: string;
}
