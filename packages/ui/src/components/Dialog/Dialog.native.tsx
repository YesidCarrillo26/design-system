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
    <Modal visible={open} onRequestClose={() => onOpenChange(false)} contentClassName="p-4">
      {/* El velo es un hermano del contenido: tocar el diálogo no lo cierra. */}
      {/* Pressable (accesible por defecto) como contenedor del diálogo, igual que antes del movimiento. */}
      <Pressable accessibilityViewIsModal aria-modal role="dialog" aria-label={title} className={s.popup()}>
        <Text role="heading" className={s.title()}>{title}</Text>
        {description ? <Text className={s.description()}>{description}</Text> : null}
        <View>{children}</View>
        <Pressable role="button" aria-label="Cerrar" onPress={() => onOpenChange(false)} className={`${s.close()} active:bg-muted`}>
          <Icon name="x" />
        </Pressable>
      </Pressable>
    </Modal>
  );
}
