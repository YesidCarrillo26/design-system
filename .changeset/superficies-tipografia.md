---
'@chroma-yesid/ui': minor
'@chroma-yesid/tokens': minor
---

**Cambio visual.** Se aplican las superficies y la jerarquía tipográfica de los tokens nuevos.

- `background` claro pasa de blanco a `neutral.50`; las superficies elevadas (`Card`, `Box surface="raised"`, `Table`, `Toast`, campos, caja de `Checkbox`, pulgar de `Switch`, disparadores de `Select`/`Menu`/`Popover`) usan `bg-card`, y `Dialog`, `Sheet`, `Popover` y `Menu` usan `bg-popover`.
- El velo de `Dialog` y `Sheet` y de los overlays native usa `bg-overlay`. Corrige que en oscuro fuera un velo claro (`bg-foreground/40`) y que `Select` native usara `bg-black/40`.
- Deshabilitado y presionado usan `opacity-disabled` y `opacity-pressed`.
- `Heading`: los niveles 1–4 pasan a `heading-xl|lg|md|sm` (antes reutilizaban tamaños de cuerpo, por lo que `PageHeader` y `EmptyState` se ven distintos). Nueva prop `size` (`sm|md|lg|xl|display`) para separar el aspecto del nivel semántico.
- `Text`: nueva variante `overline`; `title` queda obsoleto y equivale a `heading-lg`.
