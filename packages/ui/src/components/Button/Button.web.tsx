import type { ComponentPropsWithRef } from 'react';
import { tv } from '../../lib/tv';
import { Icon } from '../Icon';
import { Spinner } from '../Spinner';
import type { ButtonBaseProps } from './Button.types';
import { buttonContentTone, buttonStyles } from './button.variants';

/** Extiende las variantes compartidas con lo propio del DOM: hover, foco por teclado y cursor. */
const buttonWebStyles = tv({
  extend: buttonStyles,
  slots: {
    root: [
      'inline-flex cursor-pointer transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      'disabled:pointer-events-none aria-busy:cursor-progress',
    ],
  },
  variants: {
    variant: {
      primary: { root: 'hover:opacity-90' },
      secondary: { root: 'hover:opacity-80' },
      outline: { root: 'hover:bg-accent' },
      ghost: { root: 'hover:bg-accent' },
      destructive: { root: 'hover:opacity-90' },
    },
  },
});

export type ButtonProps = ButtonBaseProps &
  Omit<ComponentPropsWithRef<'button'>, keyof ButtonBaseProps>;

/** Botón accesible con cinco variantes, tres tamaños, íconos y estado de carga. */
export function Button({
  variant = 'primary',
  size,
  loading,
  leadingIcon,
  trailingIcon,
  fullWidth,
  disabled,
  onPress,
  onClick,
  className,
  children,
  ...props
}: ButtonProps) {
  const { root, label } = buttonWebStyles({ variant, size, fullWidth });
  const iconSize = size === 'sm' ? 'sm' : 'md';
  const tone = buttonContentTone[variant];
  return (
    <button
      type="button"
      disabled={disabled}
      // Con `loading` el botón sigue enfocable: se bloquea la acción, no el foco.
      aria-busy={loading || undefined}
      aria-disabled={loading || undefined}
      // En el DOM el color del texto se hereda, así que `label` va en el mismo elemento.
      className={root({ className: `${label()} ${className ?? ''}` })}
      onClick={(event) => {
        if (loading) return;
        onClick?.(event);
        onPress?.();
      }}
      {...props}
    >
      {loading ? <Spinner size={iconSize} tone={tone.spinner} label="Cargando" /> : leadingIcon && <Icon name={leadingIcon} size={iconSize} tone={tone.icon} />}
      {children}
      {trailingIcon && <Icon name={trailingIcon} size={iconSize} tone={tone.icon} />}
    </button>
  );
}
