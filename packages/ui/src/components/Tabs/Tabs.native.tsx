import { Pressable, Text, View } from 'react-native';
import { useControllableState } from '../../lib/useControllableState';
import type { TabsBaseProps } from './Tabs.types';
import { tabsStyles } from './tabs.variants';

export type TabsProps = TabsBaseProps;

/** Pestañas accesibles (`role="tab"`, `aria-selected`). */
export function Tabs({ items, value, defaultValue, onValueChange, variant, className }: TabsProps) {
  const [current, setCurrent] = useControllableState({ value, defaultValue: defaultValue ?? items[0]?.value ?? '', onChange: onValueChange });
  const base = tabsStyles({ variant });
  const active = items.find((item) => item.value === current);
  return (
    <View className={base.root({ className })}>
      <View role="tablist" className={base.list()}>
        {items.map((item) => {
          const s = tabsStyles({ variant, selected: item.value === current });
          return (
            <Pressable key={item.value} role="tab" aria-selected={item.value === current} aria-label={item.label} onPress={() => setCurrent(item.value)} className={`${s.tab()} active:opacity-pressed`}>
              <Text className={s.tabLabel()}>{item.label}</Text>
            </Pressable>
          );
        })}
      </View>
      <View role="tabpanel" className={base.panel()}>{active?.content}</View>
    </View>
  );
}
