import type { ReactNode } from 'react';
import { Stack } from '../../components/Stack';
import { Text } from '../../components/Text';

export interface ListItemProps {
  /** Texto principal. */
  title: string;
  /** Texto secundario bajo el título. */
  description?: string;
  /** Contenido a la izquierda (checkbox, avatar, ícono). */
  leading?: ReactNode;
  /** Contenido a la derecha (acciones). */
  trailing?: ReactNode;
}

/**
 * Fila de lista: contenido a la izquierda, texto en el centro y acciones a la derecha.
 * Patrón compartido (se escribe una vez): los controles de `leading` y `trailing` son los
 * que aportan la interacción.
 */
export function ListItem({ title, description, leading, trailing }: ListItemProps) {
  return (
    <Stack direction="row" align="center" gap="md" className="min-h-14 border-b border-border px-4 py-2">
      {leading}
      <Stack gap="none" className="flex-1">
        <Text>{title}</Text>
        {description ? <Text variant="body-sm" tone="muted">{description}</Text> : null}
      </Stack>
      {trailing}
    </Stack>
  );
}
