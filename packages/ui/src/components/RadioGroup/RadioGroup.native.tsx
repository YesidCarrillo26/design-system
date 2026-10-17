import { Pressable, Text, View } from 'react-native';
import { tv } from '../../lib/tv';
import { useControllableState } from '../../lib/useControllableState';
import type { RadioGroupBaseProps } from './RadioGroup.types';
import { radioGroupStyles } from './radioGroup.variants';

const radioNativeStyles = tv({ extend: radioGroupStyles, slots: { item: 'active:opacity-80' } });

export type RadioGroupProps = RadioGroupBaseProps;

/** Grupo de opciones excluyentes. */
export function RadioGroup({ label, options, value, defaultValue = '', onValueChange, disabled = false, className }: RadioGroupProps) {
  const [current, setCurrent] = useControllableState({ value, defaultValue, onChange: onValueChange });
  const s = radioNativeStyles();
  return (
    <View role="radiogroup" aria-label={label} className={s.root({ className })}>
      <Text className={s.legend()}>{label}</Text>
      {options.map((option) => {
        const selected = current === option.value;
        const isDisabled = disabled || option.disabled;
        const item = radioNativeStyles({ selected, disabled: isDisabled });
        return (
          <Pressable
            key={option.value}
            role="radio"
            aria-checked={selected}
            aria-label={option.label}
            disabled={isDisabled}
            onPress={() => setCurrent(option.value)}
            className={item.item()}
          >
            <View className={item.circle()}>{selected ? <View className={item.dot()} /> : null}</View>
            <Text className={item.label()}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
