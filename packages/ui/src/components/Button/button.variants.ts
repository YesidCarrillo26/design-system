import { tv } from '../../lib/tv';

/**
 * Variantes compartidas del botón, con dos slots:
 * - `root`: el contenedor (fondo, borde, tamaño).
 * - `label`: el texto. En React Native el color del texto no se hereda del contenedor,
 *   así que native aplica `label` a un <Text>; web lo concatena al <button>.
 *
 * Solo clases válidas en ambas plataformas: lo interactivo (`hover:`, `focus-visible:`,
 * `active:`) se agrega en cada implementación.
 */
export const buttonStyles = tv({
  slots: {
    root: 'flex-row items-center justify-center rounded-md border disabled:opacity-disabled',
    label: 'font-medium',
  },
  variants: {
    variant: {
      primary: {
        root: 'border-transparent bg-primary',
        label: 'text-primary-foreground',
      },
      secondary: {
        root: 'border-transparent bg-secondary',
        label: 'text-secondary-foreground',
      },
      outline: {
        root: 'border-input bg-card',
        label: 'text-foreground',
      },
      ghost: {
        root: 'border-transparent bg-transparent',
        label: 'text-foreground',
      },
      destructive: {
        root: 'border-transparent bg-destructive',
        label: 'text-destructive-foreground',
      },
    },
    fullWidth: { true: { root: 'w-full' }, false: {} },
    size: {
      sm: { root: 'h-9 gap-1.5 px-3', label: 'text-body-sm' },
      md: { root: 'h-11 gap-2 px-4', label: 'text-body-md' },
      lg: { root: 'h-12 gap-2 px-6', label: 'text-body-lg' },
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    fullWidth: false,
  },
});

/** Tono de ícono y de spinner que se lee bien sobre el fondo de cada variante. */
export const buttonContentTone = {
  primary: { icon: 'on-primary', spinner: 'on-primary' },
  secondary: { icon: 'on-secondary', spinner: 'on-secondary' },
  outline: { icon: 'default', spinner: 'muted' },
  ghost: { icon: 'default', spinner: 'muted' },
  destructive: { icon: 'on-destructive', spinner: 'on-destructive' },
} as const;
