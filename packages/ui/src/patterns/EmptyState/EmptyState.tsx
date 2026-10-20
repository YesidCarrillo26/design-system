import type { ReactNode } from 'react';
import { Heading, type HeadingLevel } from '../../components/Heading';
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
  /**
   * Nivel del título. Debe seguir al encabezado anterior de la página (no saltarse niveles).
   * @default 2
   */
  headingLevel?: HeadingLevel;
  /** Acción principal (normalmente un `Button`). */
  children?: ReactNode;
}

/**
 * Estado vacío: ícono, título, descripción y una acción.
 *
 * Es un **patrón**: solo compone primitivas del sistema, así que se escribe una vez y las
 * primitivas resuelven web o native. No hay `.web.tsx` ni `.native.tsx`.
 */
export function EmptyState({ icon = 'info', title, description, headingLevel = 2, children }: EmptyStateProps) {
  return (
    <Stack align="center" gap="sm" className="px-6 py-10">
      <Icon name={icon} size="lg" tone="muted" />
      <Heading level={headingLevel} size="md">{title}</Heading>
      {description ? <Text tone="muted" className="text-center">{description}</Text> : null}
      {children}
    </Stack>
  );
}
