# @chroma-yesid/ui

## 0.3.0

### Minor Changes

- c42dee5: Componentes nuevos, en web y native.

  - **`Alert`:** mensaje de estado dentro de la página (`neutral|info|success|warning|destructive`), con `title`, ícono por tono, `action`, `onDismiss` y `layout="banner"`. No anuncia nada salvo que se pida con `live`.
  - **`Progress`:** barra o anillo (`variant`), `size`, `tone`, `showValue`; indeterminado con `value={null}`. `label` es obligatorio. Respeta movimiento reducido.
  - **`SegmentedControl`:** elegir una vista entre pocas; usa radios reales en web (flechas del teclado) y `radiogroup` en native.
  - **`Chip`:** etiqueta que puede alternarse (`aria-pressed`) y/o quitarse; el botón de quitar es un hermano, no está anidado.
  - **`Kbd`:** una tecla o atajo.
  - **`Spinner` (native):** ahora expone `role="progressbar"` y es accesible para lectores de pantalla.
  - **Tokens:** `web.css` define `animate-indeterminate` y su `@keyframes`.

- 3a32eed: **`CommandPalette`:** búsqueda y acciones rápidas por grupos (`groups` con `label` e `items`; cada comando con `label`, `description`, `icon`, `shortcut`, `keywords` y `onSelect`). En web es un diálogo con Base UI `Autocomplete` en línea: el foco inicial va al buscador, flechas para moverse, Enter para elegir, Escape para cerrar, y un pie con las teclas. Filtra sin distinguir acentos ni mayúsculas, también por `keywords`, y oculta los grupos sin coincidencias. En native es una hoja alta con búsqueda y lista agrupada, sin atajos.

  También: el `listbox` de `Combobox` web tiene ahora nombre accesible.

- 16ab641: Mejoras a componentes existentes, con los tokens de estado y las superficies nuevas.

  - **`Button`:** variantes `ghost` y `destructive`; props `loading` (spinner, `aria-busy` + `aria-disabled`, mantiene el foco y bloquea `onPress`), `leadingIcon`, `trailingIcon` y `fullWidth`. `outline` pasa a `bg-card` con borde `input`.
  - **`Badge`:** `tone` (`neutral|primary|success|warning|info|destructive`) × `appearance` (`solid|subtle|outline`) e `icon`. `variant` sigue funcionando pero está obsoleto.
  - **`Toast`:** variantes `success`, `warning` e `info` con su ícono de estado; `title` y `action`. Corrige el color del ícono de cerrar sobre `destructive`.
  - **`TextField`:** `leadingIcon`, `trailingIcon`, `prefix` y `suffix`. **Cambio:** `className` ahora va al contenedor con borde, no al `<input>`.
  - **`Card`:** `variant` (`default|muted|outline`) y padding `sm`.
  - **`Tabs`:** `variant="pill"` (control segmentado) además del subrayado.
  - **`Icon`:** 20 íconos nuevos (search, chevrons, flechas, minus, circle-check/alert/x, eye, eye-off, settings, bell, user, mail, lock) y tonos `success`, `warning`, `info`, `on-destructive`, `on-success`, `on-warning`, `on-info`.
  - **`Spinner`:** prop `tone` (incluye `on-*` para usarlo sobre un relleno).

- 24b59b2: Los overlays tienen animación de entrada y salida, con las duraciones y curvas de los tokens y respetando "Reducir movimiento".

  - **Web:** `Dialog`, `Sheet`, `Popover`, `Menu` y `Tooltip` se funden (con escala leve, o subiendo desde abajo en `Sheet`); el velo se funde aparte. El `Toast` entra con una transición corta.
  - **Native:** `Dialog`, `Popover`, `Menu`, `Select` y `Sheet` dejan de usar el `animationType` del `Modal` de React Native: el velo y el panel se animan por separado con `Animated` (sin Reanimated) y el contenido espera a que termine la salida antes de desmontarse. El velo ya no sube junto con la hoja.

