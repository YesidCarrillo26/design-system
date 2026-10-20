# Design system multiplataforma (`@chroma-yesid/*`)

Monorepo pnpm + Turborepo con un design system para web (React DOM, Tailwind v4) y mobile
(React Native, Uniwind), documentado y probado con Storybook 10.

## Estructura

- `packages/tokens` — tokens DTCG → `web.css`, `native.css`, constantes TS, `tokens.json`, `tw-merge`.
- `packages/ui` — componentes. Cada uno tiene implementación `.web.tsx` y `.native.tsx`.
- `apps/storybook-web` — Storybook principal (react-vite): docs, tests, visual.
- `apps/storybook-native-web` — las implementaciones native en el navegador (react-native-web), puerto 6008.
- `apps/storybook-native` — app Expo con Storybook on-device y tests Jest.
- `tooling/typescript` — tsconfig compartidos.
- `docs/pendientes.md` — tareas pendientes y siguientes pasos.
- `docs/guia-paso-a-paso.md` — guía completa de cómo se construyó (tecnologías y comandos).
- `docs/adr` — decisiones de arquitectura. Léelas antes de cambiar algo estructural.
- `docs/plan` — el plan inicial con el estado por fase.
- `docs/learning` — bitácora de lo aprendido de Storybook por fase.
  Después de la Fase 8, los cambios se registran en `docs/learning/fase-9.md` (bitácora cronológica;
  actualízala en el mismo cambio que introduce algo, sin reescribir el pasado). El trabajo de la
  Fase 10 (siguiente nivel visual, un PR por fase) va en `docs/learning/fase-10.md`.
  Antes de depurar, lee `docs/learning/errores-y-soluciones.md`; al resolver algo nuevo, agrégalo ahí.
  Las decisiones de diseño y su "si pasa X, hazlo así" están en `docs/learning/buenas-practicas.md`.

## Comandos

- `pnpm install`
- `pnpm lint` — oxlint (incluye las fronteras entre plataformas).
- `pnpm knip` — dependencias, exports y archivos sin usar (corre en CI).
- `pnpm turbo run typecheck` — `packages/ui` se compila dos veces (web y native).
- `pnpm --filter @chroma-yesid/tokens build` — regenera `packages/tokens/dist` (necesario antes de storybook/typecheck).
- `pnpm storybook` — Storybook web en :6006.
- `pnpm storybook:native` — Storybook on-device (Expo).

## Reglas

- **Archivos por plataforma:** `X.web.tsx` nunca importa `react-native` ni `uniwind`; `X.native.tsx`
  nunca importa `react-dom` ni usa `window`/`document`. Nunca dejes un `X.tsx` sin sufijo junto a los
  archivos de plataforma.
- **Archivos compartidos** (`*.types.ts`, `*.variants.ts`, `use*.ts`, `X.stories.tsx`): sin imports de
  ninguna plataforma. En stories compartidas solo se importa `fn` de `storybook/test`; los `play` van en
  `X.web.stories.tsx`.
- **Estilos:** solo clases semánticas de los tokens (`bg-primary`, `text-foreground`, `text-body-md`).
  No hay paleta de Tailwind por defecto. Las variantes compartidas solo usan clases válidas en ambas
  plataformas (sin `hover:`, sin `grid`); lo específico se agrega en cada implementación.
- **Clases literales:** Tailwind y Uniwind escanean el código, así que nunca construyas nombres de clase
  dinámicamente (`bg-${x}`).
- **Tokens:** no edites `packages/tokens/dist`. Cambia los JSON en `packages/tokens/tokens` y reconstruye.
- **React:** la versión la dicta Expo SDK (ver `catalog:` en `pnpm-workspace.yaml`). No la subas sola.
- **Cada componente nuevo** cumple la Definition of Done del plan (contrato, variantes, stories
  compartidas, tests, a11y sin errores, docs y un changeset).
- **Flujo de cambios:** `main` está protegida (exige PR y el check `verify`; solo `--rebase` o squash). Rama → PR → `gh pr merge --rebase`.
- **Secretos:** nunca en el repo. Los tokens de Chromatic y npm van solo en GitHub secrets. 

## Storybook MCP (agentes)

Con `pnpm storybook` corriendo, el servidor MCP está en `http://localhost:6006/mcp` (ver `.mcp.json`).
Al trabajar con componentes de este sistema, **consúltalo antes de usar una prop**: no inventes props.

- `docs-list` lista los componentes; `docs-show` muestra las props y los ejemplos de uno.
- `get-storybook-story-instructions` da las convenciones vigentes para crear o actualizar stories.
- Verifica tu trabajo con `test-run`.

## Modo remoto (agentes en CI)

Aplica cuando trabajas en un workflow de GitHub (`CI=true`), sin una persona delante: una tarea llega
como un issue (etiqueta del agente) o como un comentario `@agente` en un issue o PR. Reemplaza lo que
diga el resto del documento donde choque (por ejemplo, el último paso del flujo de cambios: **tú no
fusionas**).

- **Entorno:** ya están hechos `pnpm install` y la build de tokens. El MCP de Storybook no está
  disponible: lee las props en `*.types.ts` y en las stories. Si la rama cambia `pnpm-lock.yaml`,
  corre `pnpm install` otra vez.
- **Rama:** el workflow ya la creó (`<agente>/issue-N-…`). Trabaja en ella, no crees otra. Si te piden
  rebasar: `git rebase origin/main` y `git push --force-with-lease`, solo en tu propia rama.
- **Alcance:** haz solo lo que pide el issue y sus criterios de aceptación. Si el trabajo se amplía,
  deja el resto como pendiente en `docs/pendientes.md` o en el PR; no lo hagas.
- **Antes de empujar** (lo mismo que exige `verify`): `pnpm lint`, `pnpm knip`,
  `pnpm turbo run typecheck` y los tests de lo que tocaste (`test:unit`, `test:storybook`,
  `test:native`). Si tocaste `packages/ui`: `npx publint`, `pnpm check:peers` y `npx attw` (ver `ci.yml`).
  No empujes en rojo; si no logras ponerlo verde, dilo en el PR.
- **Commits:** `:emoji: tipo(alcance): descripción`, en español, como el resto del repo.
- **Changeset:** uno si cambia algún paquete publicado.
- **Documentación:** entrada en `docs/learning/fase-9.md`, marca el ítem en `docs/pendientes.md` y,
  si resolviste algo no obvio, agrégalo a `docs/learning/errores-y-soluciones.md`.
- **PR:** ábrelo tú con `gh pr create`. Título con el formato de los commits; cuerpo con *Qué*,
  *Cómo se verificó* y *Pendiente para una persona*, y `Closes #N`. Nunca `gh pr merge`.
- **Límites duros:** no publiques en npm, no toques `.github/workflows/` y no pidas ni escribas
  secretos. Esos cambios los hace una persona.
- **Si te bloquea algo que no es de código** (una cuenta, 2FA, un dispositivo, una decisión de diseño
  ambigua): pregunta en el issue y detente, no adivines.
