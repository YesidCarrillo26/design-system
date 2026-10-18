# Guía paso a paso: cómo se construyó este Storybook

Esta guía reconstruye, en el orden real, cómo se creó el design system multiplataforma (web + React Native) con Storybook 10: qué se hizo, con qué tecnología, con qué comandos y **por qué**. Sirve para entenderlo y para repasarlo.

> Para el detalle de cada fase y sus sorpresas: `docs/learning/`. Para decisiones: `docs/adr/`. Para errores: `docs/learning/errores-y-soluciones.md`.

---

## 0. Mapa de tecnologías

| Pieza | Tecnología (versión) | Para qué | Por qué esta |
|---|---|---|---|
| Gestor de paquetes | **pnpm 12** (workspaces + catalogs) | Un repo con varios paquetes y versiones únicas | Rápido, seguro (bloquea scripts de build sin aprobar) |
| Orquestador | **Turborepo 2** | Ejecuta tareas en orden y con caché | Entiende dependencias entre paquetes |
| Lenguaje | **TypeScript 6** | Tipos, y el "guardián de paridad" web/native | TS 7 aún sin verificar con `moduleSuffixes` |
| Tokens | **Style Dictionary 5** + formato **DTCG** | Una fuente de colores/tamaños para todas las plataformas | Estándar abierto de tokens |
| Estilos web | **Tailwind CSS 4** | Clases utilitarias + tema desde tokens | Tema por variables CSS |
| Estilos native | **Uniwind 1** | Las mismas clases de Tailwind en React Native | Resuelve estilos en build, sin runtime pesado |
| Variantes | **tailwind-variants 3** + **tailwind-merge 3** | Definir variantes una vez y compartirlas | Funciona igual en web y native |
| Componentes | **React 19.3** (web) y **React Native 0.88** + **Expo 58** | Las dos implementaciones | React lo fija Expo |
| Overlays web | **Base UI 1.9** | Foco atrapado, flotantes, teclado | Sin estilos: usa los nuestros |
| Storybook web | **Storybook 10.6** (`@storybook/react-vite`) | Catálogo, docs y pruebas | Estándar actual |
| Storybook native | **@storybook/react-native 10.7** | Ver los componentes en el dispositivo | Mismas stories |
| Pruebas web | **Vitest 5** + **Playwright** + `addon-vitest` | Cada story = un test en navegador real | Interacción y a11y |
| Accesibilidad | `addon-a11y` (**axe-core**) | Fallar si hay violaciones | Se ejecuta en cada story |
| Pruebas native | **Jest 30** + **jest-expo** + **RNTL 14** | Probar la versión native sin dispositivo | Reutiliza las stories (portable stories) |
| Red simulada | **MSW 3** + `msw-storybook-addon` 3 | Respuestas de API por story | Escenarios de carga/error |
| Estado (ejemplo) | **Redux Toolkit 2** + react-redux 9 | Taskbox | `makeStore(preloadedState)` |
| Build del paquete | **tsdown** | Compilar `dist/web` y `dist/native` | Dos builds con `exports` condicionales |
| Calidad del paquete | **publint**, **attw** | Verificar `exports` y tipos | Evita paquetes rotos |
| Lint | **oxlint** | Reglas + fronteras entre plataformas | Muy rápido |
| Versionado | **Changesets** | Versiones y changelog | Pensado para monorepos |
| CI | **GitHub Actions** (acciones fijadas por SHA) | Verificar y publicar | |
| Visual | **Chromatic** | Regresión visual | Necesita token (pendiente) |

**Requisitos locales:** Node 24 (`.nvmrc`), pnpm 12, Xcode con simulador (opcional, para ver native), `gh` autenticado para subir al repo.

---

## 1. El monorepo

**Idea:** un repositorio con varios paquetes que se versionan y prueban juntos.

```sh
mkdir design-system && cd design-system
git init -b main
```

Estructura (carpetas que se fueron creando):

```
apps/        storybook-web  storybook-native
packages/    tokens  ui
tooling/     typescript          # tsconfig compartidos
examples/    next-app  vite-app  expo-app  taskbox
docs/        adr  learning  plan
```

Archivos clave de la raíz:

