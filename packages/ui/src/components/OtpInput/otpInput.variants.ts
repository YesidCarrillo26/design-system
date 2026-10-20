import { tv } from '../../lib/tv';

export const otpInputStyles = tv({
  slots: {
    root: 'flex-row gap-2',
    box: 'h-12 w-10 items-center justify-center rounded-md border bg-card',
    char: 'text-heading-md font-semibold text-foreground',
  },
  variants: {
    invalid: { true: { box: 'border-destructive' }, false: { box: 'border-input' } },
    active: { true: { box: 'border-ring' }, false: {} },
    disabled: { true: { box: 'opacity-disabled' }, false: {} },
  },
  defaultVariants: { invalid: false, active: false, disabled: false },
});

/** Deja solo los caracteres admitidos (y en mayúsculas si es alfanumérico). */
export function sanitizeOtp(text: string, mode: 'numeric' | 'alphanumeric', length: number): string {
  const cleaned = mode === 'numeric' ? text.replace(/\D/g, '') : text.replace(/[^a-z0-9]/gi, '').toUpperCase();
  return cleaned.slice(0, length);
}
