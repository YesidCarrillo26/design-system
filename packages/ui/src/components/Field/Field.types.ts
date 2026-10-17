import type { ReactNode } from 'react';

/** Contrato compartido de `Field`: etiqueta, ayuda y error alrededor de un control. */
export interface FieldBaseProps {
  /** Etiqueta visible del campo. */
  label: string;
  /** Texto de ayuda bajo el control. */
  description?: string;
  /** Mensaje de error. Si existe, se anuncia a lectores de pantalla. */
  error?: string;
  /**
   * Marca el campo como obligatorio (agrega un asterisco decorativo).
   * @default false
   */
  required?: boolean;
  /** El control (input, select…). */
  children?: ReactNode;
  /** Clases adicionales para el contenedor. */
  className?: string;
}
