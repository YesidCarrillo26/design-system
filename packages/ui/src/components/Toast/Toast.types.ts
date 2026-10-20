import type { ReactNode } from 'react';

export type ToastVariant = 'default' | 'success' | 'warning' | 'info' | 'destructive';

/** Acción opcional del aviso (p. ej. "Deshacer"). Cierra el aviso al activarse. */
export interface ToastAction {
  label: string;
  onPress: () => void;
}

export interface ToastOptions {
  /**
   * Estilo del aviso. `destructive` se anuncia como alerta; los demás, como estado.
   * @default 'default'
   */
  variant?: ToastVariant;
  /** Título en negrita sobre el mensaje. */
  title?: string;
  /** Botón de texto a la derecha del mensaje. */
  action?: ToastAction;
  /**
   * Milisegundos hasta que se oculta solo. `0` lo deja hasta que se cierre.
   * @default 4000
   */
  duration?: number;
}

/** API imperativa que devuelve `useToast()`. */
export interface ToastApi {
  /** Muestra un aviso y devuelve su id. */
  show: (message: string, options?: ToastOptions) => string;
  /** Oculta un aviso. */
  dismiss: (id: string) => void;
}

/** Contrato compartido de `ToastProvider`: envuelve la app y renderiza los avisos. */
export interface ToastProviderBaseProps {
  children?: ReactNode;
}
