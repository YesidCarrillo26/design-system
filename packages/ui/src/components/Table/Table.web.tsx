import { tv } from '../../lib/tv';
import type { TableBaseProps } from './Table.types';
import { tableStyles } from './table.variants';

const tableWebStyles = tv({ extend: tableStyles, slots: { root: 'border-collapse overflow-hidden', row: 'last:border-b-0' } });

export type TableProps<Row> = TableBaseProps<Row>;

/** Tabla de solo lectura con `<caption>` y encabezados `scope="col"`. Se desplaza en horizontal si no cabe. */
export function Table<Row>({ columns, rows, getRowKey, caption, emptyText = 'Sin datos', className }: TableProps<Row>) {
  const s = tableWebStyles();
  return (
    <div className={`overflow-x-auto ${className ?? ''}`.trim()}>
      <table className={s.root()}>
        <caption className={s.caption()}>{caption}</caption>
        <thead>
          <tr className={s.row()}>
            {columns.map((column) => (
              <th key={column.key} scope="col" className={tableWebStyles({ align: column.align }).head()}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={s.empty()}>
                {emptyText}
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr key={getRowKey(row, index)} className={s.row()}>
                {columns.map((column) => (
                  <td key={column.key} className={tableWebStyles({ align: column.align }).cell()}>
                    {column.render ? column.render(row) : String((row as Record<string, unknown>)[column.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
