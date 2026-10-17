import type { ReactNode } from 'react';

/** Contrato compartido de `Link`: un enlace de texto. */
export interface LinkBaseProps {
  /** Destino. En web es el `href`; en native se abre con `Linking.openURL`. */
  href: string;
  /** Texto del enlace. */
  children?: ReactNode;
  /** Se invoca además de la navegación. */
  onPress?: () => void;
  /** Clases adicionales. Se fusionan con las del componente (gana la última). */
  className?: string;
}
