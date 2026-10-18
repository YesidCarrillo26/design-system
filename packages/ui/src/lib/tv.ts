import { twMergeConfig } from '@chroma-yesid/tokens/tw-merge';
import { createTV } from 'tailwind-variants';

/**
 * `tv` del design system: tailwind-variants con tailwind-merge configurado para los
 * tamaños de texto propios (sin esto, `text-body-md` y `text-foreground` se pisan).
 */
export const tv = createTV({ twMergeConfig });

export type { VariantProps } from 'tailwind-variants';
