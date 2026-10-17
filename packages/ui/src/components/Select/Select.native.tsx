import { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { useControllableState } from '../../lib/useControllableState';
import { Field } from '../Field';
import { Icon } from '../Icon';
import type { SelectBaseProps } from './Select.types';
import { selectStyles } from './select.variants';

export type SelectProps = SelectBaseProps;

/** Lista desplegable: el control abre una hoja con las opciones. */
export function Select({ label, options, value, defaultValue = '', placeholder, description, error, required, disabled, onValueChange, className }: SelectProps) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useControllableState({ value, defaultValue, onChange: onValueChange });
  const selected = options.find((option) => option.value === current);
  const s = selectStyles({ invalid: Boolean(error), empty: !selected });
  return (
    <Field label={label} description={description} error={error} required={required}>
      <Pressable
        role="combobox"
        aria-label={label}
        aria-expanded={open}
        disabled={disabled}
        onPress={() => setOpen(true)}
        className={s.trigger({ className: `active:opacity-80 ${className ?? ''}` })}
      >
        <Text className={s.value()}>{selected?.label ?? placeholder ?? 'Selecciona…'}</Text>
        <Icon name="chevron-right" size="sm" tone="muted" />
      </Pressable>
      <Modal transparent animationType="fade" visible={open} onRequestClose={() => setOpen(false)}>
        <Pressable className="flex-1 justify-end bg-black/40" onPress={() => setOpen(false)} aria-label="Cerrar">
          <View role="radiogroup" aria-label={label} className="rounded-t-lg bg-background pb-6 pt-2">
            {options.map((option) => (
              <Pressable
                key={option.value}
                role="radio"
                aria-checked={option.value === current}
                aria-label={option.label}
                disabled={option.disabled}
                onPress={() => {
                  setCurrent(option.value);
                  setOpen(false);
                }}
                className={`${s.option()} active:bg-muted ${option.disabled ? 'opacity-50' : ''}`}
              >
                <Text className={s.optionLabel()}>{option.label}</Text>
                {option.value === current ? <Icon name="check" size="sm" tone="primary" /> : null}
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </Field>
  );
}
