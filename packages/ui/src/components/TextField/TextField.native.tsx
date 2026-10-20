import { useState } from 'react';
import { Text, TextInput, View, type TextInputProps } from 'react-native';
import { useTokenColor } from '../../lib/useTokenColor.native';
import { Field } from '../Field';
import { Icon } from '../Icon';
import type { TextFieldBaseProps } from './TextField.types';
import { textFieldStyles } from './textField.variants';

export type TextFieldProps = TextFieldBaseProps & Omit<TextInputProps, keyof TextFieldBaseProps | 'editable'>;

const keyboard = { text: 'default', email: 'email-address', password: 'default', number: 'numeric' } as const;

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
  className,
  onFocus,
  onBlur,
  ...props
}: TextFieldProps) {
  const placeholderColor = useTokenColor('muted-foreground');
  const [focused, setFocused] = useState(false);
  const s = textFieldStyles({ invalid: Boolean(error), disabled });
  return (
    <Field label={label} description={description} error={error} required={required}>
      <View className={s.root({ className: `${focused && !error ? 'border-ring' : ''} ${className ?? ''}` })}>
        {leadingIcon && <Icon name={leadingIcon} size="md" tone="muted" />}
        {prefix && <Text className={s.affix()}>{prefix}</Text>}
        <TextInput
          accessibilityLabel={label}
          aria-invalid={error ? true : undefined}
          editable={!disabled}
          secureTextEntry={type === 'password'}
          keyboardType={keyboard[type]}
          autoCapitalize={type === 'email' || type === 'password' ? 'none' : undefined}
          placeholderTextColor={placeholderColor}
          className={s.input()}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
          {...props}
        />
        {suffix && <Text className={s.affix()}>{suffix}</Text>}
        {trailingIcon && <Icon name={trailingIcon} size="md" tone="muted" />}
      </View>
    </Field>
  );
}
