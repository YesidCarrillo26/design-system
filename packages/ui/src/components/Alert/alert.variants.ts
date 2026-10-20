import { tv } from '../../lib/tv';
import type { IconTone } from '../Icon/Icon.types';
import type { IconName } from '../Icon/icons';
import type { AlertTone } from './Alert.types';

export const alertStyles = tv({
  slots: {
    root: 'flex-row items-start gap-3 border p-3',
    content: 'flex-1 gap-0.5',
    title: 'text-body-sm font-semibold',
    message: 'text-body-sm',
  },
  variants: {
    tone: {
      neutral: { root: 'border-border bg-card', title: 'text-foreground', message: 'text-muted-foreground' },
      info: { root: 'border-info-subtle-foreground/20 bg-info-subtle', title: 'text-info-subtle-foreground', message: 'text-info-subtle-foreground' },
      success: { root: 'border-success-subtle-foreground/20 bg-success-subtle', title: 'text-success-subtle-foreground', message: 'text-success-subtle-foreground' },
      warning: { root: 'border-warning-subtle-foreground/20 bg-warning-subtle', title: 'text-warning-subtle-foreground', message: 'text-warning-subtle-foreground' },
      destructive: { root: 'border-destructive-subtle-foreground/20 bg-destructive-subtle', title: 'text-destructive-subtle-foreground', message: 'text-destructive-subtle-foreground' },
    },
    layout: {
      inline: { root: 'rounded-lg' },
      banner: { root: 'rounded-none border-x-0' },
    },
  },
  defaultVariants: { tone: 'info', layout: 'inline' },
});

export const alertIcon: Record<AlertTone, { name: IconName; tone: IconTone } | null> = {
  neutral: null,
  info: { name: 'info', tone: 'info' },
  success: { name: 'circle-check', tone: 'success' },
  warning: { name: 'alert', tone: 'warning' },
  destructive: { name: 'circle-alert', tone: 'destructive' },
};

/** El tono del ícono sigue al del texto; en `neutral` el ícono es el atenuado. */
export const alertIconTone: Record<AlertTone, IconTone> = {
  neutral: 'muted',
  info: 'info',
  success: 'success',
  warning: 'warning',
  destructive: 'destructive',
};

/** `alert` interrumpe al lector de pantalla: solo para error y advertencia. */
export const alertLiveRole = (tone: AlertTone) => (tone === 'destructive' || tone === 'warning' ? 'alert' : 'status');
