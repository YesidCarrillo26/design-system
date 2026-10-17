'use client';

import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { tv } from '../../lib/tv';
import { Icon } from '../Icon';
import type { DialogBaseProps } from './Dialog.types';
import { dialogStyles } from './dialog.variants';

const dialogWebStyles = tv({
  extend: dialogStyles,
  slots: {
    backdrop: 'fixed inset-0',
    popup: 'relative flex flex-col outline-none',
    close: [
      'inline-flex cursor-pointer hover:bg-muted',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    ],
  },
});

export type DialogProps = DialogBaseProps;

/** Ventana modal accesible: atrapa el foco, se cierra con Escape y devuelve el foco al cerrar. */
export function Dialog({ open, onOpenChange, title, description, children }: DialogProps) {
  const s = dialogWebStyles();
  return (
    <BaseDialog.Root open={open} onOpenChange={(next) => onOpenChange(next)}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className={s.backdrop()} />
        <BaseDialog.Viewport className="fixed inset-0 flex items-center justify-center p-4">
          <BaseDialog.Popup className={s.popup()}>
            <BaseDialog.Title className={s.title()}>{title}</BaseDialog.Title>
            {description ? <BaseDialog.Description className={s.description()}>{description}</BaseDialog.Description> : null}
            {children}
            <BaseDialog.Close aria-label="Cerrar" className={s.close()}>
              <Icon name="x" />
            </BaseDialog.Close>
          </BaseDialog.Popup>
        </BaseDialog.Viewport>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
