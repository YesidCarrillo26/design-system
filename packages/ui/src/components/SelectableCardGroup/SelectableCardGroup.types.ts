import type { IconName } from '../Icon/icons';

export type SelectionMode = 'single' | 'multiple';

export interface SelectableCardOption {
  /** Valor que se informa al elegir esta tarjeta. */
  value: string;
  /** Título de la tarjeta. */
  title: string;
  /** Texto de apoyo bajo el título. */
  description?: string;
  /** Ícono a la izquierda (decorativo). */
  icon?: IconName;
  /** Deshabilita solo esta tarjeta. */
  disabled?: boolean;
}

/** Contrato compartido de `SelectableCardGroup`: elegir entre tarjetas grandes (onboarding, planes, objetivos). */
export interface SelectableCardGroupBaseProps {
  /** Nombre accesible del grupo (suele repetir la pregunta de la pantalla; no se muestra). */
  label: string;
  /**
   * `single` elige una (radios) y `multiple` varias (casillas).
   * @default 'single'
   */
  selectionMode?: SelectionMode;
  /** Tarjetas disponibles. */
  options: SelectableCardOption[];
  /** Valores elegidos (controlado). En `single` tiene como mucho uno. */
  value?: string[];
  /** Valores elegidos al inicio (modo no controlado). */
  defaultValue?: string[];
  /** Se invoca con los valores elegidos, en el orden de `options`. */
  onValueChange?: (value: string[]) => void;
  /** Solo en `multiple`: al llegar a este número, las demás tarjetas se deshabilitan ("elige hasta 3"). */
  maxSelected?: number;
  /**
   * Deshabilita todo el grupo.
   * @default false
   */
  disabled?: boolean;
  /** Clases adicionales para el contenedor. */
  className?: string;
}
