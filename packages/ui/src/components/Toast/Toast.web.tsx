'use client';

import { tv } from '../../lib/tv';
import { Icon } from '../Icon';
import type { ToastProviderBaseProps } from './Toast.types';
import { ToastContext } from './ToastContext';
import { toastStyles } from './toast.variants';
import { useToastQueue } from './useToastQueue';

const toastWebStyles = tv({ extend: toastStyles, slots: { item: 'pointer-events-auto' } });

export type ToastProviderProps = ToastProviderBaseProps;

/** Provee `useToast()` y muestra los avisos en una región `aria-live` abajo a la derecha. */
export function ToastProvider({ children }: ToastProviderProps) {
  const { toasts, show, dismiss } = useToastQueue();
  return (
    <ToastContext.Provider value={{ show, dismiss }}>
      {children}
      <div aria-label="Notificaciones" role="region" aria-live="polite" className="pointer-events-none fixed bottom-4 right-4 z-50 flex w-80 max-w-[calc(100vw-2rem)] flex-col gap-2">
        {toasts.map((toast) => {
          const s = toastWebStyles({ variant: toast.variant });
          return (
            <div key={toast.id} role={toast.variant === 'destructive' ? 'alert' : 'status'} className={s.item()}>
              <p className={s.message()}>{toast.message}</p>
              <button
                type="button"
                aria-label="Cerrar aviso"
                onClick={() => dismiss(toast.id)}
                className="inline-flex size-8 cursor-pointer items-center justify-center rounded-md hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Icon name="x" size="sm" tone={toast.variant === 'destructive' ? 'on-primary' : 'default'} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
