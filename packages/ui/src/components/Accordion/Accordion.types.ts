import type { ReactNode } from 'react';

export interface AccordionItem {
  /** Identificador de la sección. */
  value: string;
  /** Texto del encabezado. */
  title: string;
  /** Contenido que se expande. */
  content: ReactNode;
}

/** Contrato compartido de `Accordion`: secciones que se expanden y se contraen. */
export interface AccordionBaseProps {
  /** Secciones, en orden. */
  items: AccordionItem[];
  /**
   * Permite varias secciones abiertas a la vez.
   * @default false
   */
  multiple?: boolean;
  /** Secciones abiertas al inicio. */
  defaultValue?: string[];
  /** Clases adicionales para el contenedor. */
  className?: string;
}
