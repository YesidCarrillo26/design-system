import type { ComponentPropsWithRef } from 'react';
import type { CardBaseProps } from './Card.types';
import { cardStyles } from './card.variants';

export type CardProps = CardBaseProps & Omit<ComponentPropsWithRef<'div'>, keyof CardBaseProps>;

/** Superficie elevada para agrupar contenido relacionado. */
export function Card({ padding, elevation, className, ...props }: CardProps) {
  return <div className={cardStyles({ padding, elevation, className })} {...props} />;
}
