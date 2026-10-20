import type { IconName } from './icons';

export type IconSize = 'sm' | 'md' | 'lg';
export type IconTone =
  | 'default'
  | 'muted'
  | 'primary'
  | 'destructive'
  | 'success'
  | 'warning'
  | 'info'
  | 'on-primary'
  | 'on-secondary'
  | 'on-destructive'
  | 'on-success'
  | 'on-warning'
  | 'on-info';

/** Contrato compartido de `Icon`. */
export interface IconBaseProps {
  /** Ícono a dibujar. */
  name: IconName;
  /**
   * Tamaño: sm 16px, md 20px, lg 24px.
   * @default 'md'
   */
  size?: IconSize;
  /**
   * Color semántico.
   * @default 'default'
   */
  tone?: IconTone;
  /** Nombre accesible. Sin él, el ícono se oculta a lectores de pantalla (decorativo). */
  label?: string;
  /** Clases adicionales (solo web: en native el color sale del tema). */
  className?: string;
}
