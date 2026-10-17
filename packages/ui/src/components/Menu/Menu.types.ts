import type { ReactNode } from 'react';

export interface MenuItem {
  /** Texto de la acción. */
  label: string;
  /** Se invoca al elegir la acción. */
  onSelect: () => void;
  /** Estilo de acción destructiva. */
  destructive?: boolean;
  /** Deshabilita la acción. */
  disabled?: boolean;
}

/** Contrato compartido de `Menu`: lista de acciones abierta por un disparador. */
export interface MenuBaseProps {
  /** Contenido del disparador (texto o ícono). */
  trigger: ReactNode;
  /** Nombre accesible del disparador. */
  label: string;
  /** Acciones del menú. */
  items: MenuItem[];
}
