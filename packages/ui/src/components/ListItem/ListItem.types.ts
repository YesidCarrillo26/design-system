import type { ReactNode } from 'react';

/** Contrato compartido de `ListItem`: una fila de lista, estática o pulsable. */
export interface ListItemBaseProps {
  /** Texto principal. */
  title: string;
  /** Texto secundario bajo el título. */
  description?: string;
  /** Contenido a la izquierda (avatar, ícono, checkbox). */
  leading?: ReactNode;
  /** Contenido a la derecha (insignia, interruptor, acciones). Va antes del valor y del chevron. */
  trailing?: ReactNode;
  /** Valor actual, atenuado y a la derecha (p. ej. "Automático" en un ajuste). */
  value?: string;
  /**
   * Muestra un chevron a la derecha: la fila lleva a otra pantalla.
   * @default false
   */
  showChevron?: boolean;
  /**
   * Título en color de error, para acciones que destruyen o cierran (p. ej. "Cerrar sesión").
   * @default false
   */
  destructive?: boolean;
  /**
   * Si se indica, toda la fila es un botón. Sin esto es estática: los controles de `leading` y `trailing`
   * son los que aportan la interacción.
   */
  onPress?: () => void;
  /**
   * Deshabilita la fila pulsable.
   * @default false
   */
  disabled?: boolean;
  /** Clases adicionales. Se fusionan con las del componente (gana la última). */
  className?: string;
}
