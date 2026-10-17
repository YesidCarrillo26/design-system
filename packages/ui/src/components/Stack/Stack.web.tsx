import type { ComponentPropsWithRef } from 'react';
import type { StackBaseProps } from './Stack.types';
import { stackStyles } from './stack.variants';

export type StackProps = StackBaseProps & Omit<ComponentPropsWithRef<'div'>, keyof StackBaseProps>;

/** Apila a sus hijos en una dirección con separación consistente. */
export function Stack({ direction, gap, align, justify, className, ...props }: StackProps) {
  return <div className={stackStyles({ direction, gap, align, justify, className })} {...props} />;
}
