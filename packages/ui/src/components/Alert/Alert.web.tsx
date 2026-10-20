import type { ComponentPropsWithRef } from 'react';
import { tv } from '../../lib/tv';
import { Icon } from '../Icon';
import type { AlertBaseProps } from './Alert.types';
import { alertIcon, alertIconTone, alertLiveRole, alertStyles } from './alert.variants';

const alertWebStyles = tv({ extend: alertStyles, slots: { root: 'flex' } });

export type AlertProps = AlertBaseProps & Omit<ComponentPropsWithRef<'div'>, keyof AlertBaseProps | 'title'>;

/** Mensaje de estado dentro de la página. Con `live` se anuncia al aparecer. */
export function Alert({ tone = 'info', title, icon, action, onDismiss, dismissLabel = 'Cerrar', layout, live = false, className, children, ...props }: AlertProps) {
  const s = alertWebStyles({ tone, layout });
  const iconName = icon === undefined ? alertIcon[tone]?.name : icon;
  return (
    <div role={live ? alertLiveRole(tone) : undefined} className={s.root({ className })} {...props}>
      {iconName && <Icon name={iconName} size="md" tone={alertIconTone[tone]} />}
      <div className={s.content()}>
        {title && <p className={s.title()}>{title}</p>}
        {children && <div className={s.message()}>{children}</div>}
      </div>
      {action}
      {onDismiss && (
        <button
          type="button"
          aria-label={dismissLabel}
          onClick={onDismiss}
          className="inline-flex size-6 cursor-pointer items-center justify-center rounded-md hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Icon name="x" size="sm" tone={alertIconTone[tone]} />
        </button>
      )}
    </div>
  );
}
