import { TextInput, type TextInputProps } from 'react-native';
import { tv } from '../../lib/tv';
import { useTokenColor } from '../../lib/useTokenColor.native';
import { Field } from '../Field';
import { textInputStyles } from '../TextField/textInput.variants';
import type { TextAreaBaseProps } from './TextArea.types';

const textAreaNativeStyles = tv({ extend: textInputStyles, base: 'focus:border-ring' });

export type TextAreaProps = TextAreaBaseProps & Omit<TextInputProps, keyof TextAreaBaseProps | 'editable' | 'multiline'>;

/** Campo de texto de varias líneas con etiqueta, ayuda y error. */
export function TextArea({ label, description, error, required, rows = 3, disabled, className, ...props }: TextAreaProps) {
  const placeholderColor = useTokenColor('muted-foreground');
  return (
    <Field label={label} description={description} error={error} required={required}>
      <TextInput
        multiline
        numberOfLines={rows}
        textAlignVertical="top"
        accessibilityLabel={label}
        aria-invalid={error ? true : undefined}
        editable={!disabled}
        placeholderTextColor={placeholderColor}
        className={textAreaNativeStyles({ invalid: Boolean(error), multiline: true, className })}
        {...props}
      />
    </Field>
  );
}
