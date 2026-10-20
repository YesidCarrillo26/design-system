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

## 2026-10-20 — PR 2: superficies y tipografía aplicadas (cambio visual)

**Qué**
- `background` claro → `neutral.50`. Las superficies elevadas pasan a `bg-card` y los popups a `bg-popover` (ver el changeset para la lista). Cambio mecánico por patrón, sin tocar la lógica.
- Velos → `bg-overlay`. Antes `bg-foreground/40` era un velo **claro** en oscuro y `Select` native usaba `bg-black/40`.
- `opacity-50` → `opacity-disabled`; `active:opacity-80` → `active:opacity-pressed`.
- `Heading` gana `size` y sus niveles usan `heading-*`; `EmptyState` usa `size="md"` para no crecer de más. `Text` gana `overline`.

**Decisión:** `primary-foreground` en oscuro se queda en `neutral.950`: da 6.67:1 sobre `brand.400`, frente a 5.36:1 con `brand.950`.

**Cómo verificarlo:** `pnpm turbo run build typecheck test:unit test:storybook test:native` y revisar los baselines de Chromatic en claro y oscuro.

## 2026-10-20 — PR 3: mejoras a componentes existentes

**Qué:** `Button` (ghost, destructive, `loading`, íconos, `fullWidth`), `Badge` (`tone` × `appearance`, `icon`), `Toast` (success/warning/info, `title`, `action`), `TextField` (íconos, `prefix`, `suffix`), `Card` (`variant`, padding `sm`), `Tabs` (`pill`), `Icon` (20 íconos y tonos de estado) y `Spinner` (`tone`). Detalle en el changeset.

**Decisiones**
- `Card` **no** gana `interactive` (estaba en el plan): un contenedor con hover pero sin rol ni foco engaña a la accesibilidad. Si hace falta, será un componente pulsable aparte.
- `loading` deja el botón enfocable (`aria-busy` + `aria-disabled`) y bloquea `onPress`; `disabled` lo saca del orden de tabulación.
- `TextField`: el borde pasa al contenedor para alojar adornos; `TextArea` conserva `textInputStyles`.
- Los íconos de estado sobre superficies neutras usan `*-subtle-foreground` (ADR 0005).

**Cómo se verificó:** todos los pasos de `ci.yml` en local (ver `AGENTS.md`), 49 tests native. Los paths de los 20 íconos nuevos se dibujaron en una hoja SVG y se revisaron a ojo. El test native de `loading` falla si se quita el bloqueo.

**Lecciones**
- ⚠️ Al probar un cambio a propósito, no restaures con `git checkout --` un archivo con cambios sin commitear: borra el trabajo. Haz una copia antes o commitea primero.
- En stories **compartidas** no uses `div`: rompe en native. Usa `Stack`.

## 2026-10-20 — PR 4: movimiento de overlays

**Qué:** entrada y salida animadas en `Dialog`, `Sheet`, `Popover`, `Menu`, `Tooltip` (web) y `Dialog`, `Popover`, `Menu`, `Select`, `Sheet` (native); `Toast` web entra con `starting:`. Decisión y motivos en el ADR 0006 (sin Reanimated).

**Cómo se verificó:** todos los pasos de `ci.yml` en local; 51 tests native. Se comprobó con el compilador de Tailwind que `data-starting-style:`, `data-ending-style:`, `origin-(--transform-origin)` y `starting:` generan CSS. El test de `Modal` falla si se rompe la regla de movimiento reducido.

**Lecciones**
- ⚠️ El lint con React Compiler rechaza `setState` síncrono dentro de un efecto y leer `ref.current` en render. Para un valor animado, `useState(() => new Animated.Value(0))`; para "montado hasta que acabe la salida", ajustar el estado durante el render al abrir y desmontar desde el callback de la animación.
- Un `View` con `role="dialog"` no cuenta como accesible para Testing Library; un `Pressable` sí. No cambiar el contenedor sin pensar en cómo lo ven los lectores de pantalla.
- En Jest las animaciones terminan al instante: para probar el orden (salida y luego desmontar) hay que espiar `Animated.timing`.
- `sed -i` de BSD (macOS) exige `-i ''`; con comillas en el script lo toma como extensión.
- Pendiente de verificar a mano: cómo se sienten las animaciones en el simulador y que la hoja native sube bien con la altura real (usa la altura de la ventana como recorrido).

## 2026-10-20 — PR 5: Alert, Progress, Chip, SegmentedControl y Kbd

**Qué:** cinco componentes nuevos con su contrato, variantes compartidas, stories (citan la referencia de Mobbin), `play` web y test native. Más el `@keyframes` del progreso indeterminado en los tokens (aplazado desde el PR 1).

