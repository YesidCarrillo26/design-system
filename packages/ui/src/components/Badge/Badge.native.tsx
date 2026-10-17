import { Text, View, type ViewProps } from 'react-native';
import type { BadgeBaseProps } from './Badge.types';
import { badgeStyles } from './badge.variants';

export type BadgeProps = BadgeBaseProps & Omit<ViewProps, keyof BadgeBaseProps>;

/** Etiqueta corta de estado. */
export function Badge({ variant, className, children, ...props }: BadgeProps) {
  const { root, label } = badgeStyles({ variant });
  return (
    <View className={root({ className })} {...props}>
      {typeof children === 'string' || typeof children === 'number' ? <Text className={label()}>{children}</Text> : children}
    </View>
  );
}
