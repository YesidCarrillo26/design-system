import { View, type ViewProps } from 'react-native';
import type { StackBaseProps } from './Stack.types';
import { stackStyles } from './stack.variants';

export type StackProps = StackBaseProps & Omit<ViewProps, keyof StackBaseProps>;

/** Apila a sus hijos en una dirección con separación consistente. */
export function Stack({ direction, gap, align, justify, className, ...props }: StackProps) {
  return <View className={stackStyles({ direction, gap, align, justify, className })} {...props} />;
}
