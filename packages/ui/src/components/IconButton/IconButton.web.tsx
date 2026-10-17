import type { ComponentPropsWithRef } from 'react';
import { tv } from '../../lib/tv';
import { Icon } from '../Icon';
import type { IconButtonBaseProps } from './IconButton.types';
import { iconButtonStyles, iconButtonTone } from './iconButton.variants';

const iconButtonWebStyles = tv({
  extend: iconButtonStyles,
  base: [
    'inline-flex cursor-pointer transition-colors hover:bg-muted',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:pointer-events-none',
  ],
});

export type IconButtonProps = IconButtonBaseProps & Omit<ComponentPropsWithRef<'button'>, keyof IconButtonBaseProps | 'children'>;

/** Botón de ícono accesible: `label` es su nombre para lectores de pantalla. */
export function IconButton({ icon, label, variant = 'ghost', size, disabled, onPress, onClick, className, ...props }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      className={iconButtonWebStyles({ variant, size, className })}
      onClick={(event) => {
        onClick?.(event);
        onPress?.();
      }}
      {...props}
    >
      <Icon name={icon} tone={iconButtonTone[variant]} />
    </button>
  );
}
