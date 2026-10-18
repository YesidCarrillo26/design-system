# Fase 9 — Mejoras continuas (bitácora)

Registro cronológico de lo que se cambia después de la Fase 8. Cada entrada dice **qué**, **por qué** y **cómo verificarlo**. Se actualiza en el mismo cambio que introduce algo; no se reescribe el pasado (si algo se revierte, se agrega una entrada nueva).

## 2026-10-17 — Pipeline en verde y herramientas de calidad

**CI**
- `attw` marcaba `web.css` y `native.css` como "Resolution failed": son CSS y no tienen tipos. Ahora `npx attw --pack . --profile esm-only --exclude-entrypoints web.css native.css`.
- Release fallaba con *GitHub Actions is not permitted to create or approve pull requests*. Es un ajuste del repo (Settings → Actions → General), no del workflow; se activó con `gh api -X PUT repos/<owner>/<repo>/actions/permissions/workflow -F can_approve_pull_request_reviews=true`.
- Chromatic: el token vive solo en el secret `CHROMATIC_PROJECT_TOKEN`. ⚠️ Se detectó un token escrito en un script `chromatic` de `apps/storybook-web/package.json` (sin commit): se quitó. Regla: ni en `package.json` ni en el historial de comandos compartido; si pasa, regenerar el token.
- Dependabot (`.github/dependabot.yml`, semanal y agrupado) mantiene al día los SHA de las GitHub Actions.

**`knip`** (dependencias, exports y archivos sin usar; paso en CI)
- La configuración (`knip.json`) existe porque este monorepo tiene archivos por plataforma: `./Accordion` solo existe como `.web`/`.native`, y knip lo ve como import sin resolver. Se ignoran los relativos (`tsc` ya los valida) y se declaran como entrada `*.{web,native}.tsx`, los tests native y las stories.
- Falsos positivos justificados en el propio `knip.json`: plugins de Expo inferidos por `userInterfaceStyle` (`expo-updates`, `expo-system-ui`), peers de runtime (`react-native-svg`, `@react-native/assets-registry`, `test-renderer`) y `@chroma-yesid/ui` como dependencia de resolución en las apps.
- Hallazgo real: dos entradas del catálogo (`@storybook/addon-ondevice-backgrounds` y `-notes`) no las usaba nadie y se eliminaron.

**Storybook web**
- Tema oscuro del panel (`manager.ts` + `theme.ts` con `light` y `dark`, que salen de los tokens). Sigue `prefers-color-scheme`; el manager solo relee el tema al recargar, por eso hay un `reload()` al cambiar la preferencia.
- Guidelines nuevas: accesibilidad, reglas multiplataforma y contribución (con la Definition of Done).
- ⚠️ Lección: al redactar esas páginas se afirmaron tres cosas que el código no respaldaba (una convención `@platform`, el tamaño táctil de `Button sm`, y movimiento reducido "global"). **Contrastar cada regla documentada con el código** antes de publicarla.

**Componentes**
- `Skeleton` (`text | rect | circle`): decorativo (`aria-hidden`; el contenedor lleva `aria-busy`). Web con `animate-pulse motion-reduce:animate-none`; native estático.

## 2026-10-17 — Movimiento reducido global

- **Web:** `packages/tokens/sd/build.ts` agrega a `web.css` un bloque `@media (prefers-reduced-motion: reduce)` que lleva animaciones, transiciones y `--ds-duration-*` a `1ms`. No se usa `0`: con 0 algunos componentes no disparan `transitionend`/`animationend` y se quedan a medias. Cubre también librerías de terceros.
- **Native:** `lib/useReducedMotion.native.ts` (lee `AccessibilityInfo` y escucha `reduceMotionChanged`) y `lib/Modal.native.tsx`, un `Modal` que pasa a `animationType="none"` con la preferencia activa. `Dialog`, `Popover`, `Menu`, `Select` y `Sheet` lo usan.
- **Verificación:** `web-css.test.ts` (tokens) y `Modal.native.test.tsx`. Se comprobó que el test native **falla** si se quita la condición.
- ⚠️ Lección de lint: la excepción de `lib/**` para importar `react-native` cubría `*.native.ts(x)` pero no `*.native.test.tsx`; se amplió en `.oxlintrc.json`.
- Lo que sigue sin cubrir: `Toast` y los `Switch`/`Accordion` de native no animan hoy; si se agregan animaciones con Reanimated hay que respetar `useReducedMotion`.

