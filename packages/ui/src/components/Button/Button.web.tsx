import type { ComponentPropsWithRef } from 'react';
import { tv } from '../../lib/tv';
import type { ButtonBaseProps } from './Button.types';
import { buttonStyles } from './button.variants';

/** Extiende las variantes compartidas con lo propio del DOM: hover, foco por teclado y cursor. */
const buttonWebStyles = tv({
  extend: buttonStyles,
  slots: {
    root: [
      'inline-flex cursor-pointer transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      'disabled:pointer-events-none',
    ],
  },
  variants: {
    variant: {
      primary: { root: 'hover:opacity-90' },
      secondary: { root: 'hover:opacity-80' },
      outline: { root: 'hover:bg-secondary' },
    },
  },
});

export type ButtonProps = ButtonBaseProps &
  Omit<ComponentPropsWithRef<'button'>, keyof ButtonBaseProps>;

/** Botón accesible con tres variantes y tres tamaños. */
export function Button({
  variant,
  size,
  disabled,
  onPress,
  onClick,
  className,
  ...props
}: ButtonProps) {
  const { root, label } = buttonWebStyles({ variant, size });
  return (
    <button
      type="button"
      disabled={disabled}
      // En el DOM el color del texto se hereda, así que `label` va en el mismo elemento.
      className={root({ className: `${label()} ${className ?? ''}` })}
      onClick={(event) => {
        onClick?.(event);
        onPress?.();
      }}
      {...props}
    />
  );
}
