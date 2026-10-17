'use client';

import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { tv } from '../../lib/tv';
import type { SheetBaseProps } from './Sheet.types';
import { sheetStyles } from './sheet.variants';

const sheetWebStyles = tv({ extend: sheetStyles, slots: { backdrop: 'fixed inset-0', popup: 'flex flex-col outline-none' } });

export type SheetProps = SheetBaseProps;

/** Hoja inferior modal. En web es un diálogo anclado abajo (mismo manejo de foco y Escape). */
export function Sheet({ open, onOpenChange, title, description, children }: SheetProps) {
  const s = sheetWebStyles();
  return (
    <BaseDialog.Root open={open} onOpenChange={(next) => onOpenChange(next)}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className={s.backdrop()} />
        <BaseDialog.Viewport className="fixed inset-0 flex items-end justify-center">
          <BaseDialog.Popup className={s.popup()}>
            <span aria-hidden className={s.handle()} />
            <BaseDialog.Title className={s.title()}>{title}</BaseDialog.Title>
            {description ? <BaseDialog.Description className={s.description()}>{description}</BaseDialog.Description> : null}
            {children}
          </BaseDialog.Popup>
        </BaseDialog.Viewport>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
