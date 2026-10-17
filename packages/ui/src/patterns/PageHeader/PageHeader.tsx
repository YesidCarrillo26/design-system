import type { ReactNode } from 'react';
import { Heading } from '../../components/Heading';
import { Stack } from '../../components/Stack';
import { Text } from '../../components/Text';

export interface PageHeaderProps {
  /** Título de la página (nivel 1). */
  title: string;
  /** Descripción breve bajo el título. */
  description?: string;
  /** Acciones a la derecha (botones). */
  actions?: ReactNode;
}

/** Encabezado de página: título, descripción y acciones. Patrón compartido (se escribe una vez). */
export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <Stack direction="row" align="center" justify="between" gap="md" className="px-4 py-4">
      <Stack gap="xs" className="flex-1">
        <Heading level={1}>{title}</Heading>
        {description ? <Text tone="muted">{description}</Text> : null}
      </Stack>
      {actions}
    </Stack>
  );
}
