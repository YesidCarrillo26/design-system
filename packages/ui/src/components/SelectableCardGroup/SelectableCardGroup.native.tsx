import { Pressable, Text, View } from 'react-native';
import { tv } from '../../lib/tv';
import { useControllableState } from '../../lib/useControllableState';
import { Icon } from '../Icon';
import type { SelectableCardGroupBaseProps } from './SelectableCardGroup.types';
import { nextSelection, selectableCardStyles } from './selectableCardGroup.variants';

const nativeStyles = tv({ extend: selectableCardStyles, slots: { card: 'active:opacity-pressed' } });

export type SelectableCardGroupProps = SelectableCardGroupBaseProps;

/** Tarjetas elegibles: `radiogroup` con `radio` en modo `single`, y `checkbox` en modo `multiple`. */
export function SelectableCardGroup({ label, selectionMode = 'single', options, value, defaultValue = [], onValueChange, maxSelected, disabled = false, className }: SelectableCardGroupProps) {
  const [current, setCurrent] = useControllableState<string[]>({ value, defaultValue, onChange: onValueChange });
  const s = nativeStyles();
  const order = options.map((option) => option.value);
  const limitReached = selectionMode === 'multiple' && maxSelected !== undefined && current.length >= maxSelected;
  return (
    <View role={selectionMode === 'single' ? 'radiogroup' : 'group'} aria-label={label} className={s.root({ className })}>
      {options.map((option) => {
        const selected = current.includes(option.value);
        const isDisabled = disabled || option.disabled || (limitReached && !selected);
        const item = nativeStyles({ selected, mode: selectionMode, disabled: isDisabled });
        return (
          <Pressable
            key={option.value}
            role={selectionMode === 'single' ? 'radio' : 'checkbox'}
            aria-checked={selected}
            aria-label={option.title}
            disabled={isDisabled}
            onPress={() => setCurrent(nextSelection(order, current, option.value, selectionMode))}
            className={item.card()}
          >
            {option.icon ? <Icon name={option.icon} size="lg" tone={selected ? 'primary' : 'muted'} /> : null}
            <View className={item.body()}>
              <Text className={item.title()}>{option.title}</Text>
              {option.description ? <Text className={item.description()}>{option.description}</Text> : null}
            </View>
            <View className={item.indicator()}>{selected ? <Icon name="check" size="sm" tone="on-primary" /> : null}</View>
          </Pressable>
        );
      })}
    </View>
  );
}
