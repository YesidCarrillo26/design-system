export type OtpInputMode = 'numeric' | 'alphanumeric';

/** Contrato compartido de `OtpInput`: código de un solo uso (SMS, correo, 2FA) dividido en casillas. */
export interface OtpInputBaseProps {
  /** Etiqueta visible; también es el nombre accesible del código. */
  label: string;
  /**
   * Cantidad de casillas.
   * @default 6
   */
  length?: number;
  /** Valor controlado. */
  value?: string;
  /** Valor inicial (modo no controlado). */
  defaultValue?: string;
  /** Se invoca con el texto del código en cada cambio. */
  onValueChange?: (value: string) => void;
  /** Se invoca una vez cuando el código se completa (también al pegar un código entero). */
  onComplete?: (value: string) => void;
  /**
   * Caracteres admitidos: `numeric` (solo dígitos, teclado numérico) o `alphanumeric` (letras y números, en mayúsculas).
   * @default 'numeric'
   */
  inputMode?: OtpInputMode;
  /** Texto de ayuda bajo las casillas. */
  description?: string;
  /** Mensaje de error. Marca las casillas como inválidas. */
  error?: string;
  /**
   * Oculta lo escrito (puntos), para pantallas compartidas.
   * @default false
   */
  mask?: boolean;
  /**
   * Deshabilita el control.
   * @default false
   */
  disabled?: boolean;
  /** Clases adicionales para el contenedor. */
  className?: string;
}
