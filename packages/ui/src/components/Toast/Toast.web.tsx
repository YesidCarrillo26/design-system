'use client';

import { tv } from '../../lib/tv';
import { Icon } from '../Icon';
import type { ToastProviderBaseProps } from './Toast.types';
import { ToastContext } from './ToastContext';
import { toastCloseTone, toastIcon, toastStyles } from './toast.variants';
import { useToastQueue } from './useToastQueue';

const toastWebStyles = tv({ extend: toastStyles, slots: { item: 'pointer-events-auto' } });

export type ToastProviderProps = ToastProviderBaseProps;

/** Provee `useToast()` y muestra los avisos en una región `aria-live` abajo a la derecha. */
export function ToastProvider({ children }: ToastProviderProps) {
  const { toasts, show, dismiss } = useToastQueue();
  return (
    <ToastContext.Provider value={{ show, dismiss }}>
      {children}
      <div aria-label="Notificaciones" role="region" aria-live="polite" className="pointer-events-none fixed bottom-4 right-4 z-toast flex w-80 max-w-[calc(100vw-2rem)] flex-col gap-2">
        {toasts.map((toast) => {
          const s = toastWebStyles({ variant: toast.variant });
          const icon = toastIcon[toast.variant];
          return (
            <div key={toast.id} role={toast.variant === 'destructive' ? 'alert' : 'status'} className={s.item()}>
              {icon && <Icon name={icon.name} size="md" tone={icon.tone} />}
              <div className={s.content()}>
                {toast.title && <p className={s.title()}>{toast.title}</p>}
                <p className={s.message()}>{toast.message}</p>
              </div>
              {toast.action && (
                <button
                  type="button"
                  onClick={() => {
                    toast.action?.onPress();
                    dismiss(toast.id);
                  }}
                  className={`${s.action()} cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
                >
                  {toast.action.label}
                </button>
              )}
              <button
                type="button"
                aria-label="Cerrar aviso"
                onClick={() => dismiss(toast.id)}
                className="inline-flex size-8 cursor-pointer items-center justify-center rounded-md hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Icon name="x" size="sm" tone={toastCloseTone[toast.variant]} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
