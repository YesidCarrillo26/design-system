import { Badge } from '../../components/Badge';
import type { BadgeTone } from '../../components/Badge/Badge.types';
import { Card } from '../../components/Card';
import { Icon, type IconName } from '../../components/Icon';
import { Skeleton } from '../../components/Skeleton';
import { Stack } from '../../components/Stack';
import { Text } from '../../components/Text';

export type StatTrendDirection = 'up' | 'down' | 'flat';
export type StatTrendSentiment = 'positive' | 'negative' | 'neutral';

export interface StatTrend {
  /** Variación ya formateada, con su signo visible: `+420 %`, `-3,2 %`, `0 %`. El signo va en el texto, no solo en el color. */
  value: string;
  /** Hacia dónde se movió la cifra (define la flecha). */
  direction: StatTrendDirection;
  /**
   * Si el cambio es bueno o malo (define el color). Subir no siempre es bueno: más errores es `negative`.
   * Por defecto: `up` → positive, `down` → negative, `flat` → neutral.
   */
  sentiment?: StatTrendSentiment;
}

export interface StatCardProps {
  /** Qué mide la cifra ("Suscriptores"). */
  label: string;
  /** La cifra, ya formateada ("26", "6,95 %"). */
  value: string;
  /** Variación respecto al período de comparación. */
  trend?: StatTrend;
  /** Con qué se compara la variación ("vs. período anterior"). */
  comparison?: string;
  /** Ícono decorativo junto a la etiqueta. */
  icon?: IconName;
  /**
   * Muestra marcadores de carga en lugar de la cifra y marca la tarjeta como ocupada.
   * @default false
   */
  loading?: boolean;
}

const arrow: Record<StatTrendDirection, IconName> = { up: 'arrow-up-right', down: 'arrow-down-right', flat: 'minus' };
const defaultSentiment: Record<StatTrendDirection, StatTrendSentiment> = { up: 'positive', down: 'negative', flat: 'neutral' };
const badgeTone: Record<StatTrendSentiment, BadgeTone> = { positive: 'success', negative: 'destructive', neutral: 'neutral' };

/**
 * Tarjeta de indicador (KPI): etiqueta, cifra grande y variación con su comparación.
 * Es un **patrón**: se escribe una vez y las primitivas resuelven web o native.
 */
export function StatCard({ label, value, trend, comparison, icon, loading = false }: StatCardProps) {
  return (
    <Card aria-busy={loading || undefined}>
      <Stack gap="sm">
        <Stack direction="row" align="center" gap="xs">
          {icon ? <Icon name={icon} size="sm" tone="muted" /> : null}
          <Text variant="body-sm" tone="muted">
            {label}
          </Text>
        </Stack>
        {loading ? (
          <>
            <Skeleton shape="rect" className="h-9 w-28" />
            <Skeleton shape="text" className="w-40" />
          </>
        ) : (
          <>
            <Text className="text-heading-xl font-semibold">{value}</Text>
            {trend || comparison ? (
              <Stack direction="row" align="center" gap="sm">
                {trend ? (
                  <Badge tone={badgeTone[trend.sentiment ?? defaultSentiment[trend.direction]]} appearance="subtle" icon={arrow[trend.direction]}>
                    {trend.value}
                  </Badge>
                ) : null}
                {comparison ? (
                  <Text variant="caption" tone="muted">
                    {comparison}
                  </Text>
                ) : null}
              </Stack>
            ) : null}
          </>
        )}
      </Stack>
    </Card>
  );
}
