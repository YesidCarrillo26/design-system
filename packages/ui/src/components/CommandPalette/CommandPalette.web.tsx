'use client';

import { Autocomplete } from '@base-ui/react/autocomplete';
import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { useId, useRef } from 'react';
import { matchesQuery } from '../../lib/filterOptions';
import { overlayMotion } from '../../lib/overlayMotion.web';
import { tv } from '../../lib/tv';
import { Icon } from '../Icon';
import { Kbd } from '../Kbd';
import type { CommandItem, CommandPaletteBaseProps } from './CommandPalette.types';
import { commandPaletteStyles, searchableText } from './commandPalette.variants';

const webStyles = tv({
  extend: commandPaletteStyles,
  slots: {
    popup: ['relative flex max-h-[min(32rem,calc(100dvh-6rem))] flex-col outline-none', ...overlayMotion.popupScale],
    inputRow: 'flex focus-within:ring-2 focus-within:ring-inset focus-within:ring-ring',
    input: 'border-0 bg-transparent outline-none placeholder:text-muted-foreground',
    list: 'min-h-0 overflow-auto overscroll-contain',
    item: 'flex cursor-default select-none outline-none data-[highlighted]:bg-accent',
    empty: 'empty:hidden',
    footer: 'flex',
    hint: 'inline-flex',
  },
});

interface Group {
  value: string;
  items: CommandItem[];
}

export type CommandPaletteProps = CommandPaletteBaseProps;

/**
 * Paleta de comandos: un diálogo con un campo de búsqueda y una lista agrupada (Base UI `Autocomplete`
 * en modo `inline`). Flechas para moverse, Enter para elegir y Escape para cerrar; el primer resultado
 * queda resaltado al escribir. Filtra sin distinguir acentos ni mayúsculas, también por `keywords`.
 */
export function CommandPalette({ open, onOpenChange, groups, label = 'Paleta de comandos', placeholder = 'Escribe un comando o busca…', emptyText = 'Sin resultados' }: CommandPaletteProps) {
  const s = webStyles();
  const hintsId = useId();
  // El foco inicial va al buscador (no al primer elemento tabulable): se escribe nada más abrir.
  const inputRef = useRef<HTMLInputElement>(null);
  const items: Group[] = groups.map((group) => ({ value: group.label, items: group.items }));
  return (
    <BaseDialog.Root open={open} onOpenChange={(next) => onOpenChange(next)}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className={['fixed inset-0 bg-overlay', ...overlayMotion.backdrop].join(' ')} />
        <BaseDialog.Viewport className="fixed inset-0 flex items-start justify-center p-4 pt-[12vh]">
          <BaseDialog.Popup aria-label={label} initialFocus={inputRef} className={s.popup()}>
            <Autocomplete.Root
              open
              inline
              items={items}
              autoHighlight="always"
              keepHighlight
              itemToStringValue={(item: CommandItem) => item.label}
              filter={(item: CommandItem, query: string) => matchesQuery(searchableText(item), query)}
            >
              <Autocomplete.InputGroup className={s.inputRow()}>
                <Icon name="search" size="md" tone="muted" />
                <Autocomplete.Input ref={inputRef} aria-label={placeholder} aria-describedby={hintsId} placeholder={placeholder} className={s.input()} />
              </Autocomplete.InputGroup>
              <BaseDialog.Close className="sr-only">Cerrar {label}</BaseDialog.Close>
              <Autocomplete.Empty className={s.empty()}>{emptyText}</Autocomplete.Empty>
              <Autocomplete.List aria-label={label} className={s.list()}>
                {(group: Group) => (
                  <Autocomplete.Group key={group.value} items={group.items}>
                    <Autocomplete.GroupLabel className={s.groupLabel()}>{group.value}</Autocomplete.GroupLabel>
                    <Autocomplete.Collection>
                      {(item: CommandItem) => (
                        <Autocomplete.Item
                          key={item.id}
                          value={item}
                          onClick={() => {
                            item.onSelect();
                            onOpenChange(false);
                          }}
                          className={s.item()}
                        >
                          {item.icon ? <Icon name={item.icon} size="md" tone="muted" /> : null}
                          <span className={`flex flex-col ${s.itemBody()}`}>
                            <span className={s.itemLabel()}>{item.label}</span>
                            {item.description ? <span className={s.itemDescription()}>{item.description}</span> : null}
                          </span>
                          {item.shortcut?.length ? (
                            <span aria-hidden className="inline-flex gap-1">
                              {item.shortcut.map((key) => (
                                <Kbd key={key}>{key}</Kbd>
                              ))}
                            </span>
                          ) : null}
                        </Autocomplete.Item>
                      )}
                    </Autocomplete.Collection>
                  </Autocomplete.Group>
                )}
              </Autocomplete.List>
              <div className={s.footer()}>
                <span id={hintsId} className="sr-only">
                  Usa las flechas para moverte, Enter para elegir y Escape para cerrar.
                </span>
                <span aria-hidden className={s.hint()}>
                  <Kbd>↑</Kbd>
                  <Kbd>↓</Kbd>
                  <span className={s.hintLabel()}>moverse</span>
                </span>
                <span aria-hidden className={s.hint()}>
                  <Kbd>↵</Kbd>
                  <span className={s.hintLabel()}>elegir</span>
                </span>
                <span aria-hidden className={s.hint()}>
                  <Kbd>esc</Kbd>
                  <span className={s.hintLabel()}>cerrar</span>
                </span>
              </div>
            </Autocomplete.Root>
          </BaseDialog.Popup>
        </BaseDialog.Viewport>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
