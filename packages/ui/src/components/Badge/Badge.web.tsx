import type { ComponentPropsWithRef } from 'react';
import { tv } from '../../lib/tv';
import type { BadgeBaseProps } from './Badge.types';
import { badgeStyles } from './badge.variants';

const badgeWebStyles = tv({ extend: badgeStyles, slots: { root: 'inline-flex' } });

export type BadgeProps = BadgeBaseProps & Omit<ComponentPropsWithRef<'span'>, keyof BadgeBaseProps>;

/** Etiqueta corta de estado. */
export function Badge({ variant, className, ...props }: BadgeProps) {
  const { root, label } = badgeWebStyles({ variant });
  return <span className={root({ className: `${label()} ${className ?? ''}` })} {...props} />;
}
