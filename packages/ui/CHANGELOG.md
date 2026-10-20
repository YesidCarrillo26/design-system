# @chroma-yesid/ui

## 0.1.3

### Patch Changes

- Updated dependencies [b4ed1f6]
  - @chroma-yesid/tokens@0.2.0

## 0.1.2

### Patch Changes

- 093e70e: Agrega un README a cada paquete para que npm muestre cómo instalarlos y usarlos.
- Updated dependencies [093e70e]
  - @chroma-yesid/tokens@0.1.2

## 0.1.1

### Patch Changes

- a812bb0: Los ayudantes de stories (`DialogExample`, `SheetExample`, `ToastExample`) pasan a `X.example.tsx` y ya no se incluyen en el paquete publicado.
- e01612a: Corrige en native el borde inferior que sobresalía en `Accordion` y `Table`, y hace que `Pagination` (web y native) pase a varias líneas cuando no cabe en el ancho disponible.
- 7d05643: Los `peerDependencies` pasan de versiones exactas (`react 19.3.0`, `react-native 0.88.0`, `react-native-svg 15.16.0`) a rangos (`>=19 <20`, `>=0.88 <1`, `>=15 <16`). Con la `0.1.0` ningún proyecto con otra versión de React podía instalar el paquete sin `--force`.
- bf640c0: Los paquetes pasan a llamarse `@chroma-yesid/tokens` y `@chroma-yesid/ui` (antes `@yesid/*`). Aún no se habían publicado.
- Updated dependencies [bf640c0]
  - @chroma-yesid/tokens@0.1.1

## 0.1.0

### Minor Changes

- 9cb58a3: Agrega los componentes de formulario Field, TextField, TextArea, Checkbox, RadioGroup, Switch y Select, con implementaciones web y native.
- 5ba10d9: Respeta "Reducir movimiento" del sistema. En web, `web.css` anula animaciones y transiciones bajo `prefers-reduced-motion: reduce`. En native, los `Modal` de `Dialog`, `Popover`, `Menu`, `Select` y `Sheet` pasan a `animationType="none"`.
- ce4571b: Agrega Dialog, Sheet, Popover, Menu, Tooltip, Tabs, Accordion y Toast, con implementaciones web (Base UI) y native.
- 809a33e: Agrega `Pagination`: navegación entre páginas con "Anterior/Siguiente", elipsis, modo controlado o no y soporte de teclado y lectores de pantalla.
- cb645bb: Agrega los patrones EmptyState, ListItem y PageHeader (escritos una vez, compartidos por web y native), el ícono `star`, y corrige que el Avatar native no fuera accesible para lectores de pantalla.
- aa583c1: Primera versión: tokens DTCG (web y native) y componentes Text, Stack y Button con implementaciones web y native.
- 9e4ff29: Agrega Box, Heading, Icon, IconButton, Spinner, Badge, Avatar, Card, Divider y Link, y los tokens de elevación, movimiento, breakpoints y fuentes por plataforma. Oscurece `muted-foreground` del tema claro para cumplir contraste AA.
- fee1d45: Agrega `Skeleton`, un marcador de posición para contenido que está cargando (formas `text`, `rect` y `circle`).
- 1f964bd: Agrega `Table`: tabla de solo lectura por datos (`columns` + `rows`) con `<table>` semántico en web y roles `table/row/columnheader/cell` en native.

### Patch Changes

- Updated dependencies [5ba10d9]
- Updated dependencies [aa583c1]
- Updated dependencies [9e4ff29]
  - @chroma-yesid/tokens@0.1.0
