import type { ReactNode } from 'react';

/** Contrato compartido de `Dialog`: ventana modal con título. Se controla desde fuera. */
export interface DialogBaseProps {
  /** Si el diálogo está abierto. */
  open: boolean;
  /** Se invoca al pedir abrir o cerrar (Escape, clic fuera, botón de cerrar). */
  onOpenChange: (open: boolean) => void;
  /** Título; también es el nombre accesible del diálogo. */
  title: string;
  /** Descripción breve bajo el título. */
  description?: string;
  /** Contenido del diálogo. */
  children?: ReactNode;
}
