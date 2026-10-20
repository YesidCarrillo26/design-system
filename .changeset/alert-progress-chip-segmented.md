---
'@chroma-yesid/ui': minor
'@chroma-yesid/tokens': minor
---

Componentes nuevos, en web y native.

- **`Alert`:** mensaje de estado dentro de la página (`neutral|info|success|warning|destructive`), con `title`, ícono por tono, `action`, `onDismiss` y `layout="banner"`. No anuncia nada salvo que se pida con `live`.
- **`Progress`:** barra o anillo (`variant`), `size`, `tone`, `showValue`; indeterminado con `value={null}`. `label` es obligatorio. Respeta movimiento reducido.
- **`SegmentedControl`:** elegir una vista entre pocas; usa radios reales en web (flechas del teclado) y `radiogroup` en native.
- **`Chip`:** etiqueta que puede alternarse (`aria-pressed`) y/o quitarse; el botón de quitar es un hermano, no está anidado.
- **`Kbd`:** una tecla o atajo.
- **`Spinner` (native):** ahora expone `role="progressbar"` y es accesible para lectores de pantalla.
- **Tokens:** `web.css` define `animate-indeterminate` y su `@keyframes`.
