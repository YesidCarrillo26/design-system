import { View, type ViewProps } from 'react-native';
import type { CardBaseProps } from './Card.types';
import { cardStyles } from './card.variants';

export type CardProps = CardBaseProps & Omit<ViewProps, keyof CardBaseProps>;

/** Superficie elevada para agrupar contenido relacionado. */
export function Card({ padding, elevation, className, ...props }: CardProps) {
  return <View className={cardStyles({ padding, elevation, className })} {...props} />;
}