- **`pnpm-workspace.yaml`**: lista los paquetes, fija **`nodeLinker: hoisted`** (Uniwind necesita un único Metro) y define el **catálogo** de versiones (`catalog:`). Así `react`, `storybook`, `tailwindcss`… tienen una sola versión en todo el repo. **React lo dicta Expo SDK**, no npm.
- **`turbo.json`**: tareas (`build`, `typecheck`, `test:*`). Toda tarea que use otro paquete del workspace depende de `^build` (si no, la caché da resultados viejos).
- **`.oxlintrc.json`**: reglas de lint, y **fronteras**: `*.web.*` no importa `react-native`; `*.native.*` no importa `react-dom`; los archivos compartidos no importan ninguno.
- **`.changeset/`**, **`.github/workflows/`**, **`AGENTS.md`** (reglas del proyecto).

```sh
pnpm install
pnpm turbo run typecheck
```

**TypeScript con dos mundos** (`tooling/typescript`): `web.json` usa `moduleSuffixes: [".web", ""]` y `native.json` usa `[".native", ""]`. Así `import './Button'` resuelve a `Button.web.tsx` o `Button.native.tsx` según el programa que compila.

---

## 2. Tokens de diseño (`packages/tokens`)

**Idea:** colores, radios, sombras, textos… definidos **una vez** en JSON y generados para cada plataforma.

1. **Fuente** (`tokens/`): `primitives/` (paleta cruda), `semantic/light|dark/` (roles: `background`, `primary`…), `shared/` (radios, texto, sombra, movimiento, breakpoints, fuentes). Las referencias se escriben `{color.neutral.950}`.
2. **Generador** `sd/build.ts` (Node 24 ejecuta TS directo): Style Dictionary resuelve referencias y el script escribe:
   - `dist/web.css` → `@theme` de Tailwind v4 + variables `--ds-*` por tema (`[data-theme="dark"]`).
   - `dist/native.css` → `@layer theme { :root { @variant light/dark/ios/android … } }` para Uniwind.
   - `dist/index.js|d.ts` → constantes TS (`colors`, `radius`, `text`, `shadow`, `breakpoint`…).
   - `dist/tokens.json` → alimenta las páginas de Foundations.
   - `dist/tw-merge.js` → configuración para que `tailwind-merge` entienda `text-body-md` como tamaño y no como color.
3. **Prueba:** `sd/tw-merge.test.ts` demuestra el bug y su corrección.

```sh
pnpm --filter @chroma-yesid/tokens build        # regenerar dist/
pnpm --filter @chroma-yesid/tokens test:unit    # node --test
```

> Regla: nunca edites `dist/`. Cambia el JSON y reconstruye. Los valores de color deben cumplir contraste AA (la suite de a11y lo comprueba).

---

## 3. El paquete de componentes (`packages/ui`)

### Anatomía de un componente

```
components/Button/
  Button.types.ts           contrato compartido (JSDoc → autodocs)
  button.variants.ts        variantes con tailwind-variants (solo clases válidas en ambas plataformas)
  Button.web.tsx            <button> + hover/focus-visible
  Button.native.tsx         <Pressable> + active
  Button.stories.tsx        stories COMPARTIDAS (solo importa `fn` de storybook/test)
  Button.web.stories.tsx    stories SOLO WEB con `play` (teclado, DOM)
  Button.native.test.tsx    Jest + RNTL reutilizando las stories
  index.ts
```

### Por qué así (decisión híbrida)

Se comparte lo que no es render (tokens, contrato, variantes, lógica, stories) y cada plataforma renderiza con su elemento real. **No** se usa react-native-web en las apps web.

### El guardián de paridad

`packages/ui` tiene tres tsconfig: `tsconfig.web.json` (excluye `*.native.*`), `tsconfig.native.json` (excluye `*.web.*`) y `tsconfig.json` (solo `references`). Los archivos compartidos se compilan **dos veces**: si una prop existe solo en una plataforma, falla `tsc -b`.

```sh
pnpm --filter @chroma-yesid/ui typecheck        # tsc -b
```

### Variantes con `slots`

React Native no hereda el color de texto del contenedor, así que el botón define dos slots: `root` y `label`. En web se aplican al mismo `<button>`; en native, `root` al `Pressable` y `label` a un `<Text>`.

### Los primitivos (en orden)

Fase 1: `Text`, `Stack`, `Button` · Fase 4: `Box`, `Heading`, `Icon`, `IconButton`, `Spinner`, `Badge`, `Avatar`, `Card`, `Divider`, `Link` · Fase 5: `Field`, `TextField`, `TextArea`, `Checkbox`, `RadioGroup`, `Switch`, `Select` · Fase 6: `Dialog`, `Sheet`, `Popover`, `Menu`, `Tooltip`, `Tabs`, `Accordion`, `Toast` · Fase 7: patrones `EmptyState`, `ListItem`, `PageHeader` (un solo archivo, sin sufijos).

