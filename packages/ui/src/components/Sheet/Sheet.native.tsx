import { Modal, Pressable, Text, View } from 'react-native';
import type { SheetBaseProps } from './Sheet.types';
import { sheetStyles } from './sheet.variants';

export type SheetProps = SheetBaseProps;

/** Hoja inferior modal (un `Modal` anclado abajo; `@gorhom/bottom-sheet` queda para gestos de arrastre). */
export function Sheet({ open, onOpenChange, title, description, children }: SheetProps) {
  const s = sheetStyles();
  return (
    <Modal transparent animationType="slide" visible={open} onRequestClose={() => onOpenChange(false)}>
      <Pressable className={`flex-1 justify-end ${s.backdrop()}`} onPress={() => onOpenChange(false)} aria-label="Cerrar" accessible={false}>
        <Pressable accessibilityViewIsModal aria-modal role="dialog" aria-label={title} className={s.popup()}>
          <View className={s.handle()} />
          <Text role="heading" className={s.title()}>{title}</Text>
          {description ? <Text className={s.description()}>{description}</Text> : null}
          <View>{children}</View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
