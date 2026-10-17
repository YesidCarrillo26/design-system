import type { ReactNode } from 'react';

export type StackDirection = 'row' | 'column';
/** Separación entre hijos: none 0, xs 4px, sm 8px, md 16px, lg 24px, xl 32px. */
export type StackGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch';
export type StackJustify = 'start' | 'center' | 'end' | 'between';

/** Contrato compartido de `Stack`. Cada plataforma lo extiende con las props de su elemento. */
export interface StackBaseProps {
  /**
   * Eje principal.
   * @default 'column'
   */
  direction?: StackDirection;
  /**
   * Separación entre los hijos.
   * @default 'md'
   */
  gap?: StackGap;
  /**
   * Alineación en el eje transversal.
   * @default 'stretch'
   */
  align?: StackAlign;
  /**
   * Distribución en el eje principal.
   * @default 'start'
   */
  justify?: StackJustify;
  /** Contenido. */
  children?: ReactNode;
  /** Clases adicionales. Se fusionan con las del componente (gana la última). */
  className?: string;
}
