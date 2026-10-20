'use client';

import { Popover as BasePopover } from '@base-ui/react/popover';
import { overlayMotion } from '../../lib/overlayMotion.web';
import { tv } from '../../lib/tv';
import type { PopoverBaseProps } from './Popover.types';
import { popoverStyles } from './popover.variants';

const popoverWebStyles = tv({
  extend: popoverStyles,
  slots: {
    trigger: [
      'inline-flex cursor-pointer hover:bg-muted',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    ],
    triggerLabel: 'inline-flex',
    popup: ['flex max-w-xs flex-col outline-none', ...overlayMotion.popupScale],
  },
});

export type PopoverProps = PopoverBaseProps;

/** Contenido flotante anclado al disparador, con posicionamiento automático y manejo de foco. */
export function Popover({ trigger, label, children }: PopoverProps) {
  const s = popoverWebStyles();
  return (
    <BasePopover.Root>
      <BasePopover.Trigger aria-label={label} className={`${s.trigger()} ${s.triggerLabel()}`}>
        {trigger}
      </BasePopover.Trigger>
      <BasePopover.Portal>
        <BasePopover.Positioner sideOffset={8}>
          <BasePopover.Popup className={s.popup()}>{children}</BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
}
