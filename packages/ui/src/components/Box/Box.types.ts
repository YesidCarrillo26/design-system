import type { ReactNode } from 'react';

export type BoxPadding = 'none' | 'sm' | 'md' | 'lg';
export type BoxSurface = 'none' | 'muted' | 'raised';
export type BoxRadius = 'none' | 'sm' | 'md' | 'lg';

/** Contrato compartido de `Box`: un contenedor con relleno, superficie y borde. */
export interface BoxBaseProps {
  /**
   * Relleno interior: none 0, sm 8px, md 16px, lg 24px.
   * @default 'none'
   */
  padding?: BoxPadding;
  /**
   * Fondo: `muted` atenuado, `raised` con el fondo de página sobre otra superficie.
   * @default 'none'
   */
  surface?: BoxSurface;
  /**
   * Radio de las esquinas.
   * @default 'none'
   */
  radius?: BoxRadius;
  /**
   * Dibuja un borde.
   * @default false
   */
  bordered?: boolean;
  /** Contenido. */
  children?: ReactNode;
  /** Clases adicionales. Se fusionan con las del componente (gana la última). */
  className?: string;
}
