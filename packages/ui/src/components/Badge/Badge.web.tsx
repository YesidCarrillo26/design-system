import type { ComponentPropsWithRef } from 'react';
import { tv } from '../../lib/tv';
import { Icon } from '../Icon';
import type { BadgeBaseProps } from './Badge.types';
import { badgeIconTone, badgeStyles, resolveBadge } from './badge.variants';

const badgeWebStyles = tv({ extend: badgeStyles, slots: { root: 'inline-flex' } });

export type BadgeProps = BadgeBaseProps & Omit<ComponentPropsWithRef<'span'>, keyof BadgeBaseProps>;

/** Etiqueta corta de estado. */
export function Badge({ tone, appearance, variant, icon, className, children, ...props }: BadgeProps) {
  const resolved = resolveBadge({ tone, appearance, variant });
  const { root, label } = badgeWebStyles(resolved);
  return (
    <span className={root({ className: `${label()} ${className ?? ''}` })} {...props}>
      {icon && <Icon name={icon} size="sm" tone={badgeIconTone(resolved.tone, resolved.appearance)} />}
      {children}
    </span>
  );
}
