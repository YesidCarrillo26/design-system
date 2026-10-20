import { Button } from '../Button';
import { Stack } from '../Stack';
import { ToastProvider } from './Toast';
import { useToast } from './ToastContext';
import type { ToastOptions } from './Toast.types';

function Buttons({ duration }: Pick<ToastOptions, 'duration'>) {
  const toast = useToast();
  return (
    <Stack direction="row" gap="sm">
      <Button onPress={() => toast.show('Cambios guardados', { duration })}>Mostrar aviso</Button>
      <Button variant="outline" onPress={() => toast.show('No se pudo guardar', { variant: 'destructive', duration })}>
        Mostrar error
      </Button>
      <Button variant="outline" onPress={() => toast.show('Se archivó la conversación', { variant: 'success', title: 'Listo', action: { label: 'Deshacer', onPress: () => {} }, duration })}>
        Éxito con acción
      </Button>
    </Stack>
  );
}

/** Ejemplo para stories: botones que disparan avisos con `useToast()`. */
export function ToastExample({ duration }: Pick<ToastOptions, 'duration'>) {
  return (
    <ToastProvider>
      <Buttons duration={duration} />
    </ToastProvider>
  );
}
