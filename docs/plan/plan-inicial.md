> **Plan inicial** (aprobado el 2026-10-17), copiado tal cual desde la planificación. Lo que cambió al ejecutarlo está en la bitácora (`docs/learning/`) y en los ADRs (`docs/adr/`).
>
> ## Estado por fase
>
> | Fase | Estado | Bitácora |
> |---|---|---|
> | 0. Fundaciones | ✅ | [fase-0-1](../learning/fase-0-1.md) |
> | 1. Esqueleto multiplataforma | ✅ | [fase-0-1](../learning/fase-0-1.md) |
> | 2. Build y distribución | ✅ (falta publicar a npm) | [fase-2](../learning/fase-2.md) |
> | 3. Tokens completos + Foundations | ✅ | [fase-3](../learning/fase-3.md) |
> | 4. Primitivos + testing | ✅ (falta el token de Chromatic) | [fase-4](../learning/fase-4.md) |
> | 5. Formularios | ✅ (hechos a mano, sin librería headless) | [fase-5](../learning/fase-5.md) |
> | 6. Overlays y feedback | ✅ (Sheet native con `Modal`, no gorhom) | [fase-6](../learning/fase-6.md) |
> | 7. Patrones + Taskbox | ✅ | [fase-7](../learning/fase-7.md) |
> | 8. Native en el navegador | ✅ | [fase-8](../learning/fase-8.md) |
> | 9+ | pendientes | — |
>
> Qué falta: [pendientes](../pendientes.md). Guía de lo construido: [guia-paso-a-paso](../guia-paso-a-paso.md).
>
> ### Desviaciones del plan
>
> - **TypeScript 6.0**, no 7: TS 7 ya es el `latest`, pero falta comprobar `moduleSuffixes`.
> - `titlePrefix` también se aplica a títulos explícitos (el plan suponía que no).
> - Fase 6: Base UI en web; `Sheet` native con `Modal` en lugar de `@gorhom/bottom-sheet`.
> - Fase 5 sin librería headless: elementos nativos del DOM en web y `Pressable` con roles en native.
> - Los tokens se generan con un script propio sobre Style Dictionary (resuelve referencias), no con sus formats, porque cada salida mezcla temas.

---

# Plan: Design System multiplataforma con Storybook (web + mobile)

## Contexto

Quieres un sistema de componentes reutilizable en tus proyectos personales (web y mobile) que además te sirva para dominar Storybook con los estándares actuales (octubre 2026: Storybook 10.6, React 19.2, Vite 8, TypeScript 6, Expo 58).

**Referencias revisadas:**
- `References/Github/Building-UI-Components-with-Storybook…` (curso de Packt):
  - Storybook 7.5, JavaScript, React 18.
  - El Taskbox usa Redux con un mock store escrito a mano, MSW 1, play functions sin `expect`, test-runner y Chromatic.
  - **Ojo:** tiene un token de Chromatic hardcodeado en `package.json`. Rótalo y no repitas ese patrón.
  - Se toma como base pedagógica y se moderniza todo: `storybook/test`, `fn()`, MSW 2 con `mswLoader`, `addon-vitest`, un `makeStore()` en lugar del mock store y `sb.mock`.
- `References/Storybook`:
  - Un `storybook init` limpio con Storybook 10.6, Vite 8, React 19, TypeScript 6, oxlint y pnpm.
  - Se toma como base de configuración: `.storybook/main.ts`, `preview.tsx`, el setup de vitest y `.oxlintrc.json`.

**Decisiones tomadas:**
1. **Enfoque híbrido por plataforma.**
   - Se comparten tokens, contratos de props, variantes, lógica y stories.
   - Cada componente tiene `X.web.tsx` (React DOM puro) y `X.native.tsx` (React Native).
   - La web **no** depende de react-native-web.
2. **Web agnóstica del framework.** Se valida contra Next.js (SSR/RSC), que es el caso más estricto, y contra Vite. Mobile con Expo.
3. **Tailwind v4 en web + Uniwind en native.** Ambos usan el mismo tema generado desde los tokens, y las variantes se comparten con `tailwind-variants`.
4. **pnpm workspaces + Turborepo.** Distribución: primero paquetes npm con Changesets; después, un registro estilo shadcn.

