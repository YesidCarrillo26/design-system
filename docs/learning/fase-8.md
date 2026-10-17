# Fase 8 — Las implementaciones native en el navegador

## Qué se construyó

`apps/storybook-native-web` (puerto 6008): un tercer Storybook, con `@storybook/react-native-web-vite`, que renderiza las implementaciones **native** (`*.native.tsx`) en el navegador con react-native-web y Uniwind. Se compone dentro del Storybook web con `refs`.

**Para qué sirve:** revisar lo native sin simulador, con las mismas herramientas web (docs, capturas, Chromatic en el futuro). **Para qué no:** no sustituye al dispositivo: react-native-web no es iOS/Android (métricas de texto, sombras, gestos).

## Cómo funciona

- El framework resuelve `.web.tsx` primero, que en `packages/ui` son las implementaciones de DOM. El plugin `.storybook/prefer-native.ts` (`resolveId` con `enforce: 'pre'`) hace lo contrario **solo si el importador está en `packages/ui/src`**: `./Button` → `Button.native.tsx` si existe. Las librerías de terceros siguen resolviendo sus propios `.web.js`.
- Plugins de Vite: `tailwindcss()` + `uniwind()` (con `cssEntryFile: './src/global.css'`), añadidos en `viteFinal`.
- Tema: un *global* de toolbar y un decorador que llama `Uniwind.setTheme('light'|'dark')`.
- Mismas stories que el Storybook on-device (`!(*.web)`), con los mismos `titlePrefix`.

## Verificación (y su automatización)

| Comprobación | Resultado |
|---|---|
| 120 entradas, ninguna `*.web.*` | ✅ |
| Estilos de Uniwind aplicados | fondo del botón `#4f46e5` (claro) → `#818cf8` (oscuro); alto 44 px; radio 8 px |
| Cambio de tema | fondo de página `#fff` → `#09090b` |
| Se cargó la implementación native | el bundle contiene `active:opacity-80` y **no** contiene `hover:opacity-90`, `focus-visible:ring-2` ni `@base-ui` |

La última comprobación es el script `scripts/check-bundle.mjs` (`pnpm --filter @yesid/storybook-native-web check:bundle`), ejecutado en CI. Se probó que **falla** cuando falta una cadena nativa.

## Lecciones

- ⚠️ **No se puede distinguir web de native por la etiqueta del DOM:** react-native-web renderiza `role="button"` como `<button>`. La prueba fiable es buscar cadenas exclusivas de cada implementación en el bundle.
- ⚠️ **`react-native-svg` en web importa `@react-native/assets-registry/registry`**, que React Native 0.88 ya no trae como dependencia. Falla el build con "Rolldown failed to resolve import". Solución: dependencia directa `@react-native/assets-registry@0.88.0` en esta app.
- ⚠️ **`flex-1` no llena la pantalla en react-native-web** si la raíz no tiene altura: hay que dar `height: 100%` a `html, body, #storybook-root` y hacer la raíz `display: flex`.
- El framework fija `vite-plugin-rnw` 0.0.11 y avisa de que `tsconfck`/`vite-plugin-rnw` piden TypeScript 5 (`pnpm peers check`); con TS 6 funciona. Uniwind avisa de requisitos especiales con Vite 8, pero el build y los estilos funcionaron con Vite 8.3.
- La accesibilidad se mide en el Storybook web: aquí `a11y.test` es `todo`, porque el DOM de react-native-web es aproximado.
- Los colores de SVG y `ActivityIndicator` salen de `useColorScheme` (sistema), no de `Uniwind.setTheme`; en este Storybook pueden no seguir el selector de tema (limitación conocida de la web, no de native).

## Pendiente

- Publicar los Storybooks (GitHub Pages) para que `NATIVE_STORYBOOK_URL` / `DS_STORYBOOK_URL` funcionen fuera del desarrollo.
- Un segundo proyecto de Chromatic para capturas aproximadas de native.
