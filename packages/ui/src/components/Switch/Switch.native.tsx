import { Pressable, Text, View } from 'react-native';
import { tv } from '../../lib/tv';
import { useControllableState } from '../../lib/useControllableState';
import type { SwitchBaseProps } from './Switch.types';
import { switchStyles } from './switch.variants';

const switchNativeStyles = tv({ extend: switchStyles, slots: { root: 'active:opacity-80' } });

export type SwitchProps = SwitchBaseProps;

/** Interruptor accesible (`role="switch"`). */
export function Switch({ label, checked, defaultChecked = false, onCheckedChange, disabled = false, className }: SwitchProps) {
  const [value, setValue] = useControllableState({ value: checked, defaultValue: defaultChecked, onChange: onCheckedChange });
  const s = switchNativeStyles({ checked: value, disabled });
  return (
    <Pressable role="switch" aria-checked={value} aria-label={label} disabled={disabled} onPress={() => setValue(!value)} className={s.root({ className })}>
      <View className={s.track()}>
        <View className={s.thumb()} />
      </View>
      <Text className={s.label()}>{label}</Text>
    </Pressable>
  );
}
