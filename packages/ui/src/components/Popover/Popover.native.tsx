import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Modal } from '../../lib/Modal.native';
import type { PopoverBaseProps } from './Popover.types';
import { popoverStyles } from './popover.variants';

export type PopoverProps = PopoverBaseProps;

/** En native no hay anclaje flotante: el contenido se muestra en un panel centrado. */
export function Popover({ trigger, label, children }: PopoverProps) {
  const [open, setOpen] = useState(false);
  const s = popoverStyles();
  return (
    <>
      <Pressable role="button" aria-label={label} aria-expanded={open} onPress={() => setOpen(true)} className={`${s.trigger()} active:opacity-pressed`}>
        {typeof trigger === 'string' ? <Text className={s.triggerLabel()}>{trigger}</Text> : trigger}
      </Pressable>
      <Modal visible={open} onRequestClose={() => setOpen(false)} contentClassName="p-6">
        <Pressable accessibilityViewIsModal role="dialog" aria-label={label} className={`w-full max-w-xs ${s.popup()}`}>
          <View>{children}</View>
        </Pressable>
      </Modal>
    </>
  );
}
