import { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import type { MenuBaseProps } from './Menu.types';
import { menuStyles } from './menu.variants';

export type MenuProps = MenuBaseProps;

/** En native el menú se muestra como una hoja de acciones inferior. */
export function Menu({ trigger, label, items }: MenuProps) {
  const [open, setOpen] = useState(false);
  const base = menuStyles();
  return (
    <>
      <Pressable role="button" aria-label={label} aria-haspopup="menu" aria-expanded={open} onPress={() => setOpen(true)} className={`${base.trigger()} active:opacity-80`}>
        {typeof trigger === 'string' ? <Text className={base.triggerLabel()}>{trigger}</Text> : trigger}
      </Pressable>
      <Modal transparent animationType="slide" visible={open} onRequestClose={() => setOpen(false)}>
        <Pressable className="flex-1 justify-end bg-foreground/40" onPress={() => setOpen(false)} aria-label="Cerrar" accessible={false}>
          <View role="menu" aria-label={label} className="rounded-t-lg bg-background pb-6 pt-2">
            {items.map((item) => {
              const s = menuStyles({ destructive: item.destructive, disabled: item.disabled });
              return (
                <Pressable
                  key={item.label}
                  role="menuitem"
                  aria-label={item.label}
                  disabled={item.disabled}
                  onPress={() => {
                    setOpen(false);
                    item.onSelect();
                  }}
                  className={`${s.item()} active:bg-muted`}
                >
                  <Text className={s.itemLabel()}>{item.label}</Text>
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
