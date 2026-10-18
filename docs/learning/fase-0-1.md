# Fases 0 y 1 — Fundaciones y esqueleto multiplataforma

Bitácora de lo aprendido (Storybook 10.6, pnpm 12, Expo SDK 58). Lo que contradijo una suposición va marcado con ⚠️.

## Qué se construyó

- Monorepo pnpm + Turborepo con catálogos y `nodeLinker: hoisted`.
- `@chroma-yesid/tokens`: tokens DTCG → `web.css`, `native.css`, constantes TS, `tokens.json` y config de `tailwind-merge`.
- `@chroma-yesid/ui`: `Text`, `Stack` y `Button`, cada uno con implementación `.web.tsx` y `.native.tsx`.
- `apps/storybook-web` (react-vite) y `apps/storybook-native` (Expo, Storybook on-device).

## Conceptos de Storybook que aparecieron

**Archivos de stories y títulos**
- Una story **compartida** (`Button.stories.tsx`) la cargan los dos Storybooks; la resolución de `./Button` a `.web.tsx` o `.native.tsx` la hace el bundler (Vite con `resolve.extensions`, Metro por plataforma) y TypeScript con `moduleSuffixes`.
- Sin `title`, el título sale de la ruta. `Button/Button.stories.tsx` queda como `Button` (se quita el nombre repetido), y el `titlePrefix` del specifier agrega `Components/`.
- ⚠️ `titlePrefix` **también se antepone a los títulos explícitos**. `title: 'Components/Button'` quedaba como `Components/Components/Button`. Hay que escribir `title: 'Button'`.
- Dos archivos pueden compartir título (`Components/Button`) siempre que los nombres de export no choquen. El segundo lleva `tags: ['!autodocs']` para no duplicar la página de docs.

**Tags**
- `tags: ['autodocs']` en el preview activa la documentación para todo; `!autodocs` la excluye en un archivo.
- `web-only` es una etiqueta propia; Storybook agrega solas `dev`, `test`, `manifest` y `play-fn`.

**Tests**
- `@storybook/addon-vitest` ejecuta **cada story como un test** en un navegador real (Playwright).
- ⚠️ Desde Storybook 10.3 aplica el preview y los addons por sí solo: un `vitest.setup.ts` con `setProjectAnnotations` ya sobra.
- `parameters.a11y.test: 'error'` hace que una violación de axe rompa el test (probado con un contraste de 1.6:1). `'todo'` lo deja como aviso.
- En el `play` el contexto ya trae `canvas` y `userEvent`; solo hay que importar `expect` y `fn`.
- **Portable stories**: `composeStories(stories)` convierte las stories en componentes que Jest puede renderizar. Las props que se pasan al componente pisan los `args` de la story.

**Storybook React Native**
- `.rnstorybook/main.ts` acepta el mismo specifier con `directory`, `titlePrefix` y `files`.
- El CLI genera `storybook.requires.ts` con un `require.context` y una regex. El glob `!(*.web)` se traduce a un lookahead negativo que sí excluye las stories web.
- El `className` funciona porque **Uniwind** reescribe el resolver y el transformer de Metro, no porque los componentes importen algo.

## Decisiones y sorpresas

- ⚠️ **TypeScript 7.0.2 ya es el `latest`** (el compilador nativo). Se queda en `~6.0.3` hasta comprobar que `moduleSuffixes` funciona en TS 7: es la base del guardián de paridad.
- ⚠️ **pnpm 12 trata los scripts de build sin aprobar como error** (`ERR_PNPM_IGNORED_BUILDS`) y aplica una edad mínima de publicación (`minimumReleaseAgeExclude`). Se denegaron `@parcel/watcher` y `unrs-resolver` (traen binarios precompilados) y todo sigue funcionando.
- ⚠️ **React lo dicta Expo**: SDK 58 fija `19.3.0` aunque npm ya tenga `19.3.1`. `react-server-dom-webpack@19.3.1` (peer de `jest-expo`) exigía React ≥ 19.3.1; se fijó a `19.3.0`.
- **`tailwind-merge` pisaba el tamaño de texto**: `text-body-md` y `text-foreground` se interpretan como el mismo grupo (color). `@chroma-yesid/tokens/tw-merge` lo corrige y hay un test que demuestra el bug.
- **El guardián de paridad funciona**: quitar la prop `size` solo de `Button.native.tsx` rompe el typecheck de `Button.stories.tsx` (el archivo *compartido*), porque `packages/ui` se compila una vez por plataforma.
- **Las fronteras de oxlint funcionan**: `no-restricted-imports` con `importNames` permite `fn` de `storybook/test` en stories compartidas y bloquea `expect`.
- RNTL 14: `render` es **asíncrono** (`await render(...)`) y se recomienda `jest.useFakeTimers()` con `userEvent`.
- `jest.fn()` no encaja con el tipo `Mock` de `fn()` de Storybook; en los tests se usa `fn()` de `storybook/test`.

## Pendiente de comprobar en un dispositivo

El bundle de iOS compila (`expo export`, 2189 módulos) y Uniwind detecta los temas `light` y `dark`, pero **falta ver en pantalla** que los estilos se apliquen: color del Button, tamaños de texto y cambio de tema. Es el riesgo principal de la Fase 2.

```sh
pnpm storybook:native      # luego pulsa "i"
```

Con Expo Go habrá que actualizarlo a la versión del SDK 58 (reemplaza al que tengas instalado). Alternativa que no toca Expo Go: `cd apps/storybook-native && npx expo run:ios`.