**Decisiones**
- `Progress` no usa el `Progress` de Base UI: el marcado propio (`role="progressbar"` + `aria-value*`) es idéntico en web y native y comparte el cálculo. El anillo indeterminado en native reutiliza `Spinner`.
- `Alert` no anuncia nada por defecto (`live=false`): un mensaje fijo no debe interrumpir al lector de pantalla. Con `live`, `alert` para error y advertencia, `status` para el resto. En native el rol va en el texto, no en el contenedor, para no ocultar el botón de cerrar.
- `Chip` solo es botón de alternancia si recibe `selected`, `defaultSelected` u `onSelectedChange`; si no, es una etiqueta (un botón sin función engaña). El botón de quitar es hermano, nunca está anidado.
- Con movimiento reducido el progreso indeterminado queda como una barra llena y atenuada, no como una animación a 1ms (que lo dejaría fuera de la pista).

**Cómo se verificó:** todos los pasos de `ci.yml` en local; 203 tests web (con a11y) y 64 native.

**Lecciones**
- `getByRole` de Testing Library exige `accessible`: `ActivityIndicator` con `accessibilityRole` no basta. Se corrigió en `Spinner`, lo que además mejora la accesibilidad real.
- Si turbo falla en una tarea, cancela las demás: un fallo en `test:storybook` puede ser solo la cancelación. Repite esa tarea sola antes de buscar un error.

## 2026-10-20 — PR 6: OtpInput y Combobox

**Qué:** `OtpInput` y `Combobox` en web y native, con `lib/filterOptions.ts` compartido (normaliza acentos y mayúsculas) y sus tests. Resuelve el pendiente "`Select` con búsqueda (`Combobox`)".

**Decisiones**
- Native de `OtpInput`: un único `TextInput` invisible sobre casillas decorativas (`aria-hidden`), no un input por casilla. Así pegar y el autocompletado del SMS funcionan con un solo campo.
- `Combobox`: sin agrupación de opciones (`options[].group` del plan queda fuera de esta entrega); el contrato es el de `Select` más búsqueda. Si hace falta, se añade después sin romper nada.
- Web: la etiqueta de `Field` apunta al disparador (`htmlFor`) y el popup lleva `aria-label`.

**Cómo se verificó:** todos los pasos de `ci.yml` en local; 224 tests web (con a11y) y 76 native.

**Lecciones**
- En esta versión de Testing Library `render` y `fireEvent` son asíncronos: sin `await`, el estado no se actualiza y el test falla de forma confusa (la lista no se filtraba).
- Los elementos con `aria-hidden` o `importantForAccessibility="no-hide-descendants"` no aparecen en `getByText`; usar `{ includeHiddenElements: true }` solo para elementos decorativos.
- Base UI nombra el grupo y el primer campo del `OTPField` con la misma etiqueta: en los `play`, `getByRole('textbox', { name })` en vez de `getByLabelText`.
- `test:storybook` puede fallar en frío con "iframe did not become ready" o "Failed to fetch dynamically imported module": repetir con `--force` antes de buscar un error de código.

## 2026-10-20 — PR 7: Table con orden y selección

**Qué:** `Table` ordenable y con selección de filas; `Checkbox` con `indeterminate` y `hideLabel`; `Switch` con `hideLabel`. La lógica vive en `Table/useTableState.ts`, compartida por web y native (sin imports de plataforma).

**Decisiones**
- Orden: `localeCompare` con `numeric` y `sensitivity: 'base'` (acentos y mayúsculas no cuentan; `F-2` < `F-10`); los vacíos van al final en ambas direcciones; es estable.
- `manualSorting` para orden en el servidor: la tabla solo muestra el indicador y avisa.
- La selección se informa con las claves en el orden original de `rows`, no en el visual, y descarta las claves de filas que ya no existen.
- En native no existe `aria-sort`: la dirección va en la etiqueta del botón ("Total, orden ascendente"). Los textos de los botones web usan la misma etiqueta.
- Cada casilla de fila se nombra "Seleccionar <getRowLabel>" (por defecto "fila n").

**Cómo se verificó:** todos los pasos de `ci.yml` en local (ver `AGENTS.md`).

**Lecciones**
- Un test que compara el orden de filas por texto deja claro el comportamiento; el de "F-2 antes que F-10" evita el orden alfabético simple.
- Al repartir relleno entre un botón y su texto (native) hay que dar un slot solo de texto: aplicar la misma clase a los dos duplica el relleno.

## 2026-10-20 — PR 8: patrones de producto

**Qué:** `ListItem` pasa de patrón a componente web/native (`onPress`, `value`, `showChevron`, `destructive`, `disabled`); nuevo componente `SelectableCardGroup`; nuevos patrones `SettingsGroup`, `OnboardingStep` y `StatCard`. Cada uno con stories que citan la referencia de Mobbin y tests native.