## 2026-10-18 — `main` protegida y flujo por PR

- Al intentar subir a `main`: *push declined due to repository rule violations — Required status check "verify" is expected*. Se activó una regla en el repo; desde entonces: rama → PR → `verify` + Chromatic → merge con `--rebase` (el repo no admite merge commits). El PR #3 fue el primero por este camino.
- Tras un rebase-merge los hashes de `main` local difieren de los remotos aunque el árbol sea idéntico; se alinea con `git reset --mixed origin/main` (no toca el directorio de trabajo).

## 2026-10-18 — `Pagination` y `Table`

**`Pagination`**
- Contrato: `pageCount`, `page`/`defaultPage`, `onPageChange`, `siblingCount`, `label`. Controlado o no (con `useControllableState`).
- La lógica es compartida (`usePagination.ts`): `getPageItems` devuelve siempre **7 elementos** cuando hay muchas páginas (primera, última, actual con vecinas y "…"), para que el control no cambie de ancho. Probada con valores fuera de rango.
- Se compone con `Button`. Web: `<nav>` + `aria-current="page"`, botones `sm`. Native: `role="navigation"`, página actual con `accessibilityState.selected` (no existe `aria-current`), botones `md` por el área táctil de 44.

**`Table`** (solo lectura)
- API por datos (`columns` + `rows` + `getRowKey` + `caption`), como `Tabs`/`Select`; `render` por columna para celdas personalizadas y `align: 'end'` para cifras.
- Web: `<table>` real con `<caption>` y `scope="col"`, dentro de un contenedor con scroll horizontal. Native: `View`s con `role` de tabla, columnas de igual ancho.
- ⚠️ Un `render` que devuelve texto plano rompía solo en native (*Text strings must be rendered within a <Text>*): ahora se envuelve en `Text`. Lo detectó el test native, no la suite web.
- ⚠️ En native los `role` de tabla son metadatos (un `View` no es elemento de accesibilidad salvo que sea `accessible`). Se documentó en *Diferencias entre plataformas* y los tests cuentan la estructura en `screen.toJSON()` en vez de usar `getByRole`.
- Fuera de alcance por ahora: orden, selección de filas, paginación integrada, virtualización.

## 2026-10-18 — Skills de agente: globales, no en el repo

- `npx skills add` desde una carpeta del proyecto instala la skill **en el proyecto** (`.agents/skills/`, symlink en `.claude/skills/` y un `skills-lock.json`); desde `apps/storybook-web` creó además un segundo lock. Las demás skills del autor viven globales (`~/.agents/skills` + symlinks en `~/.claude/skills`).
- Decisión: la skill de Turborepo (`vercel/turborepo`) se instaló global (`npx skills add vercel/turborepo --skill turborepo -g -y`) y se quitaron las copias del repo. Sirve para otros proyectos y no añade archivos ajenos al código. Si en el futuro se quiere que todo colaborador la tenga, instalarla en la raíz del repo y versionar `.agents/`, `.claude/` y `skills-lock.json` (nunca en subcarpetas).

## 2026-10-18 — Primera revisión en simulador (iPhone 17, iOS 26.5)

**Cómo se hizo** (sin tocar Expo Go): `cd apps/storybook-native && npx expo run:ios --device <id> --no-bundler` (compila el dev client, ~minutos la primera vez; `ios/` está en `.gitignore`), luego `npx expo start --dev-client` y abrir `dev.yesid.dsstorybook://expo-development-client/?url=http%3A%2F%2Flocalhost%3A8081` con `xcrun simctl openurl`. Capturas con `xcrun simctl io booted screenshot`. Para ver una story concreta sin tocar la pantalla se fijó **temporalmente** `getStorybookUI({ onDeviceUI: false, initialSelection: '<id>', shouldPersistSelection: false })` en `.rnstorybook/index.tsx` (no se commitea).

**Resultado:** los estilos de Uniwind **sí se aplican** en iOS (color primario del token, radios, bordes, tipografía, color de error). La duda de las fases anteriores ("los estilos no se ven") queda resuelta para iOS claro.

