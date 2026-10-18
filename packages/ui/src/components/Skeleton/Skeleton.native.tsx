import { View, type ViewProps } from 'react-native';
import type { SkeletonBaseProps } from './Skeleton.types';
import { skeletonStyles } from './skeleton.variants';

export type SkeletonProps = SkeletonBaseProps & Omit<ViewProps, keyof SkeletonBaseProps | 'children'>;

/**
 * Marcador de carga. Es decorativo: se oculta a los lectores de pantalla. En native es estático
 * (sin pulso); el contenedor que lo agrupa debe declarar `accessibilityState={{ busy: true }}`.
 */
export function Skeleton({ shape, className, ...props }: SkeletonProps) {
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      className={skeletonStyles({ shape, className })}
      {...props}
    />
  );
}
