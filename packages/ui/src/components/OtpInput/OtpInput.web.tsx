'use client';

import { OTPField } from '@base-ui/react/otp-field';
import { useId } from 'react';
import { tv } from '../../lib/tv';
import { Field } from '../Field';
import type { OtpInputBaseProps } from './OtpInput.types';
import { otpInputStyles } from './otpInput.variants';

const otpWebStyles = tv({
  extend: otpInputStyles,
  slots: {
    root: 'flex',
    box: [
      'text-center text-heading-md font-semibold text-foreground outline-none',
      'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      'disabled:cursor-not-allowed',
    ],
  },
});

export type OtpInputProps = OtpInputBaseProps;

/** Código de un solo uso con Base UI `OTPField`: pegar, autocompletar del SMS y mover con flechas ya funcionan. */
export function OtpInput({ label, length = 6, value, defaultValue, onValueChange, onComplete, inputMode = 'numeric', description, error, mask = false, disabled = false, className }: OtpInputProps) {
  const id = useId();
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;
  const describedBy = [description ? descriptionId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined;
  const s = otpWebStyles({ invalid: Boolean(error), disabled });
  return (
    <Field label={label} description={description} error={error} htmlFor={id} descriptionId={descriptionId} errorId={errorId}>
      <OTPField.Root
        id={id}
        length={length}
        value={value}
        defaultValue={defaultValue}
        onValueChange={(next) => onValueChange?.(next)}
        onValueComplete={(next) => onComplete?.(next)}
        validationType={inputMode}
        normalizeValue={inputMode === 'alphanumeric' ? (text) => text.toUpperCase() : undefined}
        mask={mask}
        disabled={disabled}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        className={s.root({ className })}
      >
        {Array.from({ length }, (_, index) => (
          // El primer campo toma el nombre de la etiqueta; el resto, "Carácter n de N".
          <OTPField.Input key={index} className={s.box()} aria-label={index === 0 ? undefined : `Carácter ${index + 1} de ${length}`} />
        ))}
      </OTPField.Root>
    </Field>
  );
}
