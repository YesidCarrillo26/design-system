'use client';

import { tv } from '../../lib/tv';
import { Checkbox } from '../Checkbox';
import { Icon } from '../Icon';
import type { TableBaseProps } from './Table.types';
import { sortLabel, tableStyles } from './table.variants';
import { useTableState } from './useTableState';

const tableWebStyles = tv({
  extend: tableStyles,
  slots: {
    root: 'border-collapse overflow-hidden',
    row: 'last:border-b-0',
    sortButton: 'inline-flex cursor-pointer p-0 rounded-sm hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    selectCell: 'table-cell',
  },
});

export type TableProps<Row> = TableBaseProps<Row>;

const ariaSort = { asc: 'ascending', desc: 'descending' } as const;

/**
 * Tabla con `<caption>` y encabezados `scope="col"`. Las columnas ordenables llevan un botón en el
 * encabezado y `aria-sort`; con `selectable` suma una columna de casillas. Se desplaza en horizontal si no cabe.
 */
export function Table<Row>({ columns, rows, getRowKey, caption, emptyText = 'Sin datos', selectable = false, getRowLabel, className, ...state }: TableProps<Row>) {
  const { items, sort, toggleSort, isSelected, toggleRow, toggleAll, allSelected, someSelected } = useTableState({ columns, rows, getRowKey, ...state });
  const s = tableWebStyles();
  const span = columns.length + (selectable ? 1 : 0);
  return (
    <div className={`overflow-x-auto ${className ?? ''}`.trim()}>
      <table className={s.root()}>
        <caption className={s.caption()}>{caption}</caption>
        <thead>
          <tr className={s.row()}>
            {selectable && (
              <th scope="col" className={s.selectCell()}>
                <Checkbox label="Seleccionar todas las filas" hideLabel checked={allSelected} indeterminate={someSelected} onCheckedChange={toggleAll} disabled={rows.length === 0} />
              </th>
            )}
            {columns.map((column) => {
              const direction = sort?.key === column.key ? sort.direction : null;
              const head = tableWebStyles({ align: column.align, sorted: direction !== null });
              return (
                <th key={column.key} scope="col" aria-sort={column.sortable ? (direction ? ariaSort[direction] : 'none') : undefined} className={head.head()}>
                  {column.sortable ? (
                    <button type="button" onClick={() => toggleSort(column.key)} aria-label={sortLabel(column.header, direction)} className={head.sortButton()}>
                      {column.header}
                      <Icon name={direction === 'asc' ? 'arrow-up' : direction === 'desc' ? 'arrow-down' : 'chevrons-up-down'} size="sm" tone={direction ? 'default' : 'muted'} />
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={span} className={s.empty()}>
                {emptyText}
              </td>
            </tr>
          ) : (
            items.map(({ row, key }, position) => {
              const selected = isSelected(key);
              const rowStyles = tableWebStyles({ selected });
              return (
                <tr key={key} className={rowStyles.row()}>
                  {selectable && (
                    <td className={s.selectCell()}>
                      <Checkbox label={`Seleccionar ${getRowLabel ? getRowLabel(row, position) : `fila ${position + 1}`}`} hideLabel checked={selected} onCheckedChange={() => toggleRow(key)} />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td key={column.key} className={tableWebStyles({ align: column.align }).cell()}>
                      {column.render ? column.render(row) : String((row as Record<string, unknown>)[column.key] ?? '')}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
