import type { ReactNode } from 'react';

export type TextVariant = 'caption' | 'body-sm' | 'body-md' | 'body-lg' | 'title';
export type TextTone = 'default' | 'muted' | 'primary';

/** Contrato compartido de `Text`. Cada plataforma lo extiende con las props de su elemento. */
export interface TextBaseProps {
  /**
   * Escala tipográfica.
   * @default 'body-md'
   */
  variant?: TextVariant;
  /**
   * Color semántico del texto.
   * @default 'default'
   */
  tone?: TextTone;
  /** Contenido del texto. */
  children?: ReactNode;
  /** Clases adicionales. Se fusionan con las del componente (gana la última). */
  className?: string;
}
