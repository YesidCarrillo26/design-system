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
    root: 'flex-row items-center justify-center rounded-md border disabled:opacity-50',
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
        root: 'border-border bg-transparent',
        label: 'text-foreground',
      },
    },
    size: {
      sm: { root: 'h-9 gap-1.5 px-3', label: 'text-body-sm' },
      md: { root: 'h-11 gap-2 px-4', label: 'text-body-md' },
      lg: { root: 'h-12 gap-2 px-6', label: 'text-body-lg' },
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});
