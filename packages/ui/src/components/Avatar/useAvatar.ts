import { useState } from 'react';

/** Iniciales de un nombre: "Ada Lovelace" → "AL". */
export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return parts
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

/** Estado compartido: muestra la imagen mientras exista y no haya fallado. */
export function useAvatar(src?: string) {
  const [failed, setFailed] = useState(false);
  return { showImage: Boolean(src) && !failed, onError: () => setFailed(true) };
}
