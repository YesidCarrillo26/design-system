import { useCallback, useState } from 'react';

interface Options<T> {
  /** Valor controlado: si se pasa, el componente no guarda estado propio. */
  value?: T;
  /** Valor inicial cuando no es controlado. */
  defaultValue: T;
  onChange?: (next: T) => void;
}

/** Estado que puede ser controlado (`value`) o no (`defaultValue`), como los inputs nativos. */
export function useControllableState<T>({ value, defaultValue, onChange }: Options<T>) {
  const [inner, setInner] = useState(defaultValue);
  const controlled = value !== undefined;
  const set = useCallback(
    (next: T) => {
      if (!controlled) setInner(next);
      onChange?.(next);
    },
    [controlled, onChange],
  );
  return [controlled ? value : inner, set] as const;
}