**Alcance de la ejecución:** al aprobar este plan ejecuto la **Fase 0 y la Fase 1** (el esqueleto que resuelve los riesgos técnicos). Cada fase siguiente se revisa y aprueba por separado. El repo nuevo vive en `/Users/yesidcarrillo/Documents/Personal/Proyects/design-system`, con scope npm `@chroma-yesid`, que es provisional: confirmo que esté libre en la Fase 0. Las carpetas `References/` no se tocan.

---

## 1. Estructura del monorepo

```
design-system/
├─ apps/
│  ├─ storybook-web/        Storybook principal (@storybook/react-vite): docs, tests, visual, MCP
│  │  ├─ .storybook/        main.ts preview.tsx preview.css manager.ts theme.ts modes.ts vitest.setup.ts
│  │  ├─ docs/              Introduction, GettingStarted, foundations/*, guidelines/*, Changelog (MDX) + blocks/*.tsx
│  │  └─ vite.config.ts  vitest.config.ts
│  ├─ storybook-native/     App Expo con @storybook/react-native (on-device) + Jest
│  │  └─ .rnstorybook/  src/global.css  metro.config.js  jest.config.js
│  └─ storybook-native-web/ (Fase 8) implementaciones nativas en el navegador vía RNW
├─ packages/
│  ├─ tokens/   @chroma-yesid/tokens  tokens/{primitives,semantic/{light,dark}}/*.json (DTCG) + sd/build.ts
│  └─ ui/       @chroma-yesid/ui      src/{components,patterns,lib}  styles/{web,native}.css  tsdown.config.ts
├─ tooling/typescript/        @chroma-yesid/tsconfig: base / web / native / next / vite
├─ examples/  next-app  vite-app  expo-app  taskbox
├─ docs/adr/  docs/learning/  (ADRs + bitácora de aprendizaje por fase)
├─ .changeset/  .github/workflows/{ci,chromatic,release,storybook-deploy}.yml
└─ pnpm-workspace.yaml  turbo.json  .oxlintrc.json  CLAUDE.md  AGENTS.md  .mcp.json  .nvmrc
```

**`pnpm-workspace.yaml`**
- `nodeLinker: hoisted` desde el día 1. Uniwind declara como peers piezas internas de Metro, y con instalación aislada puede resolver un Metro distinto al de Expo. Expo con pnpm también usa hoisted por defecto.
- La rigurosidad que se pierde se compensa con `knip`, `publint`, `attw` y apps de ejemplo que consumen el `dist`.
- **Catalogs** para `react`, `react-native`, `storybook`/`@storybook/*`, `tailwindcss`, `uniwind`, `vite`, `typescript` y `vitest`. **La versión de React la dicta Expo** (se fija con `npx expo install --check`) y se usa igual en todas partes.

**`turbo.json`**
- `build` depende de `^build`.
- `storybook`, `build-storybook`, `typecheck`, `test:storybook` y `test:native` dependen solo de `@chroma-yesid/tokens#build`, porque los Storybooks leen `packages/ui/src` directamente.
- Los `examples/*` dependen de `^build`: consumen el `dist` a propósito.

**TypeScript con `moduleSuffixes` y una configuración raíz por referencias (solution-style)**
- `tooling/typescript/web.json`: `moduleSuffixes: [".web", ""]` y `lib` con DOM.
- `native.json`: `moduleSuffixes: [".native", ""]`, `customConditions: ["react-native"]` y los tipos de Uniwind.
- En `packages/ui`:
  - `tsconfig.web.json` excluye `src/**/*.native.*`.
  - `tsconfig.native.json` excluye `src/**/*.web.*`.
  - `tsconfig.json` es `{ files: [], references: [web, native] }` y se valida con `tsc -b`.
- **Resultado:** los archivos compartidos (tipos, variantes, stories) se verifican **dos veces**. Si las props web y native divergen, falla el typecheck. Ese es el guardián de paridad.
- `verbatimModuleSyntax: true`, para que las stories compartidas usen `import type` y Metro nunca empaquete tipos de Storybook web.

**Fronteras de arquitectura con `overrides` de oxlint**
- `*.web.*` no puede importar `react-native` ni `uniwind`.
- `*.native.*` no puede usar `react-dom`, `window` ni `document`.
- Los archivos compartidos no pueden importar `react-native` ni `react-dom`. De `storybook/test` solo pueden importar `fn`.

---

## 2. Anatomía de un componente y su "Definition of Done"