Lo compartido entre implementaciones: `useControllableState` (controlado/no controlado), `useAvatar`, `useToastQueue`, y `useTokenColor.native` (colores reales para SVG y spinner en native).

---

## 4. Storybook web (`apps/storybook-web`)

No se usó `storybook init`: se configuró a mano para entender cada pieza.

```sh
pnpm add -D storybook @storybook/react-vite @storybook/addon-docs @storybook/addon-a11y \
  @storybook/addon-vitest @storybook/addon-themes vite @vitejs/plugin-react tailwindcss @tailwindcss/vite
```
*(En el repo van por `catalog:`.)*

| Archivo | Qué hace |
|---|---|
| `vite.config.ts` | Plugins de React y Tailwind; **`resolve.extensions` con `.web.tsx` primero** (así `./Button` → `Button.web.tsx`) |
| `.storybook/main.ts` | `framework`, `addons` y `stories` con **specifiers** `{ directory, titlePrefix, files }`; el glob `!(*.native)` excluye stories native |
| `.storybook/preview.tsx` | Decorador de tema (`withThemeByDataAttribute`), `tags: ['autodocs']`, `a11y.test: 'error'`, viewports desde los tokens, `storySort` |
| `.storybook/preview.css` | `@import 'tailwindcss'; @import '@chroma-yesid/tokens/web.css'; @source …` (Tailwind solo escanea el proyecto actual) |
| `.storybook/manager.ts` + `theme.ts` | Marca del panel lateral con colores de los tokens |
| `docs/*.mdx` | Introduction, Foundations (Colors, Typography…), Guidelines |

```sh
pnpm storybook                                   # http://localhost:6006
pnpm --filter @chroma-yesid/storybook-web build-storybook
```

**Docs automáticas:** `typescript.reactDocgen: 'react-docgen-typescript'` lee los JSDoc de `X.types.ts`.

---

## 5. Pruebas (todo se prueba con las stories)

**Idea:** cada story es un test (render + `play` + accesibilidad).

- `vitest.config.ts` con el plugin `storybookTest` y **modo navegador** (Playwright/Chromium).
- `a11y.test: 'error'`: una violación de axe hace fallar la story. Se corre en **claro y oscuro** (`VITE_SB_THEME=dark`).
- Cobertura con `@vitest/coverage-v8` (`allowExternal: true`, porque el código está fuera de la raíz).

```sh
npx playwright install chromium                  # una sola vez
pnpm --filter @chroma-yesid/storybook-web test:storybook  # claro y luego oscuro
pnpm --filter @chroma-yesid/storybook-web test:coverage
```

**Cómo escribir un `play`** (archivo `X.web.stories.tsx`):

```tsx
export const CallsOnPressWhenClicked: Story = {
  play: async ({ canvas, args, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Button' }));
    await expect(args.onPress).toHaveBeenCalledTimes(1);
  },
};
```

Estados forzados sin interacción (para Chromatic): `parameters: { pseudo: { hover: true } }`.

---

## 6. Storybook native (`apps/storybook-native`)

Una app **Expo** cuyo único contenido es Storybook en el dispositivo.

| Archivo | Qué hace |
|---|---|
| `metro.config.js` | `withUniwindConfig(withStorybook(getDefaultConfig(__dirname), …), { cssEntryFile })` (Uniwind por fuera) |
| `src/global.css` | `@import 'tailwindcss'; @import 'uniwind'; @import '@chroma-yesid/tokens/native.css'; @source …` |
| `.rnstorybook/main.ts` | Mismo specifier que web pero con glob `!(*.web)` |
| `.rnstorybook/preview.tsx` | Decorador con `className` de Uniwind |
| `.rnstorybook/storybook.requires.ts` | **Generado** (`pnpm --filter @chroma-yesid/storybook-native storybook-generate`) |
| `index.ts` | Importa el CSS y registra Storybook como raíz |

```sh
pnpm --filter @chroma-yesid/storybook-native storybook-generate   # tras agregar/quitar stories
cd apps/storybook-native && npx expo export --platform ios  # prueba de humo sin dispositivo
pnpm storybook:native                                       # abrir en simulador (pulsar "i")
```

