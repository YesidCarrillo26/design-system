import { Children, type ReactNode } from 'react';
import { Box } from '../../components/Box';
import { Divider } from '../../components/Divider';
import { ListItemGroupContext } from '../../components/ListItem/ListItemGroupContext';
import { Stack } from '../../components/Stack';
import { Text } from '../../components/Text';

export interface SettingsGroupProps {
  /** Título del grupo, en mayúsculas pequeñas sobre la tarjeta. También es su nombre accesible. */
  title?: string;
  /** Nota al pie, bajo la tarjeta. */
  footer?: string;
  /** Las filas del grupo: normalmente `ListItem`. */
  children?: ReactNode;
}

/**
 * Grupo de ajustes: un título, una tarjeta con filas separadas por líneas y una nota al pie.
 * Los `ListItem` de dentro omiten su borde propio (lo dibuja el grupo, y no hay línea tras la última).
 *
 * Es un **patrón**: solo compone primitivas del sistema, así que se escribe una vez para web y native.
 */
export function SettingsGroup({ title, footer, children }: SettingsGroupProps) {
  const rows = Children.toArray(children);
  return (
    <Stack gap="xs">
      {title ? (
        <Text variant="overline" tone="muted" className="px-4">
          {title}
        </Text>
      ) : null}
      <ListItemGroupContext.Provider value>
        <Box surface="raised" radius="lg" bordered className="overflow-hidden" role="group" aria-label={title}>
          {rows.flatMap((row, index) => (index === 0 ? [row] : [<Divider key={`divider-${index}`} />, row]))}
        </Box>
      </ListItemGroupContext.Provider>
      {footer ? (
        <Text variant="caption" tone="muted" className="px-4">
          {footer}
        </Text>
      ) : null}
    </Stack>
  );
}