**Bugs reales encontrados (no los detectaba ningún test):**
1. `Accordion` y `Table` (native): el `border-b` de la última fila sobresalía bajo el contenedor redondeado. Arreglo: `overflow-hidden` en el contenedor y `border-b-0` en la última fila (en web ya se hacía con `last:border-b-0`).
2. `Pagination` (native): con 10 páginas la fila no cabía en el ancho del teléfono y "Anterior"/"Siguiente" quedaban cortados. Arreglo: `flex-wrap` y centrado, en native y en web.

**Lecciones del montaje:**
- ⚠️ `CI=1 expo start` **desactiva la recarga** ("Metro is running in CI mode, reloads are disabled"): los cambios en archivos no llegan y parece que la configuración se ignora. No usar `CI=1` para depurar.
- ⚠️ Lanzar la app con `simctl launch` da "No script URL provided"; hay que abrirla con el enlace del dev client.
- Las pruebas Jest y la suite web no ven desbordes ni bordes que sobresalen: la revisión visual en dispositivo sigue siendo necesaria para cada componente nuevo (Definition of Done, punto 7).
- Mejora menor pendiente: al envolverse, el "…" puede quedar solo al final de una línea en `Pagination`.

## 2026-10-18 — El scope pasa de `@yesid` a `@chroma-yesid`

- **Por qué:** que el nombre del paquete recuerde que es el sistema de diseño y sirva en otros proyectos. Aún no se había publicado nada (el primer `changeset publish` falló con 404), así que el cambio es gratis.
- **Qué cambió:** `@yesid` → `@chroma-yesid` en todo lo versionado (≈180 ocurrencias: `package.json`, imports, filtros de pnpm/turbo, `knip.json`, `jest.config.js`, workflows, changesets, CHANGELOG y docs; el histórico de estas bitácoras también, por consistencia). Se reinstaló para regenerar `pnpm-lock.yaml` y los enlaces de workspace.
- **No cambió:** el identificador de la app (`dev.yesid.dsstorybook`), el repo de GitHub y el nombre de la carpeta.
- **Verificado:** `lint`, `knip`, `build`, `typecheck`, `test:unit`, `test:native`, `test:storybook`, `publint`, `attw`, `check:bundle` y `npm pack --dry-run` (`@chroma-yesid/ui@0.1.0`).
- ⚠️ Las carpetas `node_modules/@yesid` vacías que quedan son residuos locales (ignorados por git); no afectan.
- Para publicar, el scope `@chroma-yesid` debe existir en npm como **organización** (ver `docs/pendientes.md`).

## 2026-10-18 — Tema oscuro en el simulador

- **Cómo:** `xcrun simctl ui booted appearance dark` cambia la apariencia del iPhone y Uniwind lo sigue (no hace falta tocar la app). Volver con `appearance light`. Para ver `Sheet` y `Dialog` ya abiertos se usó una story temporal con `open` fijo (`*.native.stories.tsx`, no se commitea); al correr Metro, `storybook.requires.ts` se regenera solo con esa story: **revertirlo antes de commitear**.
- **Resultado:** correcto en `Button` (Primary con el índigo claro del tema oscuro y texto oscuro, Secondary gris, Outline con borde sutil), `Table`, `Pagination`, `TextField` con error (salmón del token), `Sheet` y `Dialog` (el `Modal` hereda el tema).
- **No bug:** con el panel oculto (`onDeviceUI: false`) se ve un marco negro alrededor de la story; viene de ese modo de captura, no de la librería.
- **Límite:** `Select`, `Menu`, `Popover` y `Toast` se abren con su propio estado y no se pudieron abrir sin tocar la pantalla (el simulador corre sin ventana y `simctl` no simula toques). Para revisarlos hace falta abrir el Simulator con interfaz o añadir una story con estado abierto.

## 2026-10-18 — Los ayudantes de stories dejan de publicarse

