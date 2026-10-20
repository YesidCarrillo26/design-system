import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { useControllableState } from '../../lib/useControllableState';
import { Field } from '../Field';
import type { OtpInputBaseProps } from './OtpInput.types';
import { otpInputStyles, sanitizeOtp } from './otpInput.variants';

export type OtpInputProps = OtpInputBaseProps;

/**
 * Código de un solo uso. Un único `TextInput` invisible recibe todo lo que se escribe, se pega o autocompleta
 * (`oneTimeCode` en iOS, `sms-otp` en Android); las casillas son solo dibujo. Es mejor que un input por casilla:
 * el autocompletado del SMS y pegar funcionan con un solo campo.
 */
export function OtpInput({ label, length = 6, value, defaultValue = '', onValueChange, onComplete, inputMode = 'numeric', description, error, mask = false, disabled = false, className }: OtpInputProps) {
  const [current, setCurrent] = useControllableState({ value, defaultValue: sanitizeOtp(defaultValue, inputMode, length), onChange: onValueChange });
  const [focused, setFocused] = useState(false);
  const s = otpInputStyles();
  const activeIndex = Math.min(current.length, length - 1);

  const handleChange = (text: string) => {
    const next = sanitizeOtp(text, inputMode, length);
    if (next === current) return;
    setCurrent(next);
    if (next.length === length) onComplete?.(next);
  };

  return (
    <Field label={label} description={description} error={error}>
      <View className={s.root({ className: `relative ${className ?? ''}` })}>
        {Array.from({ length }, (_, index) => {
          const box = otpInputStyles({ invalid: Boolean(error), active: focused && index === activeIndex, disabled });
          const char = current[index];
          return (
            <View key={index} aria-hidden importantForAccessibility="no-hide-descendants" className={box.box()}>
              <Text className={box.char()}>{char ? (mask ? '•' : char) : ''}</Text>
            </View>
          );
        })}
        <TextInput
          accessibilityLabel={label}
          aria-invalid={error ? true : undefined}
          value={current}
          onChangeText={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          editable={!disabled}
          maxLength={length}
          keyboardType={inputMode === 'numeric' ? 'number-pad' : 'default'}
          autoCapitalize={inputMode === 'alphanumeric' ? 'characters' : 'none'}
          autoCorrect={false}
          textContentType="oneTimeCode"
          autoComplete="sms-otp"
          caretHidden
          secureTextEntry={mask}
          // Cubre las casillas pero no se ve: el toque en cualquiera enfoca el campo.
          className="absolute inset-0 opacity-0"
        />
      </View>
    </Field>
  );
}
