import { iconSizePx } from '../Icon/icon.variants';
import { tv } from '../../lib/tv';
import type { SpinnerBaseProps } from './Spinner.types';

const spinnerStyles = tv({ base: 'animate-spin text-primary motion-reduce:animate-none' });

export type SpinnerProps = SpinnerBaseProps;

/** Indicador de carga. Respeta `prefers-reduced-motion`. */
export function Spinner({ size = 'md', label = 'Cargando', className }: SpinnerProps) {
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
      className={spinnerStyles({ className })}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
