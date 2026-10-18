# Fase 4 — Primitivos y stack de testing

## Qué se construyó

- 10 componentes nuevos, cada uno con implementación web y native, contrato, variantes y stories compartidas: `Box`, `Heading`, `Icon`, `IconButton`, `Spinner`, `Badge`, `Avatar`, `Card`, `Divider`, `Link`.
- Testing: a11y como error en **ambos temas** (la suite corre dos veces: `VITE_SB_THEME=dark`), cobertura (`pnpm --filter @chroma-yesid/storybook-web test:coverage`, ~97 % de líneas web), tests Jest native con portable stories.
- Addons: `addon-mcp` (+ `.mcp.json`), `addon-designs`, `storybook-addon-pseudo-states`, `@chromatic-com/storybook`.
- Chromatic: modos `light-mobile` y `dark-desktop`, y `chromatic.yml` que **se omite sin el secret** `CHROMATIC_PROJECT_TOKEN`.

## Conceptos de Storybook

- **Pseudo-estados:** `parameters: { pseudo: { hover: true } }` fuerza `:hover`/`:focus-visible` para capturarlos sin interacción (útil con Chromatic).
- **Chromatic modes:** `parameters.chromatic.modes` mapea nombres a *globals* (`theme`, `viewport`); cada modo multiplica los snapshots.
- **Globals iniciales:** `initialGlobals` permite elegir el tema de toda una ejecución; así la misma suite de tests cubre claro y oscuro.
- **Cobertura con v8:** el código está fuera de la raíz de Vitest, por eso hace falta `coverage.allowExternal: true`.
- **Stories con `render`:** componen otras primitivas (`Stack`, `Text`) para mostrar variantes juntas; el panel de controles las excluye con `controls.exclude`.

## Lecciones

- ⚠️ **Caché de Turbo obsoleta:** `test:storybook` no hasheaba el código de `packages/ui` y seguía reportando 20 tests con 10 componentes nuevos. Solución: `dependsOn: ["^build"]` en las tareas que consumen el paquete.
- ⚠️ **a11y atrapó un token:** `muted-foreground` sobre `muted` daba 4.39:1 (<4.5). Se corrigió en el token (tema claro → `neutral.600`), no en el componente.
- Los íconos SVG y el `ActivityIndicator` no leen `className`: en native se resuelven con `useTokenColor` (`lib/useTokenColor.native.ts`), que lee los tokens según el tema. En web el SVG usa `currentColor` y recibe la clase.
- Un archivo `*.native.ts` dentro de `lib/` choca con la regla de "archivos compartidos"; se añadió una excepción en `.oxlintrc.json`.
- `Avatar` usa estado (imagen que falla → iniciales): la lógica vive en `useAvatar.ts` (compartida) y solo cambia el elemento (`img` / `Image`).
- Un botón de ícono sin texto necesita `label` obligatorio como nombre accesible; el tipo lo hace requerido.

## Pendiente

- Crear el proyecto en chromatic.com y guardar `CHROMATIC_PROJECT_TOKEN` (`gh secret set CHROMATIC_PROJECT_TOKEN`); hasta entonces el workflow se omite.
- Vincular diseños de Figma con `parameters.design` cuando existan.
- Probar el flujo MCP con un agente real y dejarlo escrito en las guías.
