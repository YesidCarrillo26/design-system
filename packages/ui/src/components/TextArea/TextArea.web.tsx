'use client';

import { type ComponentPropsWithRef, useId } from 'react';
import { tv } from '../../lib/tv';
import { Field } from '../Field';
import { textInputStyles } from '../TextField/textInput.variants';
import type { TextAreaBaseProps } from './TextArea.types';

const textAreaWebStyles = tv({
  extend: textInputStyles,
  base: [
    'placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
  ],
});

export type TextAreaProps = TextAreaBaseProps & Omit<ComponentPropsWithRef<'textarea'>, keyof TextAreaBaseProps | 'onChange'>;

/** Campo de texto de varias líneas con etiqueta, ayuda y error. */
export function TextArea({ label, description, error, required, rows = 3, onChangeText, className, ...props }: TextAreaProps) {
  const id = useId();
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;
  const describedBy = [description ? descriptionId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined;
  return (
    <Field label={label} description={description} error={error} required={required} htmlFor={id} descriptionId={descriptionId} errorId={errorId}>
      <textarea
        id={id}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={textAreaWebStyles({ invalid: Boolean(error), multiline: true, className })}
        onChange={(event) => onChangeText?.(event.target.value)}
        {...props}
      />
    </Field>
  );
}
