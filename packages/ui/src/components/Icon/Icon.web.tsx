import type { SVGProps } from 'react';
import type { IconBaseProps } from './Icon.types';
import { iconStyles, iconSizePx } from './icon.variants';
import { iconPaths } from './icons';

export type IconProps = IconBaseProps & Omit<SVGProps<SVGSVGElement>, keyof IconBaseProps>;

/** Ícono SVG. Decorativo salvo que se indique `label`. */
export function Icon({ name, size = 'md', tone, label, className, ...props }: IconProps) {
  const px = iconSizePx[size];
  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={iconStyles({ tone, className })}
      {...props}
    >
      <path d={iconPaths[name]} />
    </svg>
  );
}
