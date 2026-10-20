import type { ReactNode } from 'react';
import { Button } from '../../components/Button';
import { Heading } from '../../components/Heading';
import { Progress } from '../../components/Progress';
import { Stack } from '../../components/Stack';
import { Text } from '../../components/Text';

export interface OnboardingAction {
  /** Texto del botón. */
  label: string;
  /** Se invoca al activar el botón. */
  onPress: () => void;
  /**
   * Deshabilita el botón (p. ej. hasta que se elija una opción).
   * @default false
   */
  disabled?: boolean;
  /**
   * Muestra el estado de carga (solo en la acción principal).
   * @default false
   */
  loading?: boolean;
}

export interface OnboardingStepProps {
  /** Paso actual, desde 1. */
  step: number;
  /** Cantidad total de pasos. */
  total: number;
  /** Pregunta o título del paso (encabezado de nivel 1). */
  title: string;
  /** Texto de apoyo bajo el título. */
  description?: string;
  /** Contenido del paso: normalmente un `SelectableCardGroup` o un campo. */
  children?: ReactNode;
  /** Acción principal, a todo el ancho ("Continuar"). */
  primaryAction: OnboardingAction;
  /** Acción secundaria, discreta ("Omitir"). */
  secondaryAction?: Pick<OnboardingAction, 'label' | 'onPress'>;
  /**
   * Nombre accesible de la barra de progreso.
   * @default 'Paso {step} de {total}'
   */
  progressLabel?: string;
}

/**
 * Un paso de onboarding: barra de progreso arriba, título, descripción, contenido y acciones.
 * Es un **patrón**: se escribe una vez y las primitivas resuelven web o native.
 */
export function OnboardingStep({ step, total, title, description, children, primaryAction, secondaryAction, progressLabel }: OnboardingStepProps) {
  return (
    <Stack gap="lg" className="px-6 py-6">
      <Progress label={progressLabel ?? `Paso ${step} de ${total}`} value={step} max={total} size="sm" />
      <Stack gap="xs">
        <Heading level={1} size="lg">
          {title}
        </Heading>
        {description ? <Text tone="muted">{description}</Text> : null}
      </Stack>
      {children}
      <Stack gap="sm">
        <Button fullWidth size="lg" onPress={primaryAction.onPress} disabled={primaryAction.disabled} loading={primaryAction.loading}>
          {primaryAction.label}
        </Button>
        {secondaryAction ? (
          <Button fullWidth variant="ghost" onPress={secondaryAction.onPress}>
            {secondaryAction.label}
          </Button>
        ) : null}
      </Stack>
    </Stack>
  );
}
