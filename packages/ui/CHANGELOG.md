# @yesid/ui

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
  - @yesid/tokens@0.1.0
