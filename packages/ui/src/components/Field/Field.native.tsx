import { Text, View } from 'react-native';
import type { FieldBaseProps } from './Field.types';
import { fieldStyles } from './field.variants';

export type FieldProps = FieldBaseProps;

/** Etiqueta, ayuda y error alrededor de un control. */
export function Field({ label, description, error, required, className, children }: FieldProps) {
  const s = fieldStyles();
  return (
    <View className={s.root({ className })}>
      <Text className={s.label()}>
        {label}
        {required ? ' *' : ''}
      </Text>
      {children}
      {description ? <Text className={s.description()}>{description}</Text> : null}
      {error ? <Text role="alert" accessibilityLiveRegion="polite" className={s.error()}>{error}</Text> : null}
    </View>
  );
}
