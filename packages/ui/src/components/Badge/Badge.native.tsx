import { Text, View, type ViewProps } from 'react-native';
import { Icon } from '../Icon';
import type { BadgeBaseProps } from './Badge.types';
import { badgeIconTone, badgeStyles, resolveBadge } from './badge.variants';

export type BadgeProps = BadgeBaseProps & Omit<ViewProps, keyof BadgeBaseProps>;

/** Etiqueta corta de estado. */
export function Badge({ tone, appearance, variant, icon, className, children, ...props }: BadgeProps) {
  const resolved = resolveBadge({ tone, appearance, variant });
  const { root, label } = badgeStyles(resolved);
  return (
    <View className={root({ className })} {...props}>
      {icon && <Icon name={icon} size="sm" tone={badgeIconTone(resolved.tone, resolved.appearance)} />}
      {typeof children === 'string' || typeof children === 'number' ? <Text className={label()}>{children}</Text> : children}
    </View>
  );
}