- **Problema:** `DialogExample`, `SheetExample` y `ToastExample` vivían como `XExample.tsx` dentro de `src/`, así que `tsdown` los compilaba a `dist/` (había `SheetExample.d.ts` en el paquete). Son código solo de stories.
- **Decisión:** se renombran a `X.example.tsx` y `tsdown.config.ts` los excluye (`!src/**/*.example.tsx`), igual que `*.stories.tsx` y `*.test.tsx`. Siguen junto al componente (colocation, como recomienda Storybook). No hace falta ADR: no cambia la estructura de carpetas.
- **No se renombró** `x.variants.ts`: la minúscula es la convención de todo el repo.
- **Se descartó** crear subcarpetas `stories/` y `__tests__/`: obligaba a cambiar los globs de Storybook, imports y reglas de oxlint en +30 componentes por un beneficio solo visual.


## 2026-10-18 — Primera publicación a npm (`0.1.0`)

**Cómo se hizo:** organización `chroma-yesid` creada en npmjs.com, `npm login` en el navegador y, desde una terminal interactiva, `pnpm publish --access public --no-git-checks` en `packages/tokens` y luego en `packages/ui` (npm pide autenticación web/2FA en cada publicación: un agente sin terminal interactiva no puede hacerlo; falla con `ERR_PNPM_OTP_NON_INTERACTIVE`). Antes: `turbo run build --force` y `--dry-run` de ambos.

**Qué se vio en el registro:**
- Aparece una versión `0.0.0-stage` con `"stub": true`: es un marcador que npm/pnpm crea para reservar el nombre antes de la primera publicación. No contiene código y `latest` apunta a `0.1.0`.
- Justo después de publicar, `npm view` aún mostraba solo el marcador (propagación del registro): reintentar tras unos segundos antes de concluir que falló.
- ⚠️ El `dist` local estaba obsoleto (turbo restauró una build de caché con `DialogExample` ya renombrado): **antes de publicar a mano, `turbo run build --force`**.

**Bug encontrado al consumir el paquete (`0.1.0`):** `peerDependencies` con `catalog:` se publican como **versiones exactas** (`react: 19.3.0`…). Un proyecto con React 19.3.1 falla con `ERESOLVE`. `publint` y `attw` no lo detectan.
- Arreglo (`0.1.1`): rangos `>=19 <20`, `>=0.88 <1`, `>=15 <16`, y `packages/ui/scripts/check-peers.mjs` (`pnpm check:peers`, paso de CI) que falla si un peer es exacto o `catalog:`. Se comprobó que falla con el `package.json` anterior y pasa con el nuevo.
- Verificación como consumidor: proyecto vacío, `npm install` de los dos `.tgz` + `react@19.3.1`, y `renderToString` de `Pagination`, `Table`, `Skeleton` y `Button` (`nav`, `aria-current`, `<caption>` y clases semánticas presentes).
- Una versión publicada no se puede reutilizar: `0.1.0` queda con el defecto; los consumidores deben usar `>=0.1.1`. (Se puede marcar con `npm deprecate @chroma-yesid/ui@0.1.0 "peerDependencies exactos; usa >=0.1.1"` cuando salga la `0.1.1`.)

## 2026-10-18 — Release roto por una actualización de Dependabot

