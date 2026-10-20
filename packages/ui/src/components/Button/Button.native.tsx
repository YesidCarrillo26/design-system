import { Pressable, Text, type PressableProps } from 'react-native';
import { tv } from '../../lib/tv';
import { Icon } from '../Icon';
import { Spinner } from '../Spinner';
import type { ButtonBaseProps } from './Button.types';
import { buttonContentTone, buttonStyles } from './button.variants';

/** Extiende las variantes compartidas con lo propio del toque: feedback al presionar. */
const buttonNativeStyles = tv({
  extend: buttonStyles,
  slots: {
    root: 'active:opacity-pressed',
  },
});

export type ButtonProps = ButtonBaseProps & Omit<PressableProps, keyof ButtonBaseProps>;

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
  children,
  className,
  ...props
}: ButtonProps) {
  const { root, label } = buttonNativeStyles({ variant, size, fullWidth });
  const iconSize = size === 'sm' ? 'sm' : 'md';
  const tone = buttonContentTone[variant];
  return (
    <Pressable
      role="button"
      disabled={disabled}
      // Con `loading` el botón sigue enfocable para lectores de pantalla: se bloquea la acción.
      aria-busy={loading || undefined}
      aria-disabled={loading || undefined}
      onPress={loading ? undefined : onPress}
      className={root({ className })}
      {...props}
    >
      {loading ? <Spinner size={iconSize} tone={tone.spinner} label="Cargando" /> : leadingIcon && <Icon name={leadingIcon} size={iconSize} tone={tone.icon} />}
      {/* En React Native el color del texto no se hereda: el texto lleva su propio slot. */}
      {typeof children === 'string' || typeof children === 'number' ? (
        <Text className={label()}>{children}</Text>
      ) : (
        children
      )}
      {trailingIcon && <Icon name={trailingIcon} size={iconSize} tone={tone.icon} />}
    </Pressable>
  );
}
