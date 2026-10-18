import { useState } from 'react';
import { Button } from '../Button';
import { Text } from '../Text';
import { Sheet } from './Sheet';
import type { SheetBaseProps } from './Sheet.types';

/** Ejemplo para stories: un botón que abre la hoja. */
export function SheetExample(props: Omit<SheetBaseProps, 'open' | 'onOpenChange' | 'children'>) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onPress={() => setOpen(true)}>Abrir hoja</Button>
      <Sheet {...props} open={open} onOpenChange={setOpen}>
        <Text tone="muted">Contenido de la hoja.</Text>
        <Button variant="outline" onPress={() => setOpen(false)}>Cerrar</Button>
      </Sheet>
    </>
  );
}
