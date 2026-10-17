import type { ReactNode } from 'react';
import { Heading } from '../../components/Heading';
import { Icon, type IconName } from '../../components/Icon';
import { Stack } from '../../components/Stack';
import { Text } from '../../components/Text';

export interface EmptyStateProps {
  /** Ícono ilustrativo (decorativo). */
  icon?: IconName;
  /** Qué está vacío. */
  title: string;
  /** Qué puede hacer la persona al respecto. */
  description?: string;
  /** Acción principal (normalmente un `Button`). */
  children?: ReactNode;
}

/**
 * Estado vacío: ícono, título, descripción y una acción.
 *
 * Es un **patrón**: solo compone primitivas del sistema, así que se escribe una vez y las
 * primitivas resuelven web o native. No hay `.web.tsx` ni `.native.tsx`.
 */
export function EmptyState({ icon = 'info', title, description, children }: EmptyStateProps) {
  return (
    <Stack align="center" gap="sm" className="px-6 py-10">
      <Icon name={icon} size="lg" tone="muted" />
      <Heading level={3}>{title}</Heading>
      {description ? <Text tone="muted" className="text-center">{description}</Text> : null}
      {children}
    </Stack>
  );
}
