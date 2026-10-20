# @chroma-yesid/tokens

## 0.2.0

### Minor Changes

- b4ed1f6: Tokens de fundación para llevar el sistema más allá del look por defecto. Todo es aditivo salvo lo marcado como cambio.

  **Colores:** rampas `brand` 50–950 y nuevas `red`, `green`, `amber`, `blue`. Semánticos nuevos (claro y oscuro): superficies `card` y `popover`, `accent`, `input`, `overlay`, `primary-subtle` y, para cada estado (`destructive`, `success`, `warning`, `info`), el cuarteto `X`, `X-foreground`, `X-subtle` y `X-subtle-foreground`. `destructive` ahora referencia la rampa `red` (mismo valor que antes).

  **Tipografía:** estilos `display`, `heading-xl|lg|md|sm` y `overline`, con espaciado entre letras (en `em` en web; en px en native, ya calculado). `title` queda obsoleto: equivale a `heading-lg`. La constante `text` suma `letterSpacing` en px.

  **Otros tokens:** pesos (`font-normal|medium|semibold|bold`), capas `z-overlay|popover|toast` (solo web), opacidades `opacity-disabled|pressed`, sombra `shadow-xs`. Nuevas constantes exportadas: `fontWeight`, `zIndex`, `opacity` y `easing` (curvas como `[x1, y1, x2, y2]` para `Easing.bezier` de React Native). Los tipos `ShadowToken`, `DurationToken`, `EaseToken`… se generan desde los datos.

  **Cambio:** `web.css` y `native.css` eliminan los tamaños y pesos de texto por defecto de Tailwind (`text-xs`…`text-9xl`, `font-thin`, `font-light`, `font-black`…), igual que ya se hacía con la paleta de color. Quien los use fuera de `@chroma-yesid/ui` debe pasar a los estilos del sistema (`text-body-sm`, `text-heading-lg`…) y a los cuatro pesos.

  Calidad: nuevo test de contraste WCAG (4.5:1 texto, 3:1 anillo de foco) para todos los pares texto/fondo, en ambos temas.

## 0.1.2

### Patch Changes

- 093e70e: Agrega un README a cada paquete para que npm muestre cómo instalarlos y usarlos.

## 0.1.1

### Patch Changes

- bf640c0: Los paquetes pasan a llamarse `@chroma-yesid/tokens` y `@chroma-yesid/ui` (antes `@yesid/*`). Aún no se habían publicado.

## 0.1.0

### Minor Changes

- 5ba10d9: Respeta "Reducir movimiento" del sistema. En web, `web.css` anula animaciones y transiciones bajo `prefers-reduced-motion: reduce`. En native, los `Modal` de `Dialog`, `Popover`, `Menu`, `Select` y `Sheet` pasan a `animationType="none"`.
- aa583c1: Primera versión: tokens DTCG (web y native) y componentes Text, Stack y Button con implementaciones web y native.
- 9e4ff29: Agrega Box, Heading, Icon, IconButton, Spinner, Badge, Avatar, Card, Divider y Link, y los tokens de elevación, movimiento, breakpoints y fuentes por plataforma. Oscurece `muted-foreground` del tema claro para cumplir contraste AA.