> Ojo: `expo start --ios` puede reemplazar Expo Go del simulador por el del SDK. Alternativa: `npx expo run:ios`.

**Pruebas native sin dispositivo (portable stories):** `jest.config.js` con preset `jest-expo`, `testMatch` de `*.native.test.tsx` y `transformIgnorePatterns` que deja pasar a Storybook (solo ESM). Cada test hace `composeStories(stories)` y usa RNTL:

```tsx
const { Primary } = composeStories(stories);
await render(<Primary onPress={onPress} />);
await user.press(screen.getByRole('button', { name: 'Button' }));
```

```sh
pnpm --filter @chroma-yesid/storybook-native test:native
```

---

## 7. Build y publicación (`packages/ui`)

- **`tsdown.config.ts`**: dos builds (`dist/web`, `dist/native`), cada uno resolviendo su sufijo primero y **quitando el sufijo del nombre de salida** (`entryFileNames`). `unbundle: true` conserva `"use client"` por archivo.
- **`package.json` → `exports`**: la condición `react-native` apunta a `dist/native`; `default` a `dist/web`; más `./web.css` y `./native.css`.
- **CSS publicable:** `@chroma-yesid/ui/web.css` (tokens + `@source` del paquete) y `@chroma-yesid/ui/native.css` (solo `@source`; la app importa los tokens ella misma, porque Uniwind no descubre temas en imports anidados).

```sh
pnpm --filter @chroma-yesid/ui build
cd packages/ui && npx publint && npx attw --pack . --profile esm-only
pnpm --filter @chroma-yesid/ui publish --dry-run --no-git-checks
```

**Apps consumidoras** (`examples/`): `next-app` (Server Components, `next-themes`), `vite-app`, `expo-app`. Comprueban que web no trae `react-native` (`grep` por imports en `.next/static`) y que Expo toma `dist/native`.

---

## 7b. Usar el sistema en otros proyectos (¿hace falta npm?)

**No, publicar en npm no es obligatorio.** Es la vía estándar y la más cómoda, pero hay alternativas:

| Vía | Cuándo | Cómo | Pegas |
|---|---|---|---|
| **npm público** (`@chroma-yesid/ui` y `/tokens`) | Quieres `pnpm add @chroma-yesid/ui` en cualquier proyecto y máquina, con versiones | Crear la organización `chroma-yesid` en npmjs.com, publicar y configurar *trusted publishing* | El código queda público (el repo ya lo es) |
| **Enlace local** | Desarrollo en tu máquina, cambios en vivo | `pnpm build` aquí y en el otro proyecto `pnpm add link:../design-system/packages/ui` (y `tokens`) | Solo funciona en tu equipo; hay que reconstruir `dist` |
| **Tarball** (`pnpm pack`) | Probar el paquete "como si estuviera publicado" antes de publicar | `pnpm --filter @chroma-yesid/ui pack` y `pnpm add ./chroma-yesid-ui-0.1.0.tgz` (también el de `tokens`) | Manual, sin versiones automáticas |
| **GitHub Packages** | Privado dentro de tu cuenta/organización | Publicar en `npm.pkg.github.com` | El scope debe coincidir con el dueño en GitHub (aquí sería `@yesidcarrillo26`, no `@chroma-yesid`, salvo que exista una organización de GitHub con ese nombre) |

Recomendación: **tarball o enlace local para probar ya**, npm público cuando quieras usarlo de verdad en proyectos reales.

---

## 8. Overlays y formularios

- **Formularios a mano:** web con elementos nativos (`input`, `select`, `fieldset`: teclado y lectores gratis); native con `Pressable` y roles.
- **Overlays (web) con Base UI:** `Dialog`, `Popover`, `Menu`, `Tooltip`, `Tabs`, `Accordion`. API por props, igual en ambas plataformas; Base UI queda dentro de `*.web.tsx`.
- Donde native no puede igualar (hover, anclaje) se degrada y se documenta: *Guidelines/Platform differences*.
- Los portales se consultan en los `play` con `screen`, no con `canvas`.

---

## 9. Patrones y Taskbox

