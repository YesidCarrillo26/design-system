import { useState } from 'react';
import { Button } from '../Button';
import { Text } from '../Text';
import { CommandPalette } from './CommandPalette';
import type { CommandGroup, CommandPaletteBaseProps } from './CommandPalette.types';

/** Ejemplo para stories: un botón abre la paleta y el último comando elegido se muestra debajo. */
export function CommandPaletteExample({ groups, ...props }: Pick<CommandPaletteBaseProps, 'label' | 'placeholder' | 'emptyText'> & { groups: CommandGroup[] }) {
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState<string | null>(null);
  // El comando elegido se anota aquí para que las pruebas puedan comprobarlo.
  const wired = groups.map((group) => ({
    ...group,
    items: group.items.map((item) => ({
      ...item,
      onSelect: () => {
        item.onSelect();
        setLast(item.label);
      },
    })),
  }));
  return (
    <>
      <Button leadingIcon="search" variant="outline" onPress={() => setOpen(true)}>
        Abrir paleta
      </Button>
      {last ? <Text tone="muted">Último: {last}</Text> : null}
      <CommandPalette {...props} groups={wired} open={open} onOpenChange={setOpen} />
    </>
  );
}
