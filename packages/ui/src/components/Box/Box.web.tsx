import type { ComponentPropsWithRef } from 'react';
import type { BoxBaseProps } from './Box.types';
import { boxStyles } from './box.variants';

export type BoxProps = BoxBaseProps & Omit<ComponentPropsWithRef<'div'>, keyof BoxBaseProps>;

/** Contenedor con relleno, superficie, radio y borde. */
export function Box({ padding, surface, radius, bordered, className, ...props }: BoxProps) {
  return <div className={boxStyles({ padding, surface, radius, bordered, className })} {...props} />;
}
