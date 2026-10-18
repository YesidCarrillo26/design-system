import { View } from 'react-native';
import { Button } from '../Button';
import { Stack } from '../Stack';
import { Text } from '../Text';
import type { PaginationBaseProps } from './Pagination.types';
import { usePagination } from './usePagination';

export type PaginationProps = PaginationBaseProps;

/**
 * Navegación entre páginas. React Native no tiene `aria-current`: la página actual se expone como
 * seleccionada (`accessibilityState.selected`). Usa botones `md` para cumplir el área táctil de 44.
 */
export function Pagination({ label = 'Paginación', className, ...options }: PaginationProps) {
  const { current, items, goTo, hasPrevious, hasNext } = usePagination(options);
  return (
    <View role="navigation" aria-label={label} className={className}>
      <Stack direction="row" gap="xs" align="center">
        <Button variant="outline" disabled={!hasPrevious} onPress={() => goTo(current - 1)}>
          Anterior
        </Button>
        {items.map((item) =>
          typeof item === 'number' ? (
            <Button
              key={item}
              variant={item === current ? 'primary' : 'outline'}
              aria-label={`Página ${item}`}
              accessibilityState={{ selected: item === current }}
              onPress={() => goTo(item)}
            >
              {item}
            </Button>
          ) : (
            <Text key={item} accessibilityElementsHidden importantForAccessibility="no" tone="muted" className="px-1">
              …
            </Text>
          ),
        )}
        <Button variant="outline" disabled={!hasNext} onPress={() => goTo(current + 1)}>
          Siguiente
        </Button>
      </Stack>
    </View>
  );
}
