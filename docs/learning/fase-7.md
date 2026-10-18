# Fase 7 — Patrones y Taskbox

## Qué se construyó

- **Patrones** en `packages/ui/src/patterns`: `EmptyState`, `ListItem`, `PageHeader`. Cada uno es **un solo archivo** (sin `.web`/`.native`): solo compone primitivas, y las primitivas resuelven la plataforma.
- **`examples/taskbox`**: el Taskbox del curso, modernizado (Vite + React 19 + TypeScript + Redux Toolkit 2 + `@chroma-yesid/ui`), con su propio Storybook (puerto 6007): 18 tests.

## Qué cambió respecto al curso

| Curso (Storybook 7.5) | Aquí |
|---|---|
| Mock store escrito a mano que duplica el reducer | `makeStore(preloadedState)` + un decorador que crea un store **por story** |
| MSW 1 (`rest.get`, `mswDecorator`) | MSW 3 + `msw-storybook-addon` 3 (`msw.use()` en `beforeEach`) |
| Sin aserciones en los `play` | `expect` de `storybook/test`, con estados Default, Loading, Empty, Error y Retry |
| `argTypesRegex` para acciones | `fn()` explícito |
| Fechas reales | `sb.mock` del módulo `clock.ts`: la fecha es siempre 15 ene 2026 |
| `Task` con `<span onClick>` y `label` mal enlazada | Botones de ícono accesibles con nombre (`Fijar: <tarea>`) |
| Componente conectado difícil de probar | `TaskListView` (pura) + `TaskList` (conectada) |
| Sin composición | `refs` hacia el Storybook del sistema de diseño |

## Conceptos de Storybook

- **Composición (`refs`):** una función en `main.ts` devuelve la URL según `configType` (desarrollo vs producción). Hace falta tener `apps/storybook-web` corriendo en :6006 para verlo.
- **`sb.mock(import('…'))`** en `preview.tsx` reemplaza un módulo por un automock; cada story/`beforeEach` fija su retorno con `mocked(fn).mockReturnValue(...)`.
- **Un store por story:** el decorador usa `useState(() => makeStore(parameters.store?.preloadedState))`; el estado inicial se pasa por `parameters`.
- **`msw.use` por story:** cada escenario de red (éxito, `delay('infinite')`, vacío, 500, fallo-y-reintento con `{ once: true }`) vive en el `beforeEach` de su story.

## Lecciones

- ⚠️ **`msw-storybook-addon` 3 rompió la API** (ya no existe `initialize`). Se leyó el README del paquete instalado.
- ⚠️ **a11y atrapó un patrón:** `EmptyState` con `h3` fijo tras el `h1` de `PageHeader` rompía `heading-order`; ahora hay `headingLevel`.
- ⚠️ La primera corrida de Vitest en un proyecto nuevo falla por reoptimización de dependencias; la segunda pasa.
- Los patrones heredan lo bueno de la arquitectura: se prueban en web (stories) y native (Jest) sin duplicar código.

## Pendiente

- Publicar el Storybook del sistema de diseño (GitHub Pages) para que `refs` funcione en producción (`DS_STORYBOOK_URL`).
- Taskbox native (usaría las mismas stories de patrones y el store).
