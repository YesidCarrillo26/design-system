import { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from 'react-native';
import { filterOptions } from '../../lib/filterOptions';
import { Modal } from '../../lib/Modal.native';
import { useControllableState } from '../../lib/useControllableState';
import { useTokenColor } from '../../lib/useTokenColor.native';
import { Field } from '../Field';
import { Icon } from '../Icon';
import type { ComboboxBaseProps } from './Combobox.types';
import { comboboxStyles } from './combobox.variants';

export type ComboboxProps = ComboboxBaseProps;

/** En native el selector con búsqueda se muestra como una hoja inferior con el campo de búsqueda arriba. */
export function Combobox({ label, options, value, defaultValue = '', placeholder, description, error, required, disabled, onValueChange, searchPlaceholder, emptyText, className }: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [current, setCurrent] = useControllableState({ value, defaultValue, onChange: onValueChange });
  const placeholderColor = useTokenColor('muted-foreground');
  const selected = options.find((option) => option.value === current);
  const visible = filterOptions(options, query);
  const s = comboboxStyles({ invalid: Boolean(error), empty: !selected });

  const close = () => {
    setOpen(false);
    setQuery('');
  };

  return (
    <Field label={label} description={description} error={error} required={required}>
      <Pressable
        role="combobox"
        aria-label={label}
        aria-expanded={open}
        disabled={disabled}
        onPress={() => setOpen(true)}
        className={s.trigger({ className: `active:opacity-pressed ${className ?? ''}` })}
      >
        <Text className={s.value()}>{selected?.label ?? placeholder ?? 'Selecciona…'}</Text>
        <Icon name="chevrons-up-down" size="sm" tone="muted" />
      </Pressable>
      <Modal visible={open} onRequestClose={close} placement="bottom">
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View role="radiogroup" aria-label={label} className="rounded-t-lg bg-popover pb-6 pt-3">
            <View className="px-4 pb-2">
              <TextInput
                accessibilityLabel={`Buscar en ${label}`}
                value={query}
                onChangeText={setQuery}
                placeholder={searchPlaceholder ?? 'Buscar…'}
                placeholderTextColor={placeholderColor}
                autoCorrect={false}
                autoCapitalize="none"
                className={s.search()}
              />
            </View>
            {visible.length === 0 ? (
              <Text className={s.empty()}>{emptyText ?? 'Sin resultados'}</Text>
            ) : (
              <FlatList
                className="max-h-72"
                data={visible}
                keyExtractor={(option) => option.value}
                keyboardShouldPersistTaps="handled"
                renderItem={({ item: option }) => (
                  <Pressable
                    role="radio"
                    aria-checked={option.value === current}
                    aria-label={option.label}
                    disabled={option.disabled}
                    onPress={() => {
                      setCurrent(option.value);
                      close();
                    }}
                    className={`${s.option()} active:bg-muted ${option.disabled ? 'opacity-disabled' : ''}`}
                  >
                    <Text className={s.optionLabel()}>{option.label}</Text>
                    {option.value === current ? <Icon name="check" size="sm" tone="primary" /> : null}
                  </Pressable>
                )}
              />
            )}
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </Field>
  );
}
