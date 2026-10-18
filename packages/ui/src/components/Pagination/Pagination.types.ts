/** Contrato compartido de `Pagination`: navegación entre páginas de un listado. */
export interface PaginationBaseProps {
  /** Total de páginas (mínimo 1). */
  pageCount: number;
  /** Página actual, base 1 (controlado). */
  page?: number;
  /**
   * Página inicial (no controlado).
   * @default 1
   */
  defaultPage?: number;
  /** Se invoca con la página elegida. */
  onPageChange?: (page: number) => void;
  /**
   * Páginas visibles a cada lado de la actual. El resto se resume con "…".
   * @default 1
   */
  siblingCount?: number;
  /**
   * Nombre accesible de la región de navegación.
   * @default 'Paginación'
   */
  label?: string;
  /** Clases adicionales para el contenedor. */
  className?: string;
}
