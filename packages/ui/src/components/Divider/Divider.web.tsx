import type { ComponentPropsWithRef } from 'react';
import type { DividerBaseProps } from './Divider.types';
import { dividerStyles } from './divider.variants';

export type DividerProps = DividerBaseProps & Omit<ComponentPropsWithRef<'div'>, keyof DividerBaseProps | 'children'>;

/** Línea separadora horizontal o vertical. */
export function Divider({ orientation, className, ...props }: DividerProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation ?? 'horizontal'}
      className={dividerStyles({ orientation, className })}
      {...props}
    />
  );
}
