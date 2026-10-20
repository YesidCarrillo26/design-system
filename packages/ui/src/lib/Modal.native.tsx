import { duration, easing } from '@chroma-yesid/tokens';
import { type ReactNode, useEffect, useState } from 'react';
import { Animated, Dimensions, Easing, Modal as RNModal, Platform, Pressable, StyleSheet, View } from 'react-native';
import { useReducedMotion } from './useReducedMotion.native';

const useNativeDriver = Platform.OS !== 'web';

/**
 * Progreso 0 → 1 de un overlay. Mantiene `mounted` hasta que termina la animación de salida,
 * para que el contenido no desaparezca de golpe. Con "Reducir movimiento" salta al valor final.
 * Duraciones y curvas salen de los tokens (`duration`, `easing`).
 */
function useOverlayTransition(visible: boolean) {
  const reduced = useReducedMotion();
  const [progress] = useState(() => new Animated.Value(0));
  const [mounted, setMounted] = useState(visible);
  // Al abrir se monta en el mismo render; desmontar espera a que termine la salida (ver abajo).
  if (visible && !mounted) setMounted(true);

  useEffect(() => {
    // Con "Reducir movimiento" la duración es 0: salta al valor final y desmonta en el siguiente cuadro.
    const ms = (token: number) => (reduced ? 0 : token);
    Animated.timing(progress, {
      toValue: visible ? 1 : 0,
      duration: visible ? ms(duration.base) : ms(duration.fast),
      easing: Easing.bezier(...(visible ? easing.out : easing.in)),
      useNativeDriver,
    }).start(({ finished }) => {
      if (finished && !visible) setMounted(false);
    });
  }, [visible, reduced, progress]);

  return { mounted: visible || mounted, progress };
}

export interface ModalProps {
  /** Si el overlay está abierto. La salida se anima antes de desmontar el contenido. */
  visible: boolean;
  /** Toque en el velo o botón atrás de Android. */
  onRequestClose: () => void;
  /**
   * Dónde se coloca el contenido: `center` (aparece con fundido y escala) o `bottom` (sube desde abajo).
   * @default 'center'
   */
  placement?: 'center' | 'bottom';
  /** Clases del contenedor del contenido (p. ej. relleno alrededor de un diálogo). */
  contentClassName?: string;
  children?: ReactNode;
}

/**
 * Overlay modal con velo (`bg-overlay`) y animación de entrada y salida. El velo se funde y el
 * contenido se mueve por separado, algo que `animationType` de React Native no permite
 * (`slide` arrastra el velo junto con el panel).
 */
export function Modal({ visible, onRequestClose, placement = 'center', contentClassName, children }: ModalProps) {
  const { mounted, progress } = useOverlayTransition(visible);
  // `Animated.View` no acepta `className` con Uniwind: el estilo animado va en `style`.
  const popupStyle =
    placement === 'center'
      ? { opacity: progress, transform: [{ scale: progress.interpolate({ inputRange: [0, 1], outputRange: [0.96, 1] }) }] }
      : { transform: [{ translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [Dimensions.get('window').height, 0] }) }] };

  return (
    <RNModal transparent animationType="none" visible={mounted} onRequestClose={onRequestClose} statusBarTranslucent>
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: progress }]}>
        <Pressable className="flex-1 bg-overlay" onPress={onRequestClose} aria-label="Cerrar" accessible={false} />
      </Animated.View>
      <View pointerEvents="box-none" className={`flex-1 ${placement === 'center' ? 'items-center justify-center' : 'justify-end'} ${contentClassName ?? ''}`}>
        <Animated.View style={[{ alignSelf: 'stretch', alignItems: placement === 'center' ? 'center' : 'stretch' }, popupStyle]}>{children}</Animated.View>
      </View>
    </RNModal>
  );
}
