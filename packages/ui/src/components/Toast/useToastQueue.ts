import { useCallback, useEffect, useRef, useState } from 'react';
import type { ToastApi, ToastVariant } from './Toast.types';

export interface ToastEntry {
  id: string;
  message: string;
  variant: ToastVariant;
}

/** Cola de avisos con cierre automático. La comparten el provider web y el native. */
export function useToastQueue(): ToastApi & { toasts: ToastEntry[] } {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  const counter = useRef(0);

  const dismiss = useCallback((id: string) => {
    const timer = timers.current.get(id);
    if (timer) clearTimeout(timer);
    timers.current.delete(id);
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const show = useCallback<ToastApi['show']>(
    (message, { variant = 'default', duration = 4000 } = {}) => {
      counter.current += 1;
      const id = `toast-${counter.current}`;
      setToasts((current) => [...current, { id, message, variant }]);
      if (duration > 0) timers.current.set(id, setTimeout(() => dismiss(id), duration));
      return id;
    },
    [dismiss],
  );

  useEffect(() => {
    const pending = timers.current;
    return () => {
      for (const timer of pending.values()) clearTimeout(timer);
      pending.clear();
    };
  }, []);

  return { toasts, show, dismiss };
}