- **Patrones:** componen primitivas y se escriben una vez (`EmptyState`, `ListItem`, `PageHeader`).
- **`examples/taskbox`** (Storybook en el puerto 6007):
  - `makeStore(preloadedState)` en un decorador (un store por story).
  - MSW: cada story hace `beforeEach: ({ msw }) => msw.use(http.get(...))` (éxito, `delay('infinite')`, vacío, 500, reintento).
  - `sb.mock(import('../src/lib/clock.ts'))` + `mocked(now).mockReturnValue(...)` fija la fecha.
  - `refs` en `main.ts` compone el Storybook del sistema de diseño.

```sh
npx msw init public --no-save        # genera mockServiceWorker.js
pnpm --filter @chroma-yesid/example-taskbox storybook   # :6007  (con el DS en :6006 se ve compuesto)
pnpm --filter @chroma-yesid/example-taskbox test:storybook
```

---

## 9b. Native en el navegador (`apps/storybook-native-web`)

Un tercer Storybook (`@storybook/react-native-web-vite`, puerto 6008) que renderiza las implementaciones **native** con react-native-web, para revisarlas sin simulador.

- `.storybook/prefer-native.ts`: plugin de Vite (`resolveId`, `enforce: 'pre'`) que elige `.native.tsx` **solo para los archivos de `packages/ui`**.
- `viteFinal`: `tailwindcss()` + `uniwind({ cssEntryFile })`; tema con `Uniwind.setTheme` desde un decorador.
- `refs` en `apps/storybook-web/.storybook/main.ts` lo muestra dentro del Storybook web (en desarrollo, `http://localhost:6008`).

```sh
pnpm --filter @chroma-yesid/storybook-native-web storybook         # :6008
pnpm --filter @chroma-yesid/storybook-native-web build-storybook
pnpm --filter @chroma-yesid/storybook-native-web check:bundle      # ¿solo implementaciones native?
```

---

## 10. CI/CD, versiones y publicación

- **`ci.yml`:** lint, typecheck, tests (unit, Storybook, Jest), build, publint + attw, y la comprobación de que la web no trae `react-native`.
- **`chromatic.yml`:** se **omite** si no existe el secret `CHROMATIC_PROJECT_TOKEN` (`gh secret set CHROMATIC_PROJECT_TOKEN`). Usa `fetch-depth: 0` y TurboSnap.
- **`release.yml`:** Changesets abre el PR "Version Packages" y publica con provenance. Requiere el scope npm.
- Acciones de terceros **fijadas por SHA** y secretos solo en GitHub.
- **Changesets:** cada cambio de paquete añade `pnpm changeset` (un `.md` en `.changeset/`).

---

## 10b. Agentes remotos (trabajar sin tu equipo)

Un issue de GitHub se convierte en un PR aunque tu equipo esté apagado. La decisión y sus límites
están en `docs/adr/0004-agentes-remotos.md`; las reglas que sigue el agente, en `AGENTS.md` (*Modo remoto*).

**Flujo:** issue (plantilla *Tarea para un agente*) → etiqueta `claude` → Claude crea la rama
`claude/issue-N-…`, corre los checks y abre el PR → `verify` corre solo → ajustes con `@claude …` en
el PR → **tú fusionas**. El agente nunca fusiona ni publica en npm.

**Configuración (una sola vez)**

1. Instala la Claude GitHub App solo en este repo: <https://github.com/apps/claude>. No uses
   `/install-github-app`: crea su propio workflow.
2. Genera el token con `claude setup-token` y guárdalo con `gh secret set CLAUDE_CODE_OAUTH_TOKEN`
   (pégalo cuando lo pida; nunca en el repo ni en un chat).
3. Para empujar workflows hace falta el scope `workflow`: `gh auth refresh -h github.com -s workflow`.
4. Crea las etiquetas: `claude` (dispara a Claude) y `needs-human` (exige cuentas, 2FA o dispositivo).

**Uso diario**

- Crea el issue con la plantilla (desde la web o la app de GitHub; `gh` no rellena formularios).
  Mientras no tenga la etiqueta `claude` es un borrador.
- Para empezar: pon la etiqueta `claude` (`gh issue edit <n> --add-label claude`).
- Para seguirlo: `gh run list --workflow claude.yml` y `gh run watch`.
- Para pedir cambios: comenta `@claude …` en el PR. Si `verify` falla: `@claude revisa el fallo de
  verify`. Si `main` avanzó: `@claude rebasa sobre main`.

**Añadir otro agente (checklist)**

