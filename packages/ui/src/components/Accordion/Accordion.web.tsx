'use client';

import { Accordion as BaseAccordion } from '@base-ui/react/accordion';
import { tv } from '../../lib/tv';
import { Icon } from '../Icon';
import type { AccordionBaseProps } from './Accordion.types';
import { accordionStyles } from './accordion.variants';

const accordionWebStyles = tv({
  extend: accordionStyles,
  slots: {
    root: 'overflow-hidden',
    item: 'last:border-b-0',
    trigger: [
      'flex w-full cursor-pointer text-left hover:bg-muted',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset',
      '[&[data-panel-open]>svg]:rotate-90',
    ],
  },
});

export type AccordionProps = AccordionBaseProps;

/** Secciones expandibles con botones de encabezado accesibles (`aria-expanded`). */
export function Accordion({ items, multiple = false, defaultValue, className }: AccordionProps) {
  const s = accordionWebStyles();
  return (
    <BaseAccordion.Root multiple={multiple} defaultValue={defaultValue} className={s.root({ className })}>
      {items.map((item) => (
        <BaseAccordion.Item key={item.value} value={item.value} className={s.item()}>
          <BaseAccordion.Header>
            <BaseAccordion.Trigger className={`${s.trigger()} ${s.title()}`}>
              <span className="flex-1">{item.title}</span>
              <Icon name="chevron-right" size="sm" tone="muted" className="transition-transform" />
            </BaseAccordion.Trigger>
          </BaseAccordion.Header>
          <BaseAccordion.Panel className={s.panel()}>{item.content}</BaseAccordion.Panel>
        </BaseAccordion.Item>
      ))}
    </BaseAccordion.Root>
  );
}
