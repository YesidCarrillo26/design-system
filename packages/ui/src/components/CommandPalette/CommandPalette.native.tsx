import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, SectionList, Text, TextInput, useWindowDimensions, View } from 'react-native';
import { Modal } from '../../lib/Modal.native';
import { useTokenColor } from '../../lib/useTokenColor.native';
import { Icon } from '../Icon';
import type { CommandPaletteBaseProps } from './CommandPalette.types';
import { commandPaletteStyles, filterGroups } from './commandPalette.variants';

export type CommandPaletteProps = CommandPaletteBaseProps;

/**
 * En native la paleta es una hoja alta con búsqueda y la lista agrupada. No muestra los atajos ni el pie de teclas:
 * en un teléfono no hay teclado físico (los atajos de `shortcut` solo aplican a web).
 */
export function CommandPalette({ open, onOpenChange, groups, label = 'Paleta de comandos', placeholder = 'Escribe un comando o busca…', emptyText = 'Sin resultados' }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const { height } = useWindowDimensions();
  const placeholderColor = useTokenColor('muted-foreground');
  const s = commandPaletteStyles();
  const sections = filterGroups(groups, query).map((group) => ({ title: group.label, data: group.items }));

  const close = () => {
    onOpenChange(false);
    setQuery('');
  };

  return (
    <Modal visible={open} onRequestClose={close} placement="bottom">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {/* Pressable (accesible por defecto) como contenedor, igual que Dialog y Sheet. */}
        <Pressable role="dialog" aria-label={label} accessibilityViewIsModal aria-modal className="rounded-t-lg bg-popover" style={{ height: height * 0.8 }}>
          <View className={s.inputRow()}>
            <Icon name="search" size="md" tone="muted" />
            <TextInput
              accessibilityLabel={placeholder}
              value={query}
              onChangeText={setQuery}
              placeholder={placeholder}
              placeholderTextColor={placeholderColor}
              autoFocus
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="search"
              className={s.input()}
            />
          </View>
          {sections.length === 0 ? (
            <Text className={s.empty()}>{emptyText}</Text>
          ) : (
            <SectionList
              sections={sections}
              keyExtractor={(item) => item.id}
              keyboardShouldPersistTaps="handled"
              stickySectionHeadersEnabled={false}
              renderSectionHeader={({ section }) => <Text role="heading" className={s.groupLabel()}>{section.title}</Text>}
              renderItem={({ item }) => (
                <Pressable
                  role="button"
                  aria-label={item.label}
                  onPress={() => {
                    item.onSelect();
                    close();
                  }}
                  className={`${s.item()} active:bg-accent`}
                >
                  {item.icon ? <Icon name={item.icon} size="md" tone="muted" /> : null}
                  <View className={s.itemBody()}>
                    <Text className={s.itemLabel()}>{item.label}</Text>
                    {item.description ? <Text className={s.itemDescription()}>{item.description}</Text> : null}
                  </View>
                </Pressable>
              )}
            />
          )}
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}
