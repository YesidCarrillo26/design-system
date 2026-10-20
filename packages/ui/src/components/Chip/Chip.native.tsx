import { Pressable, Text, View } from 'react-native';
import { tv } from '../../lib/tv';
import { useControllableState } from '../../lib/useControllableState';
import { Icon } from '../Icon';
import type { ChipBaseProps } from './Chip.types';
import { chipIconTone, chipStyles } from './chip.variants';

const chipNativeStyles = tv({ extend: chipStyles, slots: { main: 'active:opacity-pressed', remove: 'active:opacity-pressed' } });

export type ChipProps = ChipBaseProps;

/** Chip. Con `selected`, `defaultSelected` u `onSelectedChange` es un botón de alternancia; si no, una etiqueta. */
export function Chip({ label, selected, defaultSelected, onSelectedChange, onRemove, removeLabel, icon, disabled = false, className }: ChipProps) {
  const toggleable = selected !== undefined || defaultSelected !== undefined || onSelectedChange !== undefined;
  const [current, setCurrent] = useControllableState({ value: selected, defaultValue: defaultSelected ?? false, onChange: onSelectedChange });
  const s = chipNativeStyles({ selected: toggleable && current, disabled });
  const content = (
    <>
      {icon && <Icon name={icon} size="sm" tone={chipIconTone(toggleable && current)} />}
      <Text className={s.label()}>{label}</Text>
    </>
  );
  return (
    <View className={s.root({ className })}>
      {toggleable ? (
        <Pressable role="button" aria-label={label} aria-pressed={current} aria-selected={current} disabled={disabled} onPress={() => setCurrent(!current)} className={s.main()}>
          {content}
        </Pressable>
      ) : (
        <View className={s.main()}>{content}</View>
      )}
      {onRemove && (
        <Pressable role="button" aria-label={removeLabel ?? `Quitar ${label}`} disabled={disabled} onPress={onRemove} className={s.remove()}>
          <Icon name="x" size="sm" tone="muted" />
        </Pressable>
      )}
    </View>
  );
}
