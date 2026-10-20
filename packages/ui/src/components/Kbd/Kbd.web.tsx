import type { ComponentPropsWithRef } from 'react';
import { tv } from '../../lib/tv';
import type { KbdBaseProps } from './Kbd.types';
import { kbdStyles } from './kbd.variants';

const kbdWebStyles = tv({ extend: kbdStyles, slots: { root: 'inline-flex' } });

export type KbdProps = KbdBaseProps & Omit<ComponentPropsWithRef<'kbd'>, keyof KbdBaseProps>;

/** Una tecla o atajo de teclado (`<kbd>`). */
export function Kbd({ className, ...props }: KbdProps) {
  const { root, label } = kbdWebStyles();
  return <kbd className={root({ className: `${label()} ${className ?? ''}` })} {...props} />;
}
