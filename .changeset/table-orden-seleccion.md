---
'@chroma-yesid/ui': minor
---

`Table` con orden y selección de filas; `Checkbox` y `Switch` con texto oculto.

- **`Table`:** columnas `sortable` (ascendente → descendente → sin ordenar; `sortValue`, `sort` / `defaultSort` / `onSortChange` y `manualSorting` para ordenar en el servidor). Orden estable, sin distinguir acentos ni mayúsculas, con números naturales (`F-2` antes que `F-10`) y vacíos al final. En web, `aria-sort` y un botón en el encabezado; en native, el botón anuncia el orden en su etiqueta.
- **`Table` `selectable`:** columna de casillas con "seleccionar todas" en estado mixto; `selectedKeys` / `defaultSelectedKeys` / `onSelectionChange` (claves en el orden de `rows`) y `getRowLabel` para nombrar cada fila a los lectores de pantalla.
- **`Checkbox`:** `indeterminate` (se anuncia como `mixed`) y `hideLabel`.
- **`Switch`:** `hideLabel`.
