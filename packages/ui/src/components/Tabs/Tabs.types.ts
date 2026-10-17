import type { ReactNode } from 'react';

export interface TabItem {
  /** Identificador de la pestaña. */
  value: string;
  /** Texto de la pestaña. */
  label: string;
  /** Contenido del panel. */
  content: ReactNode;
}

/** Contrato compartido de `Tabs`: pestañas con un panel por cada una. */
export interface TabsBaseProps {
  /** Pestañas, en orden. */
  items: TabItem[];
  /** Pestaña activa (controlado). */
  value?: string;
  /** Pestaña inicial (no controlado). Por defecto, la primera. */
  defaultValue?: string;
  /** Se invoca con la pestaña elegida. */
  onValueChange?: (value: string) => void;
  /** Clases adicionales para el contenedor. */
  className?: string;
}