1. Guarda su credencial como secret de GitHub.
2. Elige el disparo: un workflow adaptador (como `claude.yml`) o la integración nativa del agente.
3. Dale una etiqueta y un prefijo de rama propios (`codex`, `codex/issue-N-…`).
4. Que actúe con una identidad que dispare CI: una App o un PAT, **nunca** `GITHUB_TOKEN` (el PR
   quedaría `BLOCKED` sin `verify`).
5. En un runner, reutiliza `./.github/actions/preparar-entorno`; en un entorno en la nube, usa como
   preparación `pnpm install --frozen-lockfile && pnpm --filter @chroma-yesid/tokens build`.
6. Comprueba que lee `AGENTS.md` (o enlázalo desde su archivo de instrucciones).
7. Haz un piloto con un issue mínimo y anota lo aprendido en `docs/learning/`.

---

## 11. Storybook para agentes (MCP)

`@storybook/addon-mcp` expone `http://localhost:6006/mcp` (ver `.mcp.json`). Con `pnpm storybook` activo, un agente puede listar componentes (`docs-list`), ver props y ejemplos (`docs-show`) y correr tests (`test-run`) en lugar de inventar props. Las instrucciones están en `AGENTS.md`.

---

## 12. Comandos de uso diario

```sh
pnpm install                                         # dependencias
pnpm --filter @chroma-yesid/tokens build                    # regenerar tokens
pnpm storybook                                       # Storybook web :6006
pnpm storybook:native                                # Storybook on-device
pnpm lint                                            # oxlint + fronteras
pnpm turbo run typecheck                             # tipos (web y native)
pnpm turbo run build                                 # tokens, ui, ejemplos
pnpm turbo run test:unit test:storybook test:native  # toda la batería
pnpm changeset                                       # registrar un cambio de paquete
pnpm peers check                                     # peers sin cumplir
pnpm knip                                            # dependencias y exports sin usar
```

**Agregar un componente nuevo (receta):**
1. `Foo.types.ts` (contrato + JSDoc) y `foo.variants.ts`.
2. `Foo.web.tsx` y `Foo.native.tsx`; `index.ts`; exportar en `src/index.ts`.
3. `Foo.stories.tsx` (estados) y `Foo.web.stories.tsx` (teclado/DOM con `play`).
4. `Foo.native.test.tsx` (portable stories).
5. `pnpm --filter @chroma-yesid/storybook-native storybook-generate`.
6. `pnpm lint && pnpm turbo run typecheck test:storybook test:native`.
7. `pnpm knip`.
8. `pnpm changeset` y commit con el formato `:sparkles: feat(ui): …`.

---

## 13. Glosario de Storybook para repasar

- **CSF3:** formato de stories: `export default { component }` + exports con `args`.
- **args / argTypes / controls:** props de ejemplo, su descripción y el panel para editarlas.
- **play function:** código que interactúa con la story ya renderizada (`userEvent`, `expect`).
- **decorators:** envoltorios (tema, store, providers) alrededor de la story.
- **parameters / globals:** configuración por story o global (a11y, viewport, tema).
- **tags:** etiquetas (`autodocs`, `!autodocs`, `web-only`) para filtrar y decidir qué se documenta o prueba.
- **autodocs:** página de documentación generada desde las props y las stories.
- **MDX / Doc Blocks:** páginas de docs escritas a mano con componentes de Storybook.
- **specifier (`stories`):** `{ directory, titlePrefix, files }`; el título sale de la ruta (el nombre repetido se omite).
- **addon-vitest:** ejecuta cada story como test en navegador.
- **portable stories:** `composeStories` para usar las stories en otros runners (Jest).
- **loaders / beforeEach:** preparan datos antes de renderizar (MSW, mocks).
- **sb.mock:** reemplaza módulos por mocks en las stories.
- **composition (`refs`):** muestra otro Storybook dentro del tuyo.
- **manager vs preview:** el panel (manager) y el iframe donde se renderiza la story (preview) son bundles distintos.

---

## 14. Para practicar

1. Crea `Skeleton` (carga) con web y native siguiendo la receta del §12.
2. Rompe a propósito una prop en `Button.native.tsx` y observa qué falla (`tsc -b`).
3. Cambia `primary` en `tokens/semantic/light/color.json` a un tono con poco contraste y corre `test:storybook`.
4. Agrega una story a `InboxScreen` con otro `msw.use` (p. ej. respuesta lenta de 2 s con `delay(2000)`).
5. Apunta `DS_STORYBOOK_URL` a un Storybook publicado y revisa la composición.
