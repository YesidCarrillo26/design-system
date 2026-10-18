import type { ReactNode } from 'react';
import { Text, View } from 'react-native';
import type { TableAlign, TableBaseProps } from './Table.types';
import { tableStyles } from './table.variants';

export type TableProps<Row> = TableBaseProps<Row>;

/** En React Native el texto debe ir dentro de `Text`; los elementos que devuelve `render` se dejan tal cual. */
function CellContent({ content, align }: { content: ReactNode; align?: TableAlign }) {
  if (typeof content === 'string' || typeof content === 'number') {
    return <Text className={tableStyles({ align }).cell()}>{content}</Text>;
  }
  return <>{content}</>;
}

/**
 * Tabla de solo lectura hecha con `View`s (React Native no tiene `<table>`). Las columnas se
 * reparten el ancho por igual; para tablas anchas, envuélvela en un `ScrollView` horizontal.
 *
 * Los `role` (`table`, `row`, `columnheader`, `cell`) son metadatos: en React Native un `View` no es
 * un elemento de accesibilidad salvo que sea `accessible`, y marcar la tabla así la volvería una
 * sola parada. Los lectores de pantalla leen el título y las celdas en orden.
 */
export function Table<Row>({ columns, rows, getRowKey, caption, emptyText = 'Sin datos', className }: TableProps<Row>) {
  const s = tableStyles();
  return (
    <View role="table" aria-label={caption} className={`${s.root()} overflow-hidden ${className ?? ''}`.trim()}>
      <Text className={s.caption()}>{caption}</Text>
      <View role="row" className={`flex-row ${s.row()}`}>
        {columns.map((column) => (
          <View key={column.key} role="columnheader" className="flex-1">
            <Text className={tableStyles({ align: column.align }).head()}>{column.header}</Text>
          </View>
        ))}
      </View>
      {rows.length === 0 ? (
        <Text className={s.empty()}>{emptyText}</Text>
      ) : (
        rows.map((row, index) => (
          <View key={getRowKey(row, index)} role="row" className={`flex-row ${s.row({ className: index === rows.length - 1 ? 'border-b-0' : undefined })}`}>
            {columns.map((column) => (
              <View key={column.key} role="cell" className="flex-1">
                <CellContent
                  align={column.align}
                  content={column.render ? column.render(row) : String((row as Record<string, unknown>)[column.key] ?? '')}
                />
              </View>
            ))}
          </View>
        ))
      )}
    </View>
  );
}
