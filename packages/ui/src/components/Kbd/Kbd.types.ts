import type { ReactNode } from 'react';

/** Contrato compartido de `Kbd`: una tecla o atajo, p. ej. `⌘K`. */
export interface KbdBaseProps {
  /** Texto de la tecla. */
  children?: ReactNode;
  /** Clases adicionales. Se fusionan con las del componente (gana la última). */
  className?: string;
}
