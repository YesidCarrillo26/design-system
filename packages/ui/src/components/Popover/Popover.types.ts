import type { ReactNode } from 'react';

/** Contrato compartido de `Popover`: contenido flotante abierto por un disparador. */
export interface PopoverBaseProps {
  /** Contenido del disparador (texto o ícono). */
  trigger: ReactNode;
  /** Nombre accesible del disparador. */
  label: string;
  /** Contenido flotante. */
  children?: ReactNode;
}
