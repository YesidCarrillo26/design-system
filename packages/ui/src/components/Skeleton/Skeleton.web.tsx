import type { ComponentPropsWithRef } from 'react';
import { tv } from '../../lib/tv';
import type { SkeletonBaseProps } from './Skeleton.types';
import { skeletonStyles } from './skeleton.variants';

const webStyles = tv({ extend: skeletonStyles, base: 'animate-pulse motion-reduce:animate-none' });

export type SkeletonProps = SkeletonBaseProps & Omit<ComponentPropsWithRef<'div'>, keyof SkeletonBaseProps | 'children'>;

/**
 * Marcador de carga. Es decorativo (`aria-hidden`): el contenedor que lo agrupa debe llevar
 * `aria-busy="true"`. Respeta `prefers-reduced-motion`.
 */
export function Skeleton({ shape, className, ...props }: SkeletonProps) {
  return <div aria-hidden="true" className={webStyles({ shape, className })} {...props} />;
}
