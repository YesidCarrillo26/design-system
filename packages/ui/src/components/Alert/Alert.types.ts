import type { ReactNode } from 'react';
import type { IconName } from '../Icon/icons';

export type AlertTone = 'neutral' | 'info' | 'success' | 'warning' | 'destructive';
export type AlertLayout = 'inline' | 'banner';

/** Contrato compartido de `Alert`: mensaje de estado dentro de la página (no flota como `Toast`). */
export interface AlertBaseProps {
  /**
   * Significado del color y del ícono por defecto.
   * @default 'info'
   */
  tone?: AlertTone;
  /** Título en negrita sobre el mensaje. */
  title?: string;
  /** Mensaje. */
  children?: ReactNode;
  /**
   * Ícono delante. Por defecto depende del `tone`; `null` lo quita.
   */
  icon?: IconName | null;
  /** Acción a la derecha (p. ej. un `Button` pequeño). */
  action?: ReactNode;
  /** Si se indica, muestra un botón para cerrar que la invoca. */
  onDismiss?: () => void;
  /**
   * Nombre accesible del botón de cerrar.
   * @default 'Cerrar'
   */
  dismissLabel?: string;
  /**
   * `inline` (tarjeta con borde y radio) o `banner` (a todo el ancho, sin radio ni bordes laterales).
   * @default 'inline'
   */
  layout?: AlertLayout;
  /**
   * Anuncia el mensaje a lectores de pantalla en cuanto aparece (`alert` para error y advertencia, `status` para el resto).
   * Actívalo solo para mensajes que surgen por una acción; los fijos no deben interrumpir.
   * @default false
   */
  live?: boolean;
  /** Clases adicionales. Se fusionan con las del componente (gana la última). */
  className?: string;
}