```
packages/ui/src/components/Button/
  Button.types.ts           contrato compartido (JSDoc → autodocs); evento onPress en ambas plataformas
  button.variants.ts        tv() compartido: solo clases válidas en ambas (sin hover:, sin grid)
  useButton.ts              lógica compartida opcional
  Button.web.tsx            <button>; extiende variantes con hover:/focus-visible:; "use client" solo si usa hooks
  Button.native.tsx         <Pressable>; extiende variantes con active:
  Button.stories.tsx        stories COMPARTIDAS (CSF3, tipos de @storybook/react, args: { onPress: fn() })
  Button.web.stories.tsx    solo web: play functions, teclado, casos a11y (tags: web-only, !autodocs)
  Button.native.stories.tsx solo native (opcional: gestos, haptics)
  Button.native.test.tsx    Jest + React Native Testing Library + composeStories (portable stories)
  Button.mdx                solo en componentes insignia (Canvas, Controls, Do/Don't)
  index.ts
```

**Globs de stories**
- Storybook web: `**/!(*.native).stories.tsx` + `**/*.mdx`.
- Storybook native: `**/!(*.web).stories.tsx`.
- Ambos con `titlePrefix: 'Components'`, así los títulos y los IDs coinciden entre plataformas.
- Fallback si el extglob falla: renombrar las compartidas a `*.shared.stories.tsx`.

**Definition of Done por componente**
1. Contrato con JSDoc.
2. Variantes compartidas y las dos implementaciones.
3. Stories compartidas que cubren todos los estados.
4. Tests de interacción web (clic, teclado, disabled, foco).
5. a11y en modo `error`, en tema claro y oscuro.
6. Test Jest native.
7. Se ve correctamente en el dispositivo.
8. Baselines de Chromatic aceptados.
9. `tsc -b` y oxlint en verde.
10. Documentación.
11. `parameters.platforms` con el estado por plataforma.
12. Un changeset.

Un generador `turbo gen component` crea todo el andamiaje.

---

## 3. Pipeline de tokens (Style Dictionary 5, formato DTCG)

- **Fuente:** valores hex/rgb con **nombres semánticos compatibles con shadcn** (`background`, `foreground`, `primary`, `muted`, `border`, `ring`, `destructive`…). Así el registro shadcn futuro sale casi gratis.
- **Salidas** (`packages/tokens/sd/build.ts`, con formatos propios):
  - `dist/web.css`:
    - `@theme` de Tailwind v4.
    - `@custom-variant dark` sobre `[data-theme=dark]`.
    - Variables `--ds-*` por tema.
  - `dist/native.css`:
    - `@theme` + `@layer theme { :root { @variant light/dark/ios/android {…} } }` para Uniwind.
    - Las variantes `ios`/`android` permiten fuentes distintas por plataforma.
  - `dist/index.js`: constantes TS `as const`. Se usan para el branding del manager, colores de SVG/ActivityIndicator y Reanimated.
  - `dist/tw-merge.js`: configuración de `twMergeConfig`. **Evita un bug real:** sin ella, tailwind-merge trata `text-body-md` (tamaño) y `text-foreground` (color) como el mismo grupo y descarta una de las dos.
  - `dist/tokens.json`: alimenta los doc blocks de Foundations.

**Escaneo de clases (`@source`)**
- Cada Storybook declara `@source` hacia `packages/ui/src` y excluye los archivos de la otra plataforma con `@source not`.
- El paquete publicado expone `@chroma-yesid/ui/web.css` y `@chroma-yesid/ui/native.css`, que importan los tokens y declaran `@source` sobre su propio `dist`. El consumidor solo escribe `@import '@chroma-yesid/ui/web.css'`.
- Si Uniwind no respeta un `@source` anidado, el fallback documentado es que el consumidor escriba el `@source` hacia `node_modules/@chroma-yesid/ui/dist/native`.

---

## 4. Storybook web (`apps/storybook-web`) — "sacar todo el jugo"

- **Framework:** `@storybook/react-vite`.
  - En `vite.config.ts`: `resolve.extensions` con `.web.tsx` primero, `@tailwindcss/vite` y `@vitejs/plugin-react`.
  - Docgen con `react-docgen-typescript` y un `propFilter` que deja fuera las props que vienen de `node_modules`.
- **Addons:**
  - `addon-docs`, `addon-a11y`, `addon-vitest`.
  - `addon-themes` (`withThemeByDataAttribute`).
  - `addon-designs` (Figma), `storybook-addon-pseudo-states`.
  - `@chromatic-com/storybook`, `@storybook/addon-mcp`.
  - Controls, actions, viewport, backgrounds, interactions, measure y outline ya vienen en el core.
