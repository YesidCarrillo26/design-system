import type { ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Contrato compartido de `Button`. Cada plataforma lo extiende con las props de su elemento.
 * El evento se llama `onPress` en ambas (en web se conecta a `onClick`).
 */
export interface ButtonBaseProps {
  /**
   * Énfasis visual del botón.
   * @default 'primary'
   */
  variant?: ButtonVariant;
  /**
   * Tamaño. `md` y `lg` cumplen el área táctil mínima de 44px.
   * @default 'md'
   */
  size?: ButtonSize;
  /**
   * Deshabilita la interacción y atenúa el botón.
   * @default false
   */
  disabled?: boolean;
  /** Se invoca al activar el botón (clic, toque, Enter o Espacio). */
  onPress?: () => void;
  /** Contenido del botón. Normalmente un texto. */
  children?: ReactNode;
  /** Clases adicionales. Se fusionan con las del componente (gana la última). */
  className?: string;
}
