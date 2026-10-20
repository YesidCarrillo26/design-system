import { Pressable, Text, View } from 'react-native';
import { Icon } from '../Icon';
import type { ToastProviderBaseProps } from './Toast.types';
import { ToastContext } from './ToastContext';
import { toastCloseTone, toastIcon, toastStyles } from './toast.variants';
import { useToastQueue } from './useToastQueue';

export type ToastProviderProps = ToastProviderBaseProps;

/** Provee `useToast()` y muestra los avisos sobre el contenido, abajo. */
export function ToastProvider({ children }: ToastProviderProps) {
  const { toasts, show, dismiss } = useToastQueue();
  return (
    <ToastContext.Provider value={{ show, dismiss }}>
      {children}
      <View pointerEvents="box-none" className="absolute inset-x-4 bottom-8 gap-2">
        {toasts.map((toast) => {
          const s = toastStyles({ variant: toast.variant });
          const icon = toastIcon[toast.variant];
          return (
            <View key={toast.id} className={s.item()}>
              {icon && <Icon name={icon.name} size="md" tone={icon.tone} />}
              {/* El rol va en el texto (no en el contenedor) para que el botón de cerrar siga siendo alcanzable. */}
              <View className={s.content()}>
                {toast.title && <Text className={s.title()}>{toast.title}</Text>}
                <Text role={toast.variant === 'destructive' ? 'alert' : undefined} accessibilityLiveRegion="polite" className={s.message()}>{toast.message}</Text>
              </View>
              {toast.action && (
                <Pressable
                  role="button"
                  onPress={() => {
                    toast.action?.onPress();
                    dismiss(toast.id);
                  }}
                  className="justify-center active:opacity-pressed"
                >
                  <Text className={s.action()}>{toast.action.label}</Text>
                </Pressable>
              )}
              <Pressable role="button" aria-label="Cerrar aviso" onPress={() => dismiss(toast.id)} className="size-8 items-center justify-center rounded-md active:opacity-pressed">
                <Icon name="x" size="sm" tone={toastCloseTone[toast.variant]} />
              </Pressable>
            </View>
          );
        })}
      </View>
    </ToastContext.Provider>
  );
}
