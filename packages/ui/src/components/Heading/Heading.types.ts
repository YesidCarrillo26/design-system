import type { ReactNode } from 'react';

export type HeadingLevel = 1 | 2 | 3 | 4;

/** Contrato compartido de `Heading`: título con semántica de nivel (h1–h4). */
export interface HeadingBaseProps {
  /**
   * Nivel semántico y tamaño: 1 es el más grande.
   * @default 2
   */
  level?: HeadingLevel;
  /**
   * Color del texto.
   * @default 'default'
   */
  tone?: 'default' | 'muted' | 'primary';
  /** Texto del título. */
  children?: ReactNode;
  /** Clases adicionales. Se fusionan con las del componente (gana la última). */
  className?: string;
}
