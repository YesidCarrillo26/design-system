import type { ReactElement } from 'react';

/** Contrato compartido de `Tooltip`: texto breve que describe a un elemento. */
export interface TooltipBaseProps {
  /** Texto del tooltip. */
  content: string;
  /** Elemento descrito (un único elemento, p. ej. un botón). */
  children: ReactElement;
}
