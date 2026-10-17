export type TextFieldType = 'text' | 'email' | 'password' | 'number';

/** Contrato compartido de `TextField`: campo de texto de una línea con etiqueta. */
export interface TextFieldBaseProps {
  /** Etiqueta visible; también es el nombre accesible del campo. */
  label: string;
  /** Texto de ayuda bajo el campo. */
  description?: string;
  /** Mensaje de error. Marca el campo como inválido. */
  error?: string;
  /**
   * Campo obligatorio.
   * @default false
   */
  required?: boolean;
  /**
   * Tipo de contenido (teclado y enmascarado en mobile).
   * @default 'text'
   */
  type?: TextFieldType;
  /** Valor controlado. */
  value?: string;
  /** Valor inicial (modo no controlado). */
  defaultValue?: string;
  /** Texto de ejemplo cuando está vacío. */
  placeholder?: string;
  /**
   * Deshabilita el campo.
   * @default false
   */
  disabled?: boolean;
  /** Se invoca con el nuevo texto en cada cambio. */
  onChangeText?: (text: string) => void;
  /** Clases adicionales para el control. */
  className?: string;
}
