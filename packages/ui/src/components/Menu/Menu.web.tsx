'use client';

import { Menu as BaseMenu } from '@base-ui/react/menu';
import { tv } from '../../lib/tv';
import type { MenuBaseProps } from './Menu.types';
import { menuStyles } from './menu.variants';

const menuWebStyles = tv({
  extend: menuStyles,
  slots: {
    trigger: [
      'inline-flex cursor-pointer hover:bg-muted',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    ],
    popup: 'flex flex-col outline-none',
    item: 'cursor-pointer outline-none data-[highlighted]:bg-muted data-[disabled]:cursor-not-allowed',
  },
});

export type MenuProps = MenuBaseProps;

/** Menú de acciones con navegación por teclado (flechas, Enter, Escape). */
export function Menu({ trigger, label, items }: MenuProps) {
  const base = menuWebStyles();
  return (
    <BaseMenu.Root>
      <BaseMenu.Trigger aria-label={label} className={`${base.trigger()} ${base.triggerLabel()}`}>
        {trigger}
      </BaseMenu.Trigger>
      <BaseMenu.Portal>
        <BaseMenu.Positioner sideOffset={8} align="start">
          <BaseMenu.Popup className={base.popup()}>
            {items.map((item) => {
              const s = menuWebStyles({ destructive: item.destructive, disabled: item.disabled });
              return (
                <BaseMenu.Item key={item.label} disabled={item.disabled} onClick={item.onSelect} className={`${s.item()} ${s.itemLabel()}`}>
                  {item.label}
                </BaseMenu.Item>
              );
            })}
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  );
}
