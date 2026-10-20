import type { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Checkbox } from '../Checkbox';
import { Icon } from '../Icon';
import type { TableAlign, TableBaseProps } from './Table.types';
import { sortLabel, tableStyles } from './table.variants';
import { useTableState } from './useTableState';

export type TableProps<Row> = TableBaseProps<Row>;

/** En React Native el texto debe ir dentro de `Text`; los elementos que devuelve `render` se dejan tal cual. */
function CellContent({ content, align }: { content: ReactNode; align?: TableAlign }) {
  if (typeof content === 'string' || typeof content === 'number') {
    return <Text className={tableStyles({ align }).cell()}>{content}</Text>;
  }
  return <>{content}</>;
}

/**
 * Tabla hecha con `View`s (React Native no tiene `<table>`). Las columnas se reparten el ancho por
 * igual; para tablas anchas, envuélvela en un `ScrollView` horizontal. Las columnas ordenables son
 * botones cuya etiqueta anuncia el orden ("Total, orden ascendente"): React Native no tiene `aria-sort`.
 *
 * Los `role` (`table`, `row`, `columnheader`, `cell`) son metadatos: en React Native un `View` no es
 * un elemento de accesibilidad salvo que sea `accessible`, y marcar la tabla así la volvería una
 * sola parada. Los lectores de pantalla leen el título y las celdas en orden.
 */
export function Table<Row>({ columns, rows, getRowKey, caption, emptyText = 'Sin datos', selectable = false, getRowLabel, className, ...state }: TableProps<Row>) {
  const { items, sort, toggleSort, isSelected, toggleRow, toggleAll, allSelected, someSelected } = useTableState({ columns, rows, getRowKey, ...state });
  const s = tableStyles();
  return (
    <View role="table" aria-label={caption} className={`${s.root()} overflow-hidden ${className ?? ''}`.trim()}>
      <Text className={s.caption()}>{caption}</Text>
      <View role="row" className={`flex-row ${s.row()}`}>
        {selectable && (
          <View role="columnheader" className={s.selectCell()}>
            <Checkbox label="Seleccionar todas las filas" hideLabel checked={allSelected} indeterminate={someSelected} onCheckedChange={toggleAll} disabled={rows.length === 0} />
          </View>
        )}
        {columns.map((column) => {
          const direction = sort?.key === column.key ? sort.direction : null;
          const head = tableStyles({ align: column.align, sorted: direction !== null });
          return (
            <View key={column.key} role="columnheader" className="flex-1">
              {column.sortable ? (
                <Pressable role="button" aria-label={sortLabel(column.header, direction)} onPress={() => toggleSort(column.key)} className={`${head.sortButton()} active:opacity-pressed`}>
                  <Text className={head.headLabel()}>{column.header}</Text>
                  <Icon name={direction === 'asc' ? 'arrow-up' : direction === 'desc' ? 'arrow-down' : 'chevrons-up-down'} size="sm" tone={direction ? 'default' : 'muted'} />
                </Pressable>
              ) : (
                <Text className={head.head()}>{column.header}</Text>
              )}
            </View>
          );
        })}
      </View>
      {items.length === 0 ? (
        <Text className={s.empty()}>{emptyText}</Text>
      ) : (
        items.map(({ row, key }, position) => {
          const rowStyles = tableStyles({ selected: isSelected(key) });
          return (
            <View key={key} role="row" className={`flex-row ${rowStyles.row({ className: position === items.length - 1 ? 'border-b-0' : undefined })}`}>
              {selectable && (
                <View role="cell" className={s.selectCell()}>
                  <Checkbox label={`Seleccionar ${getRowLabel ? getRowLabel(row, position) : `fila ${position + 1}`}`} hideLabel checked={isSelected(key)} onCheckedChange={() => toggleRow(key)} />
                </View>
              )}
              {columns.map((column) => (
                <View key={column.key} role="cell" className="flex-1">
                  <CellContent align={column.align} content={column.render ? column.render(row) : String((row as Record<string, unknown>)[column.key] ?? '')} />
                </View>
              ))}
            </View>
          );
        })
      )}
    </View>
  );
}