- Tras fusionar el PR de Dependabot (#2), `changesets/action` pasó a una versión con inputs renombrados (`publish` → `publish-script`, `version` → `version-script`) y Release falló al instante, antes de llegar a npm. Se corrigió `release.yml`.
- Lección: el CI del PR de Dependabot no ejercita `release.yml` (solo corre en `push` a `main`), así que ese tipo de ruptura no se ve hasta después de fusionar. Revisar a mano los PR de Dependabot que tocan acciones usadas solo en `main`.

## 2026-10-18 — Trusted publishing y publicación automática (`0.1.1`)

**Resultado:** `@chroma-yesid/tokens@0.1.1` y `@chroma-yesid/ui@0.1.1` publicados **por el workflow `release.yml`**, sin tokens guardados y con firma de procedencia. Verificado como consumidor: `npm install @chroma-yesid/ui@0.1.1 react@19.3.1 react-dom@19.3.1` sin `--force`, `npm audit signatures` (*16 packages have verified registry signatures / attestations*) y `renderToString` correcto. Se creó el tag y la release de GitHub de cada paquete (`@chroma-yesid/ui@0.1.1`, …).

**Cómo se configuró** (una sola vez, por paquete, tras la primera publicación manual): npmjs.com → paquete → *Settings* → *Trusted Publisher* → *GitHub Actions* con propietario `YesidCarrillo26`, repositorio `design-system`, workflow `release.yml` y entorno vacío. Alternativa por terminal: `npm trust github <paquete> --file release.yml --repo YesidCarrillo26/design-system --allow-publish -y` (pide 2FA).

**Trampas encontradas:**
- ⚠️ El formulario puede dejar solo el permiso **`npm stage publish`**. `changeset publish` hace un `npm publish` normal, así que hay que marcar **`npm publish`**. Se ve en la tarjeta como *Permissions*.
- *Pending validation* no se valida a mano: se resuelve con la primera publicación exitosa desde el workflow (hay un plazo, aquí hasta el 2026-10-20).
- ⚠️ El PR "Version Packages" lo abre el bot con `GITHUB_TOKEN` y **GitHub no ejecuta CI en esos PR**: queda `BLOCKED` porque falta el check obligatorio `verify`. Solución: `gh pr close <n> && gh pr reopen <n>` (lo dispara un usuario) y esperar los checks antes de fusionar.
- Tras publicar, `npm view` tarda segundos en mostrar la versión nueva (primero `tokens`, luego `ui`).
- `ui@0.1.1` depende de `tokens` con versión exacta (`0.1.1`, la que sustituye a `workspace:*`); está bien porque van juntos.

**Pendiente:** marcar `@chroma-yesid/ui@0.1.0` como obsoleta (peers exactos) con `npm deprecate` (requiere 2FA; no lo puede hacer un agente sin terminal interactiva).

## 2026-10-18 — Agentes remotos a demanda (issues → PR)

**Qué se añadió:** una base común para cualquier agente (sección *Modo remoto* de `AGENTS.md`, acción compuesta `.github/actions/preparar-entorno`, plantilla `tarea-agente.yml`) y el adaptador de Claude `.github/workflows/claude.yml` (etiqueta `claude` en un issue o `@claude` en un comentario). Decisión, límites y cómo sumar Codex: `docs/adr/0004-agentes-remotos.md`. Uso y checklist para otro agente: `docs/guia-paso-a-paso.md` §10b.

**Por qué la Action de Claude:** las *routines* de Claude Code solo se disparan con eventos de PR o release, no de issues. Y el PR tiene que salir con una identidad que dispare CI: la Action usa el token de la Claude GitHub App (no `GITHUB_TOKEN`), por eso **no** se le pasa `github_token`. En el código de la Action: `git-config.ts` limpia el `extraheader` de `actions/checkout` y deja `GH_TOKEN` con el token de la App.

**Trampas encontradas al prepararlo:**
- `gh api repos/<o>/<r>/git/ref/tags/v1` devuelve `type: tag` (tag **anotado**): su `sha` es el del tag, no el del commit. Para fijar por SHA hay que dereferenciarlo con `git/tags/<sha>`. Aquí `v1` y `v1.0.252` son el mismo commit (`f27be6b…`) y se fija la versión exacta.
- El prompt integrado de la Action manda a Claude **dejar un enlace "Create a PR"** y le dice que no puede rebasar. Se corrige con `--append-system-prompt` más `Bash(gh pr create:*)` en `--allowedTools`. **Por confirmar en el piloto.**
- Si se usa el input `prompt:`, la Action cambia de modo y pierde el contexto del issue; se deja en modo etiqueta/mención y las instrucciones van en `AGENTS.md`.
- La concurrencia a nivel de workflow dejaría que un evento descartado por el `if` (otra etiqueta) desplace a un `@claude` pendiente (un grupo admite una ejecución en curso y una pendiente, y la pendiente se reemplaza). Se pone a nivel de job. **Por confirmar en el piloto.**
- `dependabot.yml` con `directory: /` no mira las acciones compuestas de `.github/actions/*`; se añadió con `directories`.
- Validación local: sin `actionlint` ni Docker encendido, se usó `npx @action-validator/cli` (valida el esquema, **un archivo por ejecución**; no valida expresiones como el `fromJSON` del `if`). Se comprobó con un workflow roto que sí falla.

**Pendiente (lo hace una persona):** instalar la Claude GitHub App, guardar `CLAUDE_CODE_OAUTH_TOKEN`, crear las etiquetas y correr el piloto (ver la guía §10b y la verificación del ADR).
