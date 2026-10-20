import { Pressable, type PressableProps } from 'react-native';
import { tv } from '../../lib/tv';
import { Icon } from '../Icon';
import type { IconButtonBaseProps } from './IconButton.types';
import { iconButtonStyles, iconButtonTone } from './iconButton.variants';

const iconButtonNativeStyles = tv({ extend: iconButtonStyles, base: 'active:opacity-pressed' });

export type IconButtonProps = IconButtonBaseProps & Omit<PressableProps, keyof IconButtonBaseProps | 'children'>;

/** Botón de ícono accesible: `label` es su nombre para lectores de pantalla. */
export function IconButton({ icon, label, variant = 'ghost', size, disabled, onPress, className, ...props }: IconButtonProps) {
  return (
    <Pressable
      role="button"
      aria-label={label}
      disabled={disabled}
      onPress={onPress}
      className={iconButtonNativeStyles({ variant, size, className })}
      {...props}
    >
      <Icon name={icon} tone={iconButtonTone[variant]} />
    </Pressable>
  );
}
