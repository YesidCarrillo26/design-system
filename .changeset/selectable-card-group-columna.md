---
'@chroma-yesid/ui': patch
---

**`SelectableCardGroup` (web):** el título y la descripción de cada tarjeta se pintaban en fila porque al cuerpo le faltaba `flex-col` (en native ya era columna). Ahora van en columna en ambas plataformas; se agrega una prueba de regresión.
