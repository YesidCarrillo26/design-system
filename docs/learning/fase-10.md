# Fase 10 — Siguiente nivel visual (bitácora)

Objetivo: que el sistema deje de verse como el "Tailwind por defecto" y se acerque a productos reales
(Linear, Klaviyo, Devin en web; listas agrupadas estilo iOS en native). Las referencias salen de Mobbin
y están enlazadas, por pieza, en la sección de *Referencias* del plan. Cada entrada dice **qué**,
**por qué** y **cómo verificarlo**; no se reescribe el pasado.

**Decisiones de la persona (2026-10-20):** dirección "neutral preciso"; se mantiene el índigo y se amplía
la rampa; alcance completo (fundaciones, mejoras a lo existente, componentes nuevos, patrones, animación
de overlays y `Table` con orden y selección); **un PR por fase**, con aprobación de cada merge.

**Fases (un PR cada una):** 1 tokens de fundación · 2 superficies y tipografía aplicadas · 3 mejoras a
componentes existentes · 4 movimiento de overlays · 5 Alert, Progress, Chip, SegmentedControl, Kbd ·
6 OtpInput y Combobox · 7 Table con orden/selección · 8 patrones de producto · 9 CommandPalette y cierre.

## 2026-10-20 — PR 1: tokens de fundación (aditivo, sin cambio visual)

**Qué**
- Rampas `brand` 50–950, `red`, `green`, `amber`, `blue`; 24 semánticos nuevos por tema (`card`, `popover`,
  `accent`, `input`, `overlay`, `primary-subtle` y el cuarteto de cada estado). Ver ADR 0005.
- Texto: `display`, `heading-xl|lg|md|sm`, `overline`, con espaciado entre letras. Pesos, `z-index`,
  opacidades y `shadow-xs`. Constantes nuevas: `fontWeight`, `zIndex`, `opacity`, `easing`.
- `build.ts`: el modelo de texto agrupa `size`, `line-height` y `letter-spacing` en un solo lugar. Antes
  cualquier propiedad distinta de `size` caía en `lineHeight` (un espaciado entre letras habría
  sobrescrito el alto de línea sin avisar). Las uniones de tipos salen de los datos en vez de estar a mano.
- Docs: páginas Colors (agrupadas por familia, con las reglas de estados), Typography (jerarquía, pesos)
  y Elevation (capas y opacidad).

**Por qué.** Ver ADR 0005. Este PR no cambia la apariencia de ningún componente: `background` conserva su
valor y nada usa aún los estilos nuevos.

**Cómo verificarlo**
- `pnpm --filter @chroma-yesid/tokens build && pnpm --filter @chroma-yesid/tokens test:unit` (85 tests,
  incluidos 68 pares de contraste).
- Se comprobó con el compilador real que las utilidades nuevas existen y las eliminadas no:
  - **Web:** compilar con `@tailwindcss/node` los candidatos sobre `web.css` (`text-display` emite
    `letter-spacing: var(--tw-tracking, var(--text-display--letter-spacing))`; `text-xs` y `font-light` ya
    no se generan).
  - **Native:** `npx expo export --platform ios --no-bytecode` con un archivo temporal que usa las clases
    y búsqueda en el bundle: `letterSpacing` sale como `-0.79`, `fontWeight` como `600`, `opacity` como
    `0.5`/`0.8`. Uniwind solo emite las clases que encuentra en el código, por eso hace falta ese archivo.

**Lecciones**
- ⚠️ `expo export` **regenera** `apps/storybook-native/.rnstorybook/storybook.requires.ts` (cambia las
  rutas de `directory`). Revertirlo con `git checkout --` antes de commitear.
- Con zsh, `grep --include=*.ts` sin comillas falla con "no matches found": entrecomillar el patrón.
- Un test de contraste que pasa a la primera no prueba nada hasta ver que sabe fallar: `warning` sobre
  blanco da 2.15:1, y por eso la regla "no usar `warning` como texto" está escrita en el ADR.

**Ajustes respecto al plan aprobado**
- `primary-foreground` en oscuro **no** cambia a `brand.950` en este PR (habría sido un cambio visual en
  un PR "sin cambio visual", y `neutral.950` sobre `brand.400` da 6.67:1, más que `brand.950`). Se decide
  en el PR 2 viéndolo en pantalla.
- El `@keyframes` del progreso indeterminado se emite en el PR 5, que es el que lo usa.
