import { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import type { PopoverBaseProps } from './Popover.types';
import { popoverStyles } from './popover.variants';

export type PopoverProps = PopoverBaseProps;

/** En native no hay anclaje flotante: el contenido se muestra en un panel centrado. */
export function Popover({ trigger, label, children }: PopoverProps) {
  const [open, setOpen] = useState(false);
  const s = popoverStyles();
  return (
    <>
      <Pressable role="button" aria-label={label} aria-expanded={open} onPress={() => setOpen(true)} className={`${s.trigger()} active:opacity-80`}>
        {typeof trigger === 'string' ? <Text className={s.triggerLabel()}>{trigger}</Text> : trigger}
      </Pressable>
      <Modal transparent animationType="fade" visible={open} onRequestClose={() => setOpen(false)}>
        <Pressable className="flex-1 items-center justify-center bg-foreground/40 p-6" onPress={() => setOpen(false)} aria-label="Cerrar" accessible={false}>
          <Pressable accessibilityViewIsModal role="dialog" aria-label={label} className={`w-full max-w-xs ${s.popup()}`}>
            <View>{children}</View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
