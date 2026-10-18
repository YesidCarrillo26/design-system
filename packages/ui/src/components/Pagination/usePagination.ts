import { useControllableState } from '../../lib/useControllableState';
import type { PaginationBaseProps } from './Pagination.types';

export type PageItem = number | 'ellipsis-start' | 'ellipsis-end';

const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i);

/**
 * Páginas que se muestran: siempre la primera y la última, la actual con `siblingCount` vecinas
 * a cada lado y un "…" donde se omiten páginas. La cantidad de elementos es constante (si hay
 * suficientes páginas) para que el control no cambie de ancho al avanzar.
 */
export function getPageItems(page: number, pageCount: number, siblingCount = 1): PageItem[] {
  const total = Math.max(1, Math.floor(pageCount));
  const siblings = Math.max(0, Math.floor(siblingCount));
  // primera + última + actual + vecinas + 2 "…"
  const slots = siblings * 2 + 5;
  if (total <= slots) return range(1, total);

  const current = Math.min(Math.max(1, page), total);
  const left = Math.max(current - siblings, 1);
  const right = Math.min(current + siblings, total);
  const showStartEllipsis = left > 3;
  const showEndEllipsis = right < total - 2;
  const edge = 3 + 2 * siblings;

  if (!showStartEllipsis) return [...range(1, edge), 'ellipsis-end', total];
  if (!showEndEllipsis) return [1, 'ellipsis-start', ...range(total - edge + 1, total)];
  return [1, 'ellipsis-start', ...range(left, right), 'ellipsis-end', total];
}

/** Estado y elementos de la paginación; lo comparten las dos plataformas. */
export function usePagination({
  pageCount,
  page,
  defaultPage = 1,
  onPageChange,
  siblingCount = 1,
}: Pick<PaginationBaseProps, 'pageCount' | 'page' | 'defaultPage' | 'onPageChange' | 'siblingCount'>) {
  const total = Math.max(1, Math.floor(pageCount));
  const [value, setValue] = useControllableState({ value: page, defaultValue: defaultPage, onChange: onPageChange });
  const current = Math.min(Math.max(1, value), total);
  const goTo = (next: number) => {
    const target = Math.min(Math.max(1, next), total);
    if (target !== current) setValue(target);
  };
  return {
    current,
    items: getPageItems(current, total, siblingCount),
    goTo,
    hasPrevious: current > 1,
    hasNext: current < total,
  };
}
