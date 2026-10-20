import { tv } from '../../lib/tv';
import type { CommandGroup, CommandItem } from './CommandPalette.types';
import { matchesQuery } from '../../lib/filterOptions';

export const commandPaletteStyles = tv({
  slots: {
    popup: 'w-full max-w-lg overflow-hidden rounded-lg border border-border bg-popover shadow-lg',
    inputRow: 'flex-row items-center gap-2 border-b border-border px-3',
    input: 'h-12 flex-1 text-body-md text-foreground',
    list: 'py-1',
    groupLabel: 'px-3 pb-1 pt-2 text-overline font-medium uppercase text-muted-foreground',
    item: 'min-h-11 flex-row items-center gap-3 px-3 py-2',
    itemBody: 'flex-1',
    itemLabel: 'text-body-md text-foreground',
    itemDescription: 'text-body-sm text-muted-foreground',
    empty: 'px-4 py-8 text-center text-body-sm text-muted-foreground',
    footer: 'flex-row items-center gap-4 border-t border-border px-3 py-2',
    hint: 'flex-row items-center gap-1',
    hintLabel: 'text-caption text-muted-foreground',
  },
});

/** Texto en el que se busca un comando: su nombre, su descripción y sus palabras extra. */
export const searchableText = (item: CommandItem) => [item.label, item.description, ...(item.keywords ?? [])].filter(Boolean).join(' ');

/** Grupos con solo los comandos que coinciden; los grupos vacíos se quitan. */
export function filterGroups(groups: CommandGroup[], query: string): CommandGroup[] {
  return groups
    .map((group) => ({ ...group, items: group.items.filter((item) => matchesQuery(searchableText(item), query)) }))
    .filter((group) => group.items.length > 0);
}
