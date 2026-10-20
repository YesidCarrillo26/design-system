# 0005 — Tokens de superficies, estados y tipografía

- **Estado:** aceptada
- **Fecha:** 2026-10-20

## Contexto

El sistema nació con 12 colores semánticos, un solo fondo (`background`), un único color de error
(`destructive`, con un hex suelto) y cinco tamaños de texto, el mayor de 24px. Eso alcanza para un
formulario, pero no para un producto: no hay colores de éxito, advertencia o información, no hay capas
(tarjeta sobre página, menú sobre tarjeta) y los títulos no tienen jerarquía. La dirección elegida
("neutral preciso", en la línea de Linear o Klaviyo) depende justo de eso: grises con matiz, un acento
contenido y capas legibles.

## Decisión

**Superficies.** `background` (página), `card` (tarjetas, tablas, campos) y `popover` (diálogos, menús),
cada una con su `*-foreground`. Los nombres coinciden con los de shadcn, así un registro futuro
(ver `docs/pendientes.md`) no obliga a renombrar. Se suman `accent` (resaltado de hover y activo),
`input` (borde de controles) y `overlay` (velo de diálogos, semitransparente y distinto por tema).

**Estados.** `destructive`, `success`, `warning` e `info` tienen cuatro tokens cada uno:
`X` (relleno), `X-foreground` (texto sobre el relleno), `X-subtle` (fondo suave) y
`X-subtle-foreground` (texto e iconos de estado). Se evitó el sufijo `muted` porque `muted` ya significa
"superficie atenuada y neutra". Reglas:
- `X` solo se usa como relleno. El texto o el icono de un estado usa `X-subtle-foreground`, sobre su
  fondo suave, sobre `background` o sobre `card`.
- `warning` no se usa como color de texto (ámbar sobre blanco: 2.15:1).
- Los bordes tintados usan el modificador de opacidad (`border-success-subtle-foreground/20`).

**Neutros y marca.** `neutral` se queda en zinc: su matiz (~286°) ya está cerca del del índigo (~277°),
así los grises leen como "con matiz de marca" sin cambiar valores. `brand` se amplía a 50–950; `red`,
`green`, `amber` y `blue` salen de la misma escala de Tailwind v3, y `destructive` deja de usar un hex
suelto.

**Tipografía.** Estilos `display`, `heading-xl|lg|md|sm` y `overline`, con espaciado entre letras en los
títulos. El **peso no va dentro del estilo**: lo elige cada componente (`font-semibold` en los títulos).
Motivo: Uniwind sí entiende `font-semibold`, pero no se quiso depender de `--text-*--font-weight`.
`title` queda obsoleto como alias de `heading-lg` (los ejemplos lo usan).

**Espaciado entre letras en native en px.** Web usa `em`; native recibe el valor ya multiplicado por el
tamaño (`-0.022em × 36px = -0.79px`). Es determinista y no depende de cómo Uniwind resuelva `em`.

**Se eliminan los valores por defecto de Tailwind** que el sistema reemplaza (`text-xs…9xl`,
`font-thin…black`), como ya se hacía con la paleta. Así no se mezclan tamaños sueltos con los del sistema.

**Contraste comprobado en cada build** (`packages/tokens/sd/contrast.test.ts`): 4.5:1 para cada par
texto/fondo y 3:1 para el anillo de foco, en claro y oscuro. Quedan fuera `border`, `input` y `overlay`:
son decorativos o semitransparentes, y ningún control depende solo de su borde para ser reconocible.

## Consecuencias

- Quien consuma `@chroma-yesid/tokens` fuera de `@chroma-yesid/ui` pierde `text-sm`, `font-light` y
  similares. Es un cambio con versión **minor** (estamos en 0.x) y queda dicho en el changeset.
- Más tokens que mantener: 36 colores semánticos × 2 temas. El build ya exige que cada color exista en
  ambos temas, y el test de contraste evita que un valor nuevo rompa la accesibilidad en silencio.
- Aplicar las superficies a los componentes (que `Card` pase de `background` a `card`) es un cambio visual
  y va en un PR aparte del de los tokens.
