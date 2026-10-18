import type { ReactNode } from 'react';

export type TableAlign = 'start' | 'end';

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
}

/** Contrato compartido de `Table`: datos tabulares de solo lectura. */
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
  /** Clases adicionales para el contenedor. */
  className?: string;
}
