import { tv } from '../../lib/tv';
import type { IconTone } from '../Icon/Icon.types';
import type { IconButtonVariant } from './IconButton.types';

/** Tono del ícono según el fondo del botón. */
export const iconButtonTone: Record<IconButtonVariant, IconTone> = {
  primary: 'on-primary',
  secondary: 'on-secondary',
  outline: 'default',
  ghost: 'default',
};

export const iconButtonStyles = tv({
  base: 'items-center justify-center rounded-md border disabled:opacity-50',
  variants: {
    variant: {
      primary: 'border-transparent bg-primary',
      secondary: 'border-transparent bg-secondary',
      outline: 'border-border bg-transparent',
      ghost: 'border-transparent bg-transparent',
    },
    size: { sm: 'size-9', md: 'size-11', lg: 'size-12' },
  },
  defaultVariants: { variant: 'ghost', size: 'md' },
});
