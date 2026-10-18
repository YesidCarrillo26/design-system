import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '../Icon';
import type { AccordionBaseProps } from './Accordion.types';
import { accordionStyles } from './accordion.variants';

export type AccordionProps = AccordionBaseProps;

/** Secciones expandibles con encabezados accesibles (`aria-expanded`). */
export function Accordion({ items, multiple = false, defaultValue = [], className }: AccordionProps) {
  const [open, setOpen] = useState<string[]>(defaultValue);
  const s = accordionStyles();
  const toggle = (value: string) =>
    setOpen((current) => (current.includes(value) ? current.filter((v) => v !== value) : multiple ? [...current, value] : [value]));
  return (
    <View className={s.root({ className: `overflow-hidden ${className ?? ''}`.trim() })}>
      {items.map((item, index) => {
        const expanded = open.includes(item.value);
        return (
          <View key={item.value} className={s.item({ className: index === items.length - 1 ? 'border-b-0' : undefined })}>
            <Pressable role="button" aria-expanded={expanded} aria-label={item.title} onPress={() => toggle(item.value)} className={`${s.trigger()} active:bg-muted`}>
              <Text className={s.title()}>{item.title}</Text>
              <Icon name="chevron-right" size="sm" tone="muted" />
            </Pressable>
            {expanded ? <View className={s.panel()}>{item.content}</View> : null}
          </View>
        );
      })}
    </View>
  );
}
