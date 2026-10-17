import { View, type ViewProps } from 'react-native';
import type { DividerBaseProps } from './Divider.types';
import { dividerStyles } from './divider.variants';

export type DividerProps = DividerBaseProps & Omit<ViewProps, keyof DividerBaseProps | 'children'>;

/** Línea separadora horizontal o vertical. */
export function Divider({ orientation, className, ...props }: DividerProps) {
  return <View className={dividerStyles({ orientation, className })} {...props} />;
}
