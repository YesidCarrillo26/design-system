import type { IconName } from '../Icon/icons';
import type { IconTone } from '../Icon/Icon.types';
import { tv } from '../../lib/tv';
import type { ToastVariant } from './Toast.types';

export const toastStyles = tv({
  slots: {
    item: 'flex-row items-start gap-3 rounded-lg border px-4 py-3 shadow-md',
    content: 'flex-1 gap-0.5',
    title: 'text-body-sm font-semibold',
    message: 'text-body-sm',
    action: 'text-body-sm font-semibold underline',
  },
  variants: {
    variant: {
      default: { item: 'border-border bg-card', title: 'text-foreground', message: 'text-foreground', action: 'text-primary' },
      success: {
        item: 'border-success-subtle-foreground/20 bg-success-subtle',
        title: 'text-success-subtle-foreground',
        message: 'text-success-subtle-foreground',
        action: 'text-success-subtle-foreground',
      },
      warning: {
        item: 'border-warning-subtle-foreground/20 bg-warning-subtle',
        title: 'text-warning-subtle-foreground',
        message: 'text-warning-subtle-foreground',
        action: 'text-warning-subtle-foreground',
      },
      info: {
        item: 'border-info-subtle-foreground/20 bg-info-subtle',
        title: 'text-info-subtle-foreground',
        message: 'text-info-subtle-foreground',
        action: 'text-info-subtle-foreground',
      },
      destructive: {
        item: 'border-transparent bg-destructive',
        title: 'text-destructive-foreground',
        message: 'text-destructive-foreground',
        action: 'text-destructive-foreground',
      },
    },
  },
  defaultVariants: { variant: 'default' },
});

/** Icono de estado de cada variante (el aviso `default` no lleva). */
export const toastIcon: Record<ToastVariant, { name: IconName; tone: IconTone } | null> = {
  default: null,
  success: { name: 'circle-check', tone: 'success' },
  warning: { name: 'alert', tone: 'warning' },
  info: { name: 'info', tone: 'info' },
  destructive: { name: 'circle-alert', tone: 'on-destructive' },
};

/** Tono del icono de cerrar según el fondo del aviso. */
export const toastCloseTone: Record<ToastVariant, IconTone> = {
  default: 'default',
  success: 'success',
  warning: 'warning',
  info: 'info',
  destructive: 'on-destructive',
};