- 44e4f00: Componentes nuevos, en web y native.

  - **`OtpInput`:** código de un solo uso en casillas (`length`, `numeric` o `alphanumeric`, `mask`, `onComplete`). En web usa Base UI `OTPField` (pegar, autocompletar del SMS, flechas); en native, un único `TextInput` invisible con `oneTimeCode` / `sms-otp`. Cada casilla web tiene nombre accesible ("Carácter n de N").
  - **`Combobox`:** `Select` con búsqueda para listas largas; mismas props que `Select` más `searchPlaceholder` y `emptyText`. Filtra sin distinguir acentos ni mayúsculas (`Bogotá` coincide con `bogota`). En web, Base UI `Combobox` con el campo dentro del popup; en native, una hoja inferior con campo de búsqueda.

- 8c690c4: Patrones de producto y `ListItem` como componente.

  - **`ListItem`** pasa de patrón a componente (la importación desde `@chroma-yesid/ui` no cambia) para poder ser pulsable: `onPress` (toda la fila es un botón), `value`, `showChevron`, `destructive` y `disabled`. Sin `onPress` se comporta como antes.
  - **`SelectableCardGroup`:** tarjetas grandes elegibles, `single` (radios) o `multiple` (casillas) con `maxSelected`; `value` es siempre una lista, en el orden de `options`.
  - **`SettingsGroup`** (patrón): título, tarjeta con filas separadas y nota al pie; los `ListItem` de dentro omiten su borde.
  - **`OnboardingStep`** (patrón): progreso, título, contenido y acciones principal y secundaria.
  - **`StatCard`** (patrón): indicador con cifra, variación (signo visible, `sentiment` independiente de la dirección), comparación y estado de carga.

- 6a4b29c: `Table` con orden y selección de filas; `Checkbox` y `Switch` con texto oculto.

  - **`Table`:** columnas `sortable` (ascendente → descendente → sin ordenar; `sortValue`, `sort` / `defaultSort` / `onSortChange` y `manualSorting` para ordenar en el servidor). Orden estable, sin distinguir acentos ni mayúsculas, con números naturales (`F-2` antes que `F-10`) y vacíos al final. En web, `aria-sort` y un botón en el encabezado; en native, el botón anuncia el orden en su etiqueta.
  - **`Table` `selectable`:** columna de casillas con "seleccionar todas" en estado mixto; `selectedKeys` / `defaultSelectedKeys` / `onSelectionChange` (claves en el orden de `rows`) y `getRowLabel` para nombrar cada fila a los lectores de pantalla.
  - **`Checkbox`:** `indeterminate` (se anuncia como `mixed`) y `hideLabel`.
  - **`Switch`:** `hideLabel`.

### Patch Changes

- Updated dependencies [c42dee5]
  - @chroma-yesid/tokens@0.4.0

## 0.2.0

### Minor Changes

- 99600ea: **Cambio visual.** Se aplican las superficies y la jerarquía tipográfica de los tokens nuevos.

  - `background` claro pasa de blanco a `neutral.50`; las superficies elevadas (`Card`, `Box surface="raised"`, `Table`, `Toast`, campos, caja de `Checkbox`, pulgar de `Switch`, disparadores de `Select`/`Menu`/`Popover`) usan `bg-card`, y `Dialog`, `Sheet`, `Popover` y `Menu` usan `bg-popover`.
  - El velo de `Dialog` y `Sheet` y de los overlays native usa `bg-overlay`. Corrige que en oscuro fuera un velo claro (`bg-foreground/40`) y que `Select` native usara `bg-black/40`.
  - Deshabilitado y presionado usan `opacity-disabled` y `opacity-pressed`.
  - `Heading`: los niveles 1–4 pasan a `heading-xl|lg|md|sm` (antes reutilizaban tamaños de cuerpo, por lo que `PageHeader` y `EmptyState` se ven distintos). Nueva prop `size` (`sm|md|lg|xl|display`) para separar el aspecto del nivel semántico.
  - `Text`: nueva variante `overline`; `title` queda obsoleto y equivale a `heading-lg`.

### Patch Changes

- Updated dependencies [99600ea]
  - @chroma-yesid/tokens@0.3.0

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
