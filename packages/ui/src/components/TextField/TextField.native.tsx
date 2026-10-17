import { TextInput, type TextInputProps } from 'react-native';
import { tv } from '../../lib/tv';
import { useTokenColor } from '../../lib/useTokenColor.native';
import { Field } from '../Field';
import type { TextFieldBaseProps } from './TextField.types';
import { textInputStyles } from './textInput.variants';

const inputNativeStyles = tv({ extend: textInputStyles, base: 'focus:border-ring' });

export type TextFieldProps = TextFieldBaseProps & Omit<TextInputProps, keyof TextFieldBaseProps | 'editable'>;

const keyboard = { text: 'default', email: 'email-address', password: 'default', number: 'numeric' } as const;

/** Campo de texto de una línea con etiqueta, ayuda y error. */
export function TextField({ label, description, error, required, type = 'text', disabled, className, ...props }: TextFieldProps) {
  const placeholderColor = useTokenColor('muted-foreground');
  return (
    <Field label={label} description={description} error={error} required={required}>
      <TextInput
        accessibilityLabel={label}
        aria-invalid={error ? true : undefined}
        editable={!disabled}
        secureTextEntry={type === 'password'}
        keyboardType={keyboard[type]}
        autoCapitalize={type === 'email' || type === 'password' ? 'none' : undefined}
        placeholderTextColor={placeholderColor}
        className={inputNativeStyles({ invalid: Boolean(error), className })}
        {...props}
      />
    </Field>
  );
}
