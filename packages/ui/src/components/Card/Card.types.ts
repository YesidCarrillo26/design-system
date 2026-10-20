import type { ReactNode } from 'react';

export type CardPadding = 'none' | 'sm' | 'md' | 'lg';
export type CardVariant = 'default' | 'muted' | 'outline';
export type CardElevation = 'none' | 'sm' | 'md';

/** Contrato compartido de `Card`: superficie con borde, radio y sombra. */
export interface CardBaseProps {
  /**
   * Superficie: `default` (tarjeta con borde), `muted` (fondo atenuado, sin borde) u `outline` (solo borde, sin relleno).
   * @default 'default'
   */
  variant?: CardVariant;
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
