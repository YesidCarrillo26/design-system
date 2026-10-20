import { tv } from '../../lib/tv';
import type { ProgressBaseProps, ProgressTone } from './Progress.types';
import { progressPercent, progressStyles, ringMetrics } from './progress.variants';

const progressWebStyles = tv({
  extend: progressStyles,
  slots: { root: 'flex' },
});

/** Clases literales de trazo para el anillo (Tailwind no ve nombres armados con plantillas). */
const ringStroke: Record<ProgressTone, string> = {
  primary: 'stroke-primary',
  success: 'stroke-success',
  warning: 'stroke-warning',
  info: 'stroke-info',
  destructive: 'stroke-destructive',
};

export type ProgressProps = ProgressBaseProps;

/** Barra o anillo de progreso (`role="progressbar"`). Indeterminado si `value` es `null`; respeta movimiento reducido. */
export function Progress({ label, value = null, max = 100, variant = 'linear', size = 'md', tone = 'primary', showValue = false, className }: ProgressProps) {
  const percent = progressPercent(value, max);
  const aria = {
    role: 'progressbar' as const,
    'aria-label': label,
    'aria-valuemin': 0,
    'aria-valuemax': max,
    'aria-valuenow': percent === null ? undefined : Math.min(Math.max(value ?? 0, 0), max),
  };

  if (variant === 'circular') {
    const { px, stroke } = ringMetrics[size];
    const r = (px - stroke) / 2;
    const c = 2 * Math.PI * r;
    return (
      <div className={`relative inline-flex ${className ?? ''}`} {...aria}>
        <svg width={px} height={px} viewBox={`0 0 ${px} ${px}`} fill="none" className={percent === null ? 'animate-spin motion-reduce:animate-none' : '-rotate-90'} aria-hidden>
          <circle cx={px / 2} cy={px / 2} r={r} strokeWidth={stroke} className="stroke-muted" />
          <circle
            cx={px / 2}
            cy={px / 2}
            r={r}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (percent === null ? 0.75 : 1 - percent / 100)}
            className={`${ringStroke[tone]} transition-[stroke-dashoffset] duration-(--ds-duration-slow) ease-out`}
          />
        </svg>
        {showValue && percent !== null && size === 'lg' && (
          <span aria-hidden className="absolute inset-0 flex items-center justify-center text-body-sm font-medium text-foreground">
            {percent}%
          </span>
        )}
      </div>
    );
  }

  const s = progressWebStyles({ size, tone });
  return (
    <div className={s.root({ className })}>
      <div className={s.track()} {...aria}>
        <div
          className={`${s.fill()} ${percent === null ? 'w-2/5 animate-indeterminate motion-reduce:w-full motion-reduce:animate-none motion-reduce:opacity-50' : 'transition-[width] duration-(--ds-duration-slow) ease-out'}`}
          style={percent === null ? undefined : { width: `${percent}%` }}
        />
      </div>
      {showValue && percent !== null && (
        <span aria-hidden className={s.value()}>
          {percent}%
        </span>
      )}
    </div>
  );
}
