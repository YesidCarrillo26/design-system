import { View, type ViewProps } from 'react-native';
import type { BoxBaseProps } from './Box.types';
import { boxStyles } from './box.variants';

export type BoxProps = BoxBaseProps & Omit<ViewProps, keyof BoxBaseProps>;

/** Contenedor con relleno, superficie, radio y borde. */
export function Box({ padding, surface, radius, bordered, className, ...props }: BoxProps) {
  return <View className={boxStyles({ padding, surface, radius, bordered, className })} {...props} />;
}
