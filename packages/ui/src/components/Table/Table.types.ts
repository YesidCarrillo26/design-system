import type { ReactNode } from 'react';

export type TableAlign = 'start' | 'end';
export type SortDirection = 'asc' | 'desc';

/** Orden actual: la columna y su dirección. `null` es "sin ordenar" (el orden original de `rows`). */
export interface TableSort {
  key: string;
  direction: SortDirection;
}

export interface TableColumn<Row> {
  /** Identificador de la columna. */
  key: string;
  /** Texto del encabezado. */
  header: string;
  /**
   * Alineación del contenido (usa `end` para cifras).
   * @default 'start'
   */
  align?: TableAlign;
  /** Cómo pintar la celda. Por defecto, `String(row[key])`. */
  render?: (row: Row) => ReactNode;
  /**
   * Permite ordenar por esta columna (clic o toque en el encabezado: ascendente → descendente → sin ordenar).
   * @default false
   */
  sortable?: boolean;
  /** Valor por el que se ordena. Por defecto, `row[key]`. Cifras como número, texto como texto; `null` va al final. */
  sortValue?: (row: Row) => string | number | null | undefined;
}

/** Contrato compartido de `Table`: datos tabulares, con orden y selección de filas opcionales. */
export interface TableBaseProps<Row> {
  /** Columnas, en orden. */
  columns: TableColumn<Row>[];
  /** Filas de datos. */
  rows: Row[];
  /** Identificador estable de cada fila. */
  getRowKey: (row: Row, index: number) => string;
  /** Título de la tabla. Es su nombre accesible. */
  caption: string;
  /**
   * Texto cuando no hay filas.
   * @default 'Sin datos'
   */
  emptyText?: string;
  /** Orden controlado. `null` es "sin ordenar". */
  sort?: TableSort | null;
  /** Orden inicial (modo no controlado). */
  defaultSort?: TableSort | null;
  /** Se invoca al cambiar el orden. */
  onSortChange?: (sort: TableSort | null) => void;
  /**
   * El orden lo hace quien usa la tabla (p. ej. en el servidor): `rows` ya llega ordenada y la tabla
   * solo muestra el indicador y avisa con `onSortChange`.
   * @default false
   */
  manualSorting?: boolean;
  /**
   * Agrega una columna de casillas para elegir filas, con "seleccionar todas" en el encabezado.
   * @default false
   */
  selectable?: boolean;
  /** Claves (`getRowKey`) de las filas elegidas (controlado). */
  selectedKeys?: string[];
  /** Filas elegidas al inicio (modo no controlado). */
  defaultSelectedKeys?: string[];
  /** Se invoca con las claves elegidas, en el orden de `rows`. */
  onSelectionChange?: (keys: string[]) => void;
  /**
   * Texto que nombra cada fila para lectores de pantalla (p. ej. el cliente): "Seleccionar <texto>".
   * Por defecto, "fila n".
   */
  getRowLabel?: (row: Row, index: number) => string;
  /** Clases adicionales para el contenedor. */
  className?: string;
}
