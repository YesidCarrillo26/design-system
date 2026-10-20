import { useMemo } from 'react';
import { useControllableState } from '../../lib/useControllableState';
import type { TableBaseProps, TableColumn, TableSort } from './Table.types';

type SortValue = string | number | null | undefined;

const valueOf = <Row,>(column: TableColumn<Row>, row: Row): SortValue =>
  column.sortValue ? column.sortValue(row) : ((row as Record<string, unknown>)[column.key] as SortValue);

/** Números como números y texto sin distinguir acentos, mayúsculas ni el orden de los dígitos ("F-2" < "F-10"). `null` siempre al final. */
function compare(a: SortValue, b: SortValue): number {
  const aEmpty = a === null || a === undefined || a === '';
  const bEmpty = b === null || b === undefined || b === '';
  if (aEmpty || bEmpty) return aEmpty === bEmpty ? 0 : aEmpty ? 1 : -1;
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  return String(a).localeCompare(String(b), 'es', { numeric: true, sensitivity: 'base' });
}

export interface TableItem<Row> {
  row: Row;
  key: string;
}

type Options<Row> = Pick<
  TableBaseProps<Row>,
  'columns' | 'rows' | 'getRowKey' | 'sort' | 'defaultSort' | 'onSortChange' | 'manualSorting' | 'selectedKeys' | 'defaultSelectedKeys' | 'onSelectionChange'
>;

/**
 * Orden y selección de `Table`, compartidos por la implementación web y la native: sin imports
 * de plataforma. El orden es estable (a igual valor se conserva el de `rows`).
 */
export function useTableState<Row>({ columns, rows, getRowKey, sort, defaultSort = null, onSortChange, manualSorting = false, selectedKeys, defaultSelectedKeys = [], onSelectionChange }: Options<Row>) {
  const [currentSort, setSort] = useControllableState<TableSort | null>({ value: sort, defaultValue: defaultSort, onChange: onSortChange });
  const [selected, setSelected] = useControllableState<string[]>({ value: selectedKeys, defaultValue: defaultSelectedKeys, onChange: onSelectionChange });

  const items = useMemo<TableItem<Row>[]>(() => {
    const keyed = rows.map((row, index) => ({ row, key: getRowKey(row, index) }));
    const column = currentSort ? columns.find((c) => c.key === currentSort.key) : undefined;
    if (manualSorting || !currentSort || !column) return keyed;
    const factor = currentSort.direction === 'asc' ? 1 : -1;
    // `sort` de Array es estable: a igual valor se mantiene el orden original.
    return [...keyed].sort((x, y) => {
      const a = valueOf(column, x.row);
      const b = valueOf(column, y.row);
      const aEmpty = a === null || a === undefined || a === '';
      const bEmpty = b === null || b === undefined || b === '';
      // Los vacíos van al final en ambas direcciones.
      if (aEmpty || bEmpty) return compare(a, b);
      return factor * compare(a, b);
    });
  }, [rows, columns, getRowKey, currentSort, manualSorting]);

  /** Ascendente → descendente → sin ordenar. */
  const toggleSort = (key: string) => {
    if (currentSort?.key !== key) setSort({ key, direction: 'asc' });
    else if (currentSort.direction === 'asc') setSort({ key, direction: 'desc' });
    else setSort(null);
  };

  const rowKeys = items.map((item) => item.key);
  const selectedSet = new Set(selected);
  const selectedCount = rowKeys.filter((key) => selectedSet.has(key)).length;
  const allSelected = rowKeys.length > 0 && selectedCount === rowKeys.length;
  const someSelected = selectedCount > 0 && !allSelected;

  /** Conserva el orden original de `rows` en lo que se informa. */
  const commit = (keys: Set<string>) => setSelected(rows.map((row, index) => getRowKey(row, index)).filter((key) => keys.has(key)));

  const toggleRow = (key: string) => {
    const next = new Set(selectedSet);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    commit(next);
  };
  const toggleAll = () => commit(allSelected ? new Set() : new Set(rowKeys));

  return { items, sort: currentSort, toggleSort, isSelected: (key: string) => selectedSet.has(key), toggleRow, toggleAll, allSelected, someSelected };
}
