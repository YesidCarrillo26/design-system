import { Pressable, Text, View } from 'react-native';
import { tv } from '../../lib/tv';
import { useControllableState } from '../../lib/useControllableState';
import { Icon } from '../Icon';
import type { CheckboxBaseProps } from './Checkbox.types';
import { checkboxStyles } from './checkbox.variants';

const checkboxNativeStyles = tv({ extend: checkboxStyles, slots: { root: 'active:opacity-pressed' } });

export type CheckboxProps = CheckboxBaseProps;

/** Casilla de verificación. */
export function Checkbox({ label, checked, defaultChecked = false, onCheckedChange, indeterminate = false, hideLabel = false, disabled = false, className }: CheckboxProps) {
  const [value, setValue] = useControllableState({ value: checked, defaultValue: defaultChecked, onChange: onCheckedChange });
  const s = checkboxNativeStyles({ checked: value || indeterminate, disabled });
  return (
    <Pressable
      role="checkbox"
      aria-checked={indeterminate ? 'mixed' : value}
      aria-label={label}
      disabled={disabled}
      onPress={() => setValue(!value)}
      className={s.root({ className })}
    >
      <View className={s.box()}>{indeterminate ? <Icon name="minus" size="sm" tone="on-primary" /> : value ? <Icon name="check" size="sm" tone="on-primary" /> : null}</View>
      {hideLabel ? null : <Text className={s.label()}>{label}</Text>}
    </Pressable>
  );
}