- **`preview.tsx`:**
  - Decorador de tema y superficie `bg-background`.
  - `tags: ['autodocs']`.
  - `loaders: [mswLoader]`.
  - `a11y.test: 'error'` global.
  - Viewports definidos desde los tokens de breakpoints.
  - `chromatic.modes` para claro/oscuro × móvil/escritorio.
  - `storySort`: Introduction → Getting Started → Foundations → Guidelines → Components → Patterns → Changelog.
  - `sb.mock` para fechas e IDs deterministas.
- **Estrategia de tags:**
  - `autodocs` / `!autodocs`.
  - `!dev` para stories que solo son de test; `!test` para stories pesadas de documentación.
  - `web-only` / `native-only`.
  - `status:experimental|beta|stable|deprecated`, para filtrar en el sidebar.
- **Manager con tu marca:** `manager.ts` + `theme.ts` usando `create()` de `storybook/theming`, con valores de `@chroma-yesid/tokens`.
- **Documentación MDX:**
  - Foundations: `ColorPalette`, `Typeset`, `IconGallery` y un `TokenTable` propio, alimentados por `tokens.json`.
  - Guidelines: accesibilidad, reglas multiplataforma, theming y contribución (la DoD).
  - Changelog renderizado desde `CHANGELOG.md`.
- **Testing:**
  - `addon-vitest` en modo navegador (Playwright/Chromium): cada story es un test.
  - a11y con axe; coverage con `@vitest/coverage-v8`.
  - Visual con Chromatic, usando TurboSnap y modes.
- **IA:**
  - `addon-mcp` expone `/mcp` y se registra en `.mcp.json`.
  - Las instrucciones recomendadas por Storybook van en `CLAUDE.md`/`AGENTS.md`, para que Claude Code consulte el sistema real en vez de inventar props.
  - Se activa el flag `features.experimentalCodeExamples`.

---

## 5. Storybook native (`apps/storybook-native`)

- **`metro.config.js`:** `withUniwindConfig(withStorybook(getDefaultConfig(__dirname), { enabled: true }), { cssEntryFile: './src/global.css' })`.
  - Expo configura `watchFolders` del monorepo automáticamente.
  - Hay que verificar el orden de los wrappers.
- **`.rnstorybook/main.ts`:** el glob de §2 y `deviceAddons` (controls, actions, backgrounds, notes).
- **`preview.tsx`:** decorador `View className="flex-1 bg-background p-4"`.
- **Activar Storybook dentro de una app real** (`examples/expo-app`): con `EXPO_PUBLIC_STORYBOOK_ENABLED=true`. Así Storybook queda fuera del bundle de producción.
- **Portable stories en Jest:**
  - Preset `jest-expo`, `setProjectAnnotations(preview)` y `composeStories` + RNTL.
  - Riesgo: Storybook 10 es solo ESM y Jest puede no transformarlo. Se resuelve con `transformIgnorePatterns`, o con un shim de `fn`.
- **Smoke test en CI sin dispositivo:** `npx expo export -p ios`.

---

## 6. Build y publicación del paquete (tsdown)

**`packages/ui/tsdown.config.ts`: un array con dos builds**
- `dist/web` resuelve `.web.tsx` primero.
- `dist/native` resuelve `.native.tsx` primero.
- Ambos con `format: esm`, `unbundle: true` (conserva `"use client"` por archivo y el tree-shaking), las dependencias como externas, y `.d.ts` generados con el tsconfig de cada plataforma.

**`exports` escritos a mano**
- `"react-native"` → `dist/native`.
- `"default"` → `dist/web`.
- En cada condición, `types` primero.
- Además: `./web.css`, `./native.css`, `sideEffects: ["**/*.css"]` y `publishConfig.provenance`.

**Fallback de bajo riesgo:** también se publica `src`. Si el build native da problemas, la condición `react-native` puede apuntar a `src/index.ts`, que Metro transpila sin problema.

**Verificaciones del build**
- `publint` y `attw --pack`.
- `"use client"` en la primera línea de los archivos web interactivos.
- Cero `react-native` en `.next/static` de la app Next.

---

## 7. Apps de ejemplo, Taskbox y composición

- **`examples/next-app`** (App Router, `next-themes` con `data-theme`):
  - Una página Server Component con una isla cliente.
  - Es la prueba de que la web no necesita RNW.
