import { createContext, useContext } from 'react';
import type { ToastApi } from './Toast.types';

export const ToastContext = createContext<ToastApi | null>(null);

/** Muestra avisos desde cualquier componente dentro de `ToastProvider`. */
export function useToast(): ToastApi {
  const api = useContext(ToastContext);
  if (!api) throw new Error('useToast debe usarse dentro de <ToastProvider>.');
  return api;
}
