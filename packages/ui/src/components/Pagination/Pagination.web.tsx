import { Button } from '../Button';
import { Stack } from '../Stack';
import { Text } from '../Text';
import type { PaginationBaseProps } from './Pagination.types';
import { usePagination } from './usePagination';

export type PaginationProps = PaginationBaseProps;

/** Navegación entre páginas. La página actual lleva `aria-current="page"`. */
export function Pagination({ label = 'Paginación', className, ...options }: PaginationProps) {
  const { current, items, goTo, hasPrevious, hasNext } = usePagination(options);
  return (
    <nav aria-label={label} className={className}>
      <Stack direction="row" gap="xs" align="center">
        <Button variant="outline" size="sm" disabled={!hasPrevious} onPress={() => goTo(current - 1)}>
          Anterior
        </Button>
        {items.map((item) =>
          typeof item === 'number' ? (
            <Button
              key={item}
              variant={item === current ? 'primary' : 'outline'}
              size="sm"
              aria-label={`Página ${item}`}
              aria-current={item === current ? 'page' : undefined}
              onPress={() => goTo(item)}
            >
              {item}
            </Button>
          ) : (
            <Text key={item} aria-hidden="true" tone="muted" className="px-1">
              …
            </Text>
          ),
        )}
        <Button variant="outline" size="sm" disabled={!hasNext} onPress={() => goTo(current + 1)}>
          Siguiente
        </Button>
      </Stack>
    </nav>
  );
}
