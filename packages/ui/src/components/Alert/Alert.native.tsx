import { Pressable, Text, View, type ViewProps } from 'react-native';
import { Icon } from '../Icon';
import type { AlertBaseProps } from './Alert.types';
import { alertIcon, alertIconTone, alertLiveRole, alertStyles } from './alert.variants';

export type AlertProps = AlertBaseProps & Omit<ViewProps, keyof AlertBaseProps>;

/** Mensaje de estado dentro de la pantalla. Con `live` se anuncia al aparecer. */
export function Alert({ tone = 'info', title, icon, action, onDismiss, dismissLabel = 'Cerrar', layout, live = false, className, children, ...props }: AlertProps) {
  const s = alertStyles({ tone, layout });
  const iconName = icon === undefined ? alertIcon[tone]?.name : icon;
  return (
    <View className={s.root({ className })} {...props}>
      {iconName && <Icon name={iconName} size="md" tone={alertIconTone[tone]} />}
      <View className={s.content()}>
        {title && <Text className={s.title()}>{title}</Text>}
        {/* El rol va en el texto y no en el contenedor, para que el botón de cerrar siga siendo alcanzable. */}
        {typeof children === 'string' || typeof children === 'number' ? (
          <Text role={live ? alertLiveRole(tone) : undefined} accessibilityLiveRegion={live ? 'polite' : undefined} className={s.message()}>
            {children}
          </Text>
        ) : (
          children
        )}
      </View>
      {action}
      {onDismiss && (
        <Pressable role="button" aria-label={dismissLabel} onPress={onDismiss} className="size-6 items-center justify-center rounded-md active:opacity-pressed">
          <Icon name="x" size="sm" tone={alertIconTone[tone]} />
        </Pressable>
      )}
    </View>
  );
}
