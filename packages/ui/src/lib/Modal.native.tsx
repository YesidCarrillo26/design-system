import { Modal as RNModal, type ModalProps } from 'react-native';
import { useReducedMotion } from './useReducedMotion.native';

/** `Modal` de React Native que desactiva su animación con "Reducir movimiento". */
export function Modal({ animationType, ...props }: ModalProps) {
  const reduced = useReducedMotion();
  return <RNModal animationType={reduced ? 'none' : animationType} {...props} />;
}
