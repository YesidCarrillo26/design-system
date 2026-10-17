import type { IconName } from '../Icon/icons';

export type IconButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type IconButtonSize = 'sm' | 'md' | 'lg';

/** Contrato compartido de `IconButton`: un botón que solo muestra un ícono. */
export interface IconButtonBaseProps {
  /** Ícono a mostrar. */
  icon: IconName;
  /** Nombre accesible. Obligatorio: sin texto visible, es lo único que anuncia el lector de pantalla. */
  label: string;
  /**
   * Énfasis visual.
   * @default 'ghost'
   */
  variant?: IconButtonVariant;
  /**
   * Tamaño del botón (cuadrado): sm 36px, md 44px, lg 48px.
   * @default 'md'
   */
  size?: IconButtonSize;
  /**
   * Deshabilita la interacción.
   * @default false
   */
  disabled?: boolean;
  /** Se invoca al activar el botón. */
  onPress?: () => void;
  /** Clases adicionales. Se fusionan con las del componente (gana la última). */
  className?: string;
}
