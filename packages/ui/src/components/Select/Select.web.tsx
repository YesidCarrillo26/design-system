'use client';

import { useId } from 'react';
import { tv } from '../../lib/tv';
import { useControllableState } from '../../lib/useControllableState';
import { Field } from '../Field';
import type { SelectBaseProps } from './Select.types';
import { selectStyles } from './select.variants';

const selectWebStyles = tv({
  extend: selectStyles,
  slots: {
    trigger: [
      'w-full cursor-pointer appearance-none text-body-md text-foreground',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      'focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed',
    ],
  },
});

export type SelectProps = SelectBaseProps;

/** Lista desplegable. Usa un `<select>` nativo: teclado, lectores de pantalla y selector del sistema gratis. */
export function Select({ label, options, value, defaultValue = '', placeholder, description, error, required, disabled, onValueChange, className }: SelectProps) {
  const id = useId();
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;
  const [current, setCurrent] = useControllableState({ value, defaultValue, onChange: onValueChange });
  const describedBy = [description ? descriptionId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined;
  return (
    <Field label={label} description={description} error={error} required={required} htmlFor={id} descriptionId={descriptionId} errorId={errorId}>
      <select
        id={id}
        value={current}
        required={required}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={selectWebStyles({ invalid: Boolean(error) }).trigger({ className })}
        onChange={(event) => setCurrent(event.target.value)}
      >
        <option value="">{placeholder ?? 'Selecciona…'}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    </Field>
  );
}
