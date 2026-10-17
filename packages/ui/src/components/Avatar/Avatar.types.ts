export type AvatarSize = 'sm' | 'md' | 'lg';

/** Contrato compartido de `Avatar`: imagen de perfil con iniciales como respaldo. */
export interface AvatarBaseProps {
  /** Nombre de la persona. Se usa para las iniciales y como nombre accesible. */
  name: string;
  /** URL de la imagen. Si falta o falla al cargar, se muestran las iniciales. */
  src?: string;
  /**
   * Tamaño: sm 32px, md 40px, lg 48px.
   * @default 'md'
   */
  size?: AvatarSize;
  /** Clases adicionales. Se fusionan con las del componente (gana la última). */
  className?: string;
}
