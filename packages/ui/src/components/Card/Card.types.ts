import type { ReactNode } from 'react';

export type CardPadding = 'none' | 'md' | 'lg';
export type CardElevation = 'none' | 'sm' | 'md';

/** Contrato compartido de `Card`: superficie con borde, radio y sombra. */
export interface CardBaseProps {
  /**
   * Relleno interior.
   * @default 'md'
   */
  padding?: CardPadding;
  /**
   * Sombra.
   * @default 'sm'
   */
  elevation?: CardElevation;
  /** Contenido. */
  children?: ReactNode;
  /** Clases adicionales. Se fusionan con las del componente (gana la última). */
  className?: string;
}
