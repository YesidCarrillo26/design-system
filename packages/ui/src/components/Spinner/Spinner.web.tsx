import { iconSizePx } from '../Icon/icon.variants';
import { tv } from '../../lib/tv';
import type { SpinnerBaseProps } from './Spinner.types';

const spinnerStyles = tv({
  base: 'animate-spin motion-reduce:animate-none',
  variants: {
    tone: {
      primary: 'text-primary',
      muted: 'text-muted-foreground',
      'on-primary': 'text-primary-foreground',
      'on-secondary': 'text-secondary-foreground',
      'on-destructive': 'text-destructive-foreground',
    },
  },
  defaultVariants: { tone: 'primary' },
});

export type SpinnerProps = SpinnerBaseProps;

/** Indicador de carga. Respeta `prefers-reduced-motion`. */
export function Spinner({ size = 'md', tone, label = 'Cargando', className }: SpinnerProps) {
  const px = iconSizePx[size];
  return (
    <svg
      role="status"
      aria-label={label}
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      className={spinnerStyles({ tone, className })}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
