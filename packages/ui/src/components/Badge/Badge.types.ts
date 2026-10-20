import type { ReactNode } from 'react';
import type { IconName } from '../Icon/icons';

/** @deprecated Usa `tone` y `appearance`. */
export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';
export type BadgeTone = 'neutral' | 'primary' | 'success' | 'warning' | 'info' | 'destructive';
export type BadgeAppearance = 'solid' | 'subtle' | 'outline';

/** Contrato compartido de `Badge`: una etiqueta corta de estado. */
export interface BadgeBaseProps {
  /**
   * Significado del color.
   * @default 'primary'
   */
  tone?: BadgeTone;
  /**
   * Énfasis: `solid` (relleno), `subtle` (fondo suave) u `outline` (solo borde).
   * @default 'solid'
   */
  appearance?: BadgeAppearance;
  /**
   * Antiguo énfasis. Equivale a un `tone` + `appearance`; si se indican estos, gana lo indicado.
   * @deprecated Usa `tone` y `appearance`.
   */
  variant?: BadgeVariant;
  /** Ícono delante del texto. El color coincide con el del texto. */
  icon?: IconName;
  /** Texto de la etiqueta. */
  children?: ReactNode;
  /** Clases adicionales. Se fusionan con las del componente (gana la última). */
  className?: string;
}
