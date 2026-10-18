export type SkeletonShape = 'text' | 'rect' | 'circle';

/** Contrato compartido de `Skeleton`: marcador de posición mientras carga el contenido. */
export interface SkeletonBaseProps {
  /**
   * Forma: `text` es una línea de texto, `rect` un bloque y `circle` un avatar.
   * El tamaño de `rect` y `circle` se define con `className` (por ejemplo `h-32 w-full`).
   * @default 'text'
   */
  shape?: SkeletonShape;
  /** Clases adicionales. Se fusionan con las del componente (gana la última). */
  className?: string;
}
