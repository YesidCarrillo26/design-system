export type ProgressVariant = 'linear' | 'circular';
export type ProgressSize = 'sm' | 'md' | 'lg';
export type ProgressTone = 'primary' | 'success' | 'warning' | 'info' | 'destructive';

/** Contrato compartido de `Progress`: avance de una tarea de duración conocida o indeterminada. */
export interface ProgressBaseProps {
  /** Nombre accesible (qué está avanzando). Obligatorio: la barra no tiene texto propio. */
  label: string;
  /** Avance de 0 a `max`. `null` (o sin indicar) es indeterminado: no se sabe cuánto falta. */
  value?: number | null;
  /**
   * Valor que equivale al 100 %.
   * @default 100
   */
  max?: number;
  /**
   * Forma: barra o anillo.
   * @default 'linear'
   */
  variant?: ProgressVariant;
  /**
   * Tamaño: barra de 4/8/12px de alto, o anillo de 24/40/64px.
   * @default 'md'
   */
  size?: ProgressSize;
  /**
   * Color del avance. Usa `success` al completar y `destructive` si falla.
   * @default 'primary'
   */
  tone?: ProgressTone;
  /**
   * Muestra el porcentaje (a la derecha de la barra, o dentro del anillo `lg`).
   * @default false
   */
  showValue?: boolean;
  /** Clases adicionales. Se fusionan con las del componente (gana la última). */
  className?: string;
}
