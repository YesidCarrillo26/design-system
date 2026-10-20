import type { ReactNode } from 'react';

export type HeadingLevel = 1 | 2 | 3 | 4;
export type HeadingSize = 'sm' | 'md' | 'lg' | 'xl' | 'display';

/** Contrato compartido de `Heading`: título con semántica de nivel (h1–h4). */
export interface HeadingBaseProps {
  /**
   * Nivel semántico (h1–h4). Si no se indica `size`, también fija el tamaño: 1 → xl, 2 → lg, 3 → md, 4 → sm.
   * @default 2
   */
  level?: HeadingLevel;
  /**
   * Tamaño visual, independiente del nivel semántico (p. ej. un h2 con aspecto de `md`).
   * @default según `level`
   */
  size?: HeadingSize;
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
