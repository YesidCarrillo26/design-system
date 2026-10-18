# @chroma-yesid/tokens

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
