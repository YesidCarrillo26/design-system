import { Pressable, Text, View } from 'react-native';
import { Modal } from '../../lib/Modal.native';
import type { SheetBaseProps } from './Sheet.types';
import { sheetStyles } from './sheet.variants';

export type SheetProps = SheetBaseProps;

/** Hoja inferior modal (un `Modal` anclado abajo; `@gorhom/bottom-sheet` queda para gestos de arrastre). */
export function Sheet({ open, onOpenChange, title, description, children }: SheetProps) {
  const s = sheetStyles();
  return (
    <Modal visible={open} onRequestClose={() => onOpenChange(false)} placement="bottom">
      <Pressable accessibilityViewIsModal aria-modal role="dialog" aria-label={title} className={s.popup()}>
        <View className={s.handle()} />
        <Text role="heading" className={s.title()}>{title}</Text>
        {description ? <Text className={s.description()}>{description}</Text> : null}
        <View>{children}</View>
      </Pressable>
    </Modal>
  );
}
