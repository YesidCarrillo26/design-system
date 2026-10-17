'use client';

import { type ComponentPropsWithRef, useId } from 'react';
import { tv } from '../../lib/tv';
import { Field } from '../Field';
import type { TextFieldBaseProps } from './TextField.types';
import { textInputStyles } from './textInput.variants';

const inputWebStyles = tv({
  extend: textInputStyles,
  base: [
    'placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
  ],
});

export type TextFieldProps = TextFieldBaseProps &
  Omit<ComponentPropsWithRef<'input'>, keyof TextFieldBaseProps | 'onChange' | 'size'>;

/** Campo de texto de una línea con etiqueta, ayuda y error. */
export function TextField({ label, description, error, required, type = 'text', onChangeText, className, ...props }: TextFieldProps) {
  const id = useId();
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;
  const describedBy = [description ? descriptionId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined;
  return (
    <Field label={label} description={description} error={error} required={required} htmlFor={id} descriptionId={descriptionId} errorId={errorId}>
      <input
        id={id}
        type={type}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={inputWebStyles({ invalid: Boolean(error), className })}
        onChange={(event) => onChangeText?.(event.target.value)}
        {...props}
      />
    </Field>
  );
}