**Decisiones**
- `ListItem` debía ser componente: un patrón solo puede componer primitivas y no puede renderizar un `<button>`/`Pressable` propio. La importación desde el paquete no cambia; solo cambia la ubicación (y el id de la story: de *Patterns* a *Components*).
- `SettingsGroup` avisa a sus filas por contexto (`ListItemGroupContext`) para que omitan su borde y dibuja los separadores él mismo, sin línea tras la última. Evita clonar elementos o pedir una prop a cada fila.
- `SelectableCardGroup`: `value` siempre es una lista (en `single`, de un elemento) para tener un solo contrato; `maxSelected` cubre "elige hasta N".
- `StatCard`: el signo va en el texto (`+420 %`) y `sentiment` es independiente de `direction`, porque subir no siempre es bueno (más errores).
- En ARIA, `aria-valuenow` es el valor dentro del rango (`aria-valuemax`), no un porcentaje: el progreso de `OnboardingStep` expone paso 2 de 5.

**Cómo se verificó:** todos los pasos de `ci.yml` en local (ver `AGENTS.md`).

## 2026-10-20 — PR 9: CommandPalette y cierre de la fase

**Qué:** `CommandPalette` (web con Base UI `Autocomplete` en línea dentro de un `Dialog`; native, hoja alta con búsqueda y `SectionList`). Cierre de la fase: guía paso a paso (sección 9c), READMEs de `ui` y `tokens`, introducción de Storybook, `buenas-practicas.md` (sección "Diseño visual"), tabla de diferencias de plataforma, plan y pendientes. La skill `chroma-design-system` (en `~/.claude/skills`, fuera del repo) se actualizó con la API y los tokens nuevos.

**Decisiones**
- El foco inicial va al buscador (`initialFocus` con una ref): por defecto Base UI enfoca el primer elemento tabulable, y una paleta debe poder escribirse al abrir.
- Búsqueda por `label`, `description` y `keywords`, sin acentos ni mayúsculas, con `filterOptions` compartido; los grupos sin coincidencias se ocultan.
- En native no hay pie de teclas ni atajos: en un teléfono no hay teclado físico. Queda documentado en la guía y en la story.

**Lecciones**
- ⚠️ La animación de salida (PR 4) deja el popup montado cuando corre axe: el `listbox` sin nombre del `Combobox` (un fallo real, de un PR anterior) solo apareció ahora. Los overlays con `role="listbox"` necesitan `aria-label`.
- En los `play` hay que esperar el foco (`waitFor(() => expect(input).toHaveFocus())`) antes de pulsar teclas: el campo existe antes de recibirlo.

**Cómo se verificó:** todos los pasos de `ci.yml` en local (ver `AGENTS.md`).

## Balance de la Fase 10

9 PR: tokens de fundación, superficies y tipografía, mejoras a componentes, movimiento de overlays, componentes de feedback y selección, OTP y Combobox, Table con orden y selección, patrones de producto y paleta de comandos. El sistema pasó de 31 componentes y 3 patrones a más de 45 componentes y 5 patrones, con 36 colores semánticos por tema (antes 12), jerarquía tipográfica y animación de overlays.

**Pendiente tras la fase** (ver `docs/pendientes.md`): probar a mano en el simulador iOS y en Android las animaciones, el pegado en `OtpInput` y el teclado sobre las hojas; agrupación de opciones en `Combobox`; revisión visual en Chromatic; publicar la versión con el PR "Version Packages".

## 2026-10-20 — Publicación y prueba como consumidor

**Qué:** el PR "Version Packages" publicó `@chroma-yesid/ui@0.3.0` y `@chroma-yesid/tokens@0.4.0` (procedencia SLSA verificada con `npm view <pkg>@<versión> dist.attestations`). Las versiones anteriores de la fase ya se habían publicado en `ui@0.2.0` / `tokens@0.3.0` al fusionar los "Version Packages" intermedios, así que los números no coinciden con los previstos en el plan.

**Prueba como consumidor** (proyecto vacío fuera del repo, lo **publicado** en npm, no el código local):
- `npm install react@19 @chroma-yesid/ui@0.3.0` sin `--force`: sin errores de peers; `tokens@0.4.0` llega como dependencia.
- Una pantalla con 20 componentes de la fase (Alert, Progress, Combobox, OtpInput, Table con orden y selección, CommandPalette, SettingsGroup, StatCard…): `tsc` sin errores con `skipLibCheck: false` (los tipos publicados son correctos), `vite build` con Tailwind v4 en verde.
- CSS generado: existen `text-display`, `bg-card`, `bg-popover`, `bg-success-subtle`, `bg-overlay`, `animate-indeterminate` (con su `@keyframes`), `opacity-disabled`, `z-popover` y `data-starting-style`; **no** existen `text-xs`, `font-light`, `text-2xl` ni `bg-red-500` (el reset funciona).
- El bundle web no contiene `react-native`.
- Render en servidor con `renderToString`: sin errores y con `h1`, `role="progressbar"` y `aria-sort` en el HTML.

**Lecciones:** un script de prueba fuera del `include` del tsconfig usa el JSX clásico y falla con "React is not defined": se confunde con un fallo del paquete. Ponlo dentro de `src/`.

**No cubierto:** la versión native (Expo/Uniwind) del paquete publicado: solo está probada con los tests de Jest y el export de Metro del repo.
