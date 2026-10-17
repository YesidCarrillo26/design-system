'use client';

import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import { tv } from '../../lib/tv';
import type { TabsBaseProps } from './Tabs.types';
import { tabsStyles } from './tabs.variants';

const tabsWebStyles = tv({
  extend: tabsStyles,
  slots: {
    list: 'flex',
    tab: [
      'inline-flex cursor-pointer text-muted-foreground hover:text-foreground',
      'aria-selected:border-primary aria-selected:text-foreground',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset',
    ],
    panel: 'outline-none',
  },
});

export type TabsProps = TabsBaseProps;

/** Pestañas accesibles: flechas para moverse entre ellas, un panel por pestaña. */
export function Tabs({ items, value, defaultValue, onValueChange, className }: TabsProps) {
  const s = tabsWebStyles();
  return (
    <BaseTabs.Root
      value={value}
      defaultValue={defaultValue ?? items[0]?.value}
      onValueChange={(next) => onValueChange?.(String(next))}
      className={s.root({ className })}
    >
      <BaseTabs.List className={s.list()}>
        {items.map((item) => (
          <BaseTabs.Tab key={item.value} value={item.value} className={`${s.tab()} ${s.tabLabel()}`}>
            {item.label}
          </BaseTabs.Tab>
        ))}
      </BaseTabs.List>
      {items.map((item) => (
        <BaseTabs.Panel key={item.value} value={item.value} className={s.panel()}>
          {item.content}
        </BaseTabs.Panel>
      ))}
    </BaseTabs.Root>
  );
}
