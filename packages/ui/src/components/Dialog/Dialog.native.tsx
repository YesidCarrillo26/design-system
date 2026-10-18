import { Pressable, Text, View } from 'react-native';
import { Modal } from '../../lib/Modal.native';
import { tv } from '../../lib/tv';
import { Icon } from '../Icon';
import type { DialogBaseProps } from './Dialog.types';
import { dialogStyles } from './dialog.variants';

const dialogNativeStyles = tv({ extend: dialogStyles, slots: { popup: 'relative' } });

export type DialogProps = DialogBaseProps;

/** Ventana modal accesible. */
export function Dialog({ open, onOpenChange, title, description, children }: DialogProps) {
  const s = dialogNativeStyles();
  return (
    <Modal transparent animationType="fade" visible={open} onRequestClose={() => onOpenChange(false)}>
      <Pressable className={`flex-1 items-center justify-center p-4 ${s.backdrop()}`} onPress={() => onOpenChange(false)} aria-label="Cerrar" accessible={false}>
        {/* Un View intermedio evita que tocar el contenido cierre el diálogo. */}
        <Pressable accessibilityViewIsModal aria-modal role="dialog" aria-label={title} className={s.popup()}>
          <Text role="heading" className={s.title()}>{title}</Text>
          {description ? <Text className={s.description()}>{description}</Text> : null}
          <View>{children}</View>
          <Pressable role="button" aria-label="Cerrar" onPress={() => onOpenChange(false)} className={`${s.close()} active:bg-muted`}>
            <Icon name="x" />
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
