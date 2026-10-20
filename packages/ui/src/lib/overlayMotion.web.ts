/**
 * Clases de entrada y salida de los overlays web. Base UI marca el popup con `data-starting-style`
 * (justo al montarse) y `data-ending-style` (al cerrarse, antes de desmontar), así que basta con
 * una transición entre ese estado y el normal. Duraciones y curvas vienen de los tokens
 * (`--ds-duration-*`, `ease-*`); con `prefers-reduced-motion` el CSS global las lleva a 1ms.
 * Son clases literales: Tailwind no ve nombres armados con plantillas.
 */
export const overlayMotion = {
  /** Velo: solo se funde. */
  backdrop: [
    'transition-opacity duration-(--ds-duration-base) ease-out',
    'data-starting-style:opacity-0',
    'data-ending-style:opacity-0 data-ending-style:duration-(--ds-duration-fast) data-ending-style:ease-in',
  ],
  /** Diálogos y popovers: fundido con una escala leve desde el punto de anclaje. */
  popupScale: [
    'origin-(--transform-origin) transition-[opacity,transform] duration-(--ds-duration-base) ease-out',
    'data-starting-style:scale-95 data-starting-style:opacity-0',
    'data-ending-style:scale-95 data-ending-style:opacity-0 data-ending-style:duration-(--ds-duration-fast) data-ending-style:ease-in',
  ],
  /** Hojas inferiores: suben desde el borde de la pantalla. */
  popupSlideUp: [
    'transition-transform duration-(--ds-duration-slow) ease-out',
    'data-starting-style:translate-y-full',
    'data-ending-style:translate-y-full data-ending-style:duration-(--ds-duration-base) data-ending-style:ease-in',
  ],
  /** Tooltips: solo se funden (son pequeños y frecuentes). */
  popupFade: [
    'transition-opacity duration-(--ds-duration-fast) ease-out',
    'data-starting-style:opacity-0',
    'data-ending-style:opacity-0',
  ],
} as const;
