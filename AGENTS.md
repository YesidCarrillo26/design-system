# Design system multiplataforma (`@yesid/*`)

Monorepo pnpm + Turborepo con un design system para web (React DOM, Tailwind v4) y mobile
(React Native, Uniwind), documentado y probado con Storybook 10.

## Estructura

- `packages/tokens` — tokens DTCG → `web.css`, `native.css`, constantes TS, `tokens.json`, `tw-merge`.
- `packages/ui` — componentes. Cada uno tiene implementación `.web.tsx` y `.native.tsx`.
- `apps/storybook-web` — Storybook principal (react-vite): docs, tests, visual.
- `apps/storybook-native-web` — las implementaciones native en el navegador (react-native-web), puerto 6008.
- `apps/storybook-native` — app Expo con Storybook on-device y tests Jest.
- `tooling/typescript` — tsconfig compartidos.
- `docs/guia-paso-a-paso.md` — guía completa de cómo se construyó (tecnologías y comandos).
- `docs/adr` — decisiones de arquitectura. Léelas antes de cambiar algo estructural.
- `docs/plan` — el plan inicial con el estado por fase.
- `docs/learning` — bitácora de lo aprendido de Storybook por fase.
  Antes de depurar, lee `docs/learning/errores-y-soluciones.md`; al resolver algo nuevo, agrégalo ahí.
  Las decisiones de diseño y su "si pasa X, hazlo así" están en `docs/learning/buenas-practicas.md`.

## Comandos

- `pnpm install`
- `pnpm lint` — oxlint (incluye las fronteras entre plataformas).
- `pnpm turbo run typecheck` — `packages/ui` se compila dos veces (web y native).
- `pnpm --filter @yesid/tokens build` — regenera `packages/tokens/dist` (necesario antes de storybook/typecheck).
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
- **Secretos:** nunca en el repo. Los tokens de Chromatic y npm van solo en GitHub secrets.

## Storybook MCP (agentes)

Con `pnpm storybook` corriendo, el servidor MCP está en `http://localhost:6006/mcp` (ver `.mcp.json`).
Al trabajar con componentes de este sistema, **consúltalo antes de usar una prop**: no inventes props.

- `docs-list` lista los componentes; `docs-show` muestra las props y los ejemplos de uno.
- `get-storybook-story-instructions` da las convenciones vigentes para crear o actualizar stories.
- Verifica tu trabajo con `test-run`.
