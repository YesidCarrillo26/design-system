'use client';

import { type ComponentPropsWithRef, useId } from 'react';
import { tv } from '../../lib/tv';
import { Field } from '../Field';
import { Icon } from '../Icon';
import type { TextFieldBaseProps } from './TextField.types';
import { textFieldStyles } from './textField.variants';

const fieldWebStyles = tv({
  extend: textFieldStyles,
  slots: {
    root: [
      'flex cursor-text',
      'has-focus-visible:ring-2 has-focus-visible:ring-ring',
      'has-focus-visible:ring-offset-2 has-focus-visible:ring-offset-background',
    ],
    input: 'min-w-0 bg-transparent outline-none placeholder:text-muted-foreground',
  },
});

export type TextFieldProps = TextFieldBaseProps &
  Omit<ComponentPropsWithRef<'input'>, keyof TextFieldBaseProps | 'onChange' | 'size'>;

/** Campo de texto de una línea con etiqueta, ayuda, error y adornos opcionales. */
export function TextField({
  label,
  description,
  error,
  required,
  type = 'text',
  leadingIcon,
  trailingIcon,
  prefix,
  suffix,
  disabled,
  onChangeText,
  className,
  ...props
}: TextFieldProps) {
  const id = useId();
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;
  const describedBy = [description ? descriptionId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined;
  const s = fieldWebStyles({ invalid: Boolean(error), disabled });
  return (
    <Field label={label} description={description} error={error} required={required} htmlFor={id} descriptionId={descriptionId} errorId={errorId}>
      <div className={s.root({ className })}>
        {leadingIcon && <Icon name={leadingIcon} size="md" tone="muted" />}
        {prefix && <span className={s.affix()}>{prefix}</span>}
        <input
          id={id}
          type={type}
          required={required}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={s.input()}
          onChange={(event) => onChangeText?.(event.target.value)}
          {...props}
        />
        {suffix && <span className={s.affix()}>{suffix}</span>}
        {trailingIcon && <Icon name={trailingIcon} size="md" tone="muted" />}
      </div>
    </Field>
  );
}
