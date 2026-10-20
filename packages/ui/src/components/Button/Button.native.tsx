import { Pressable, Text, type PressableProps } from 'react-native';
import { tv } from '../../lib/tv';
import type { ButtonBaseProps } from './Button.types';
import { buttonStyles } from './button.variants';

/** Extiende las variantes compartidas con lo propio del toque: feedback al presionar. */
const buttonNativeStyles = tv({
  extend: buttonStyles,
  slots: {
    root: 'active:opacity-pressed',
  },
});

export type ButtonProps = ButtonBaseProps & Omit<PressableProps, keyof ButtonBaseProps>;

/** Botón accesible con tres variantes y tres tamaños. */
export function Button({
  variant,
  size,
  disabled,
  onPress,
  children,
  className,
  ...props
}: ButtonProps) {
  const { root, label } = buttonNativeStyles({ variant, size });
  return (
    <Pressable
      role="button"
      disabled={disabled}
      onPress={onPress}
      className={root({ className })}
      {...props}
    >
      {/* En React Native el color del texto no se hereda: el texto lleva su propio slot. */}
      {typeof children === 'string' || typeof children === 'number' ? (
        <Text className={label()}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
