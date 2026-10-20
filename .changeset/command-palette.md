---
'@chroma-yesid/ui': minor
---

**`CommandPalette`:** búsqueda y acciones rápidas por grupos (`groups` con `label` e `items`; cada comando con `label`, `description`, `icon`, `shortcut`, `keywords` y `onSelect`). En web es un diálogo con Base UI `Autocomplete` en línea: el foco inicial va al buscador, flechas para moverse, Enter para elegir, Escape para cerrar, y un pie con las teclas. Filtra sin distinguir acentos ni mayúsculas, también por `keywords`, y oculta los grupos sin coincidencias. En native es una hoja alta con búsqueda y lista agrupada, sin atajos.

También: el `listbox` de `Combobox` web tiene ahora nombre accesible.