- **`examples/vite-app`** y **`examples/expo-app`** (Expo Router): consumen el `dist` real.
- **`examples/taskbox`:** el curso modernizado.
  - Vite + TypeScript + React 19 + Redux Toolkit 2.
  - `makeStore(preloadedState)` en un decorador, en lugar del mock store duplicado.
  - MSW 2 (`http.get` + `HttpResponse.json`) con stories Default, Loading, Error y Empty.
  - `sb.mock` para el reloj.
  - Tests de pantalla con `expect`.
  - **Composición:** su `.storybook` referencia el Storybook publicado del DS con `refs`. Es el mismo patrón que usarás en cada proyecto personal futuro.

---

## 8. CI/CD (GitHub Actions)

- **`ci.yml`:** oxlint, `turbo typecheck build`, `publint`/`attw`, `test:storybook` (las fallas de a11y rompen el job), `test:native`, `expo export` (smoke), `next build` + grep de `react-native`, y `knip`.
- **`chromatic.yml`:** `fetch-depth: 0`, token **solo** desde `secrets`, `onlyChanged`, `exitZeroOnChanges`, `autoAcceptChanges: main`.
- **`release.yml`:**
  - `changesets/action` con `pnpm release`, que hace build de los paquetes y `changeset publish`.
  - Publicación con provenance y trusted publishing (OIDC). El primer `0.0.1` se publica manualmente.
  - Fallback: un `NPM_TOKEN` granular.
- **`storybook-deploy.yml`:** GitHub Pages, que da una URL pública estable para `refs` y la documentación.

---

## 9. Roadmap por fases (entregables + qué aprendes de Storybook)

| Fase | Entregables | Conceptos de Storybook que aprendes |
|---|---|---|
| **0. Fundaciones** | Workspace (hoisted + catalogs), Turbo, tsconfigs, fronteras en oxlint, Changesets, esqueleto de CI, ADRs 0001–0003, `CLAUDE.md`, scope npm | Arquitectura: manager vs iframe de preview; builder vs framework vs renderer; indexers e `index.json` |
| **1. Esqueleto multiplataforma** (riesgo primero) | Tokens mínimos (4 colores claro/oscuro, spacing, radius); `Text`, `Stack` y `Button` en web y native; los dos Storybooks corriendo; 1 test Jest | CSF3 (meta, args, argTypes, `fn`), autotitle y specifiers, globs, tipos de renderer, arquitectura on-device (`storybook.requires.ts`) |
| **2. Build y distribución** | Doble build con tsdown, `exports`, CSS publicables, `next-app`/`vite-app`/`expo-app`, dry-run de release, publicación de `0.0.1` | Storybook como entorno de desarrollo vs como artefacto publicado |
| **3. Tokens completos + Foundations** | Set DTCG completo (tipografía por plataforma, elevación, motion, breakpoints), docs de Foundations, manager con tu marca, addon-themes, viewports desde tokens | MDX, Doc Blocks, docs desacopladas, globals y toolbars, decoradores globales, herencia de parámetros, theming API |
| **4. Primitivos + testing completo → `0.1.0`** | Box, Heading, Icon, IconButton, Spinner, Badge, Avatar, Card, Divider, Link; addon-vitest + a11y `error` + coverage; Chromatic + modes; MCP; designs; pseudo-states | Controles avanzados (`if`, `mapping`, `subcomponents`), play functions (`step`, `mount`, `beforeEach`), test widget, Chromatic (UI Review, TurboSnap), flujo con MCP |
| **5. Formularios** | Field, TextField, TextArea, Checkbox, Radio, Switch, Select. Decisión: headless web (Base UI/Radix) vs `@rn-primitives` en native | `useArgs` y stories con estado, loaders, tests de teclado complejos, etiquetado a11y |
| **6. Overlays y feedback** | Dialog, Sheet (`@gorhom/bottom-sheet`), Popover/Tooltip, Toast, Tabs, Accordion, Menu | Portales en docs (`docs.story.inline`), queries sobre `document.body`, animaciones en Chromatic, divergencia de plataforma documentada |
| **7. Patrones + Taskbox** | EmptyState, ListItem, PageHeader en `ui/patterns`; Taskbox modernizado | Decoradores de providers por story, MSW por story, `sb.mock`/`mocked`, tests de pantalla, **composición con `refs`** |
| **8. Native en el navegador** | Tercer Storybook (`@storybook/react-native-web-vite`) con un plugin de Vite que prefiere `.native.tsx` solo para `packages/ui`, compuesto en el web con `refs` | Frameworks alternativos, plugins de builder, composición en dev y en prod |
| **9+. Futuro** | Registro shadcn (`registry.json`); addon propio **"Platform Parity"** (panel que lee `parameters.platforms`); migración a CSF Next (primero las stories web-only); i18n/RTL; motion; Figma Code Connect; paquete de iconos; multi-marca; spike de react-strict-dom | Crear addons (presets, channels, `useParameter`, status API), CSF Next (`preview.meta`, `.test()`), indexers personalizados |
| **10. Siguiente nivel visual** (hecha: ver `docs/learning/fase-10.md`) | Dirección "neutral preciso" (referencias de Mobbin): tokens de superficies, estados y tipografía; mejoras a componentes; Alert, Progress, Chip, SegmentedControl, OtpInput, Combobox; patrones SettingsGroup, StatCard, OnboardingStep; CommandPalette; animación de overlays; `Table` con orden y selección. Un PR por fase | Tokens con tests de contraste, utilidades generadas por Tailwind/Uniwind, animación en overlays, composición de patrones sobre primitivos |

