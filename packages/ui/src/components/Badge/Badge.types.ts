import type { ReactNode } from 'react';

export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

/** Contrato compartido de `Badge`: una etiqueta corta de estado. */
export interface BadgeBaseProps {
  /**
   * Énfasis visual.
   * @default 'default'
   */
  variant?: BadgeVariant;
  /** Texto de la etiqueta. */
  children?: ReactNode;
  /** Clases adicionales. Se fusionan con las del componente (gana la última). */
  className?: string;
}
