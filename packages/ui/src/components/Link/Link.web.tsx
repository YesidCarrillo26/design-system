import type { ComponentPropsWithRef } from 'react';
import { tv } from '../../lib/tv';
import type { LinkBaseProps } from './Link.types';
import { linkStyles } from './link.variants';

const linkWebStyles = tv({
  extend: linkStyles,
  base: [
    'rounded-sm hover:opacity-80',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
  ],
});

export type LinkProps = LinkBaseProps & Omit<ComponentPropsWithRef<'a'>, keyof LinkBaseProps>;

/** Enlace de texto. */
export function Link({ href, onPress, onClick, className, ...props }: LinkProps) {
  return (
    <a
      href={href}
      className={linkWebStyles({ className })}
      onClick={(event) => {
        onClick?.(event);
        onPress?.();
      }}
      {...props}
    />
  );
}
