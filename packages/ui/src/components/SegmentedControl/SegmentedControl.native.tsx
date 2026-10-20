import { Pressable, Text, View } from 'react-native';
import { tv } from '../../lib/tv';
import { useControllableState } from '../../lib/useControllableState';
import type { SegmentedControlBaseProps } from './SegmentedControl.types';
import { segmentedControlStyles } from './segmentedControl.variants';

const nativeStyles = tv({ extend: segmentedControlStyles, slots: { segment: 'active:opacity-pressed' } });

export type SegmentedControlProps = SegmentedControlBaseProps;

/** Control segmentado accesible (`radiogroup` con `radio` por segmento). */
export function SegmentedControl({ label, options, value, defaultValue, onValueChange, size, disabled = false, className }: SegmentedControlProps) {
  const [current, setCurrent] = useControllableState({ value, defaultValue: defaultValue ?? options[0]?.value ?? '', onChange: onValueChange });
  const s = nativeStyles({ size });
  return (
    <View role="radiogroup" aria-label={label} className={s.root({ className })}>
      {options.map((option) => {
        const selected = current === option.value;
        const isDisabled = disabled || option.disabled;
        const item = nativeStyles({ size, selected, disabled: isDisabled });
        return (
          <Pressable
            key={option.value}
            role="radio"
            aria-checked={selected}
            aria-label={option.label}
            disabled={isDisabled}
            onPress={() => setCurrent(option.value)}
            className={item.segment()}
          >
            <Text className={item.label()}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
