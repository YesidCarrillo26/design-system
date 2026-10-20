import { Text, View, type ViewProps } from 'react-native';
import type { KbdBaseProps } from './Kbd.types';
import { kbdStyles } from './kbd.variants';

export type KbdProps = KbdBaseProps & Omit<ViewProps, keyof KbdBaseProps>;

/** Una tecla o atajo. En native sirve para mostrar atajos de un teclado externo. */
export function Kbd({ className, children, ...props }: KbdProps) {
  const { root, label } = kbdStyles();
  return (
    <View className={root({ className })} {...props}>
      {typeof children === 'string' || typeof children === 'number' ? <Text className={label()}>{children}</Text> : children}
    </View>
  );
}