---

## 10. Riesgos principales y cómo se reducen

1. **Metro + pnpm + peers de Uniwind:** `nodeLinker: hoisted` y un smoke test con `expo export` en la Fase 1.
2. **Que los `.d.ts` de cada plataforma apunten a archivos inexistentes:** `attw` y un `tsc` en un consumidor real en la Fase 2. Fallback: quitar el sufijo del nombre de salida.
3. **Que Uniwind no estilice el DS desde `node_modules`:** se prueba en `expo-app` en la Fase 2.
4. **Storybook 10 (solo ESM) bajo Jest:** `transformIgnorePatterns` o un shim.
5. **Extglob en el `require.context` de React Native:** fallback a `*.shared.stories.tsx`.
6. **Colisiones de tailwind-merge con nombres de tokens propios:** se genera `twMergeConfig` y se cubre con un unit test.
7. **Compatibilidad de Expo SDK 58 con Storybook RN 10.7:** fallback al SDK 57.
8. **pseudo-states con Tailwind v4:** fallback a stories con `userEvent.hover`/`tab` capturadas por Chromatic.

---

## Verificación end-to-end

**Fases 0 y 1, lo que ejecuto tras aprobar:**
1. `pnpm install && pnpm lint && pnpm turbo run typecheck` en verde.
2. Detector de paridad: cambio a propósito una prop en `Button.native.tsx` y `pnpm --filter @chroma-yesid/ui typecheck` debe fallar; luego lo revierto.
3. `pnpm --filter @chroma-yesid/storybook-web storybook`. En `localhost:6006/index.json` no puede aparecer ningún `importPath` con `.native`.
4. Botón con estilos en tema claro y oscuro (toolbar). Lo capturo con un navegador automatizado.
5. `pnpm --filter @chroma-yesid/storybook-web test:storybook` pasa, con a11y incluido.
6. `cd apps/storybook-native && EXPO_PUBLIC_STORYBOOK_ENABLED=true npx expo export -p ios` termina sin errores.
7. `pnpm --filter @chroma-yesid/storybook-native test:native` pasa (portable stories).
8. **Lo verificas tú en el simulador:** abrir la app con `pnpm --filter @chroma-yesid/storybook-native ios`. El Button debe verse con estilos; si sale sin estilos, el `@source` o Uniwind están mal.

**Fases siguientes:** cada una trae sus comandos de verificación. Por ejemplo, `publint`/`attw`, `next build` + grep, el check de Chromatic en el PR y `npm view @chroma-yesid/ui dist.attestations`.

## Archivos críticos

- `packages/tokens/sd/build.ts`
- `packages/ui/tsconfig.json`, `tsconfig.web.json` y `tsconfig.native.json`
- `packages/ui/tsdown.config.ts` y `packages/ui/package.json` (los `exports`)
- `apps/storybook-web/.storybook/main.ts`, `preview.tsx` y `vite.config.ts`
- `apps/storybook-native/metro.config.js` y `.rnstorybook/main.ts`
- `pnpm-workspace.yaml`, `turbo.json` y `.oxlintrc.json`
- Base reutilizable:
  - `References/Storybook/.storybook/main.ts`, `preview.tsx` y `.oxlintrc.json`.
  - El Taskbox del curso: `Section 7/taskbox/src/components/*` y `src/lib/store.js`, para portarlos modernizados.
