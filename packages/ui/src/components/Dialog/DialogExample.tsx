import { useState } from 'react';
import { Button } from '../Button';
import { Text } from '../Text';
import { Dialog } from './Dialog';
import type { DialogBaseProps } from './Dialog.types';

/** Ejemplo para stories: un botón que abre el diálogo (que se controla desde fuera). */
export function DialogExample(props: Omit<DialogBaseProps, 'open' | 'onOpenChange' | 'children'>) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onPress={() => setOpen(true)}>Abrir diálogo</Button>
      <Dialog {...props} open={open} onOpenChange={setOpen}>
        <Text tone="muted">Se borrarán todos los datos asociados.</Text>
        <Button variant="outline" onPress={() => setOpen(false)}>Cancelar</Button>
      </Dialog>
    </>
  );
}
