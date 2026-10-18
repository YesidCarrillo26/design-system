# Fase 2 — Build y distribución

## Qué se construyó

- `packages/ui` se compila con **tsdown** dos veces (`dist/web` y `dist/native`), cada una resolviendo su sufijo primero (`.web.tsx` / `.native.tsx`).
- `exports` con la condición `react-native` antes de `default`: Metro toma `dist/native`; Next y Vite caen en `dist/web`.
- CSS publicable: `@chroma-yesid/ui/web.css` (tokens + `@source` del paquete) y `@chroma-yesid/ui/native.css` (solo `@source`).
- Tres apps consumidoras que usan el `dist` real: `examples/next-app`, `examples/vite-app`, `examples/expo-app`.
- Changeset inicial, `release.yml` y un CI ampliado (publint, attw, tests de Storybook y Jest).

## Verificado

| Comprobación | Resultado |
|---|---|
| `publint` | sin problemas |
| `attw --profile esm-only` | verde en `bundler` y `node16 (ESM)` |
| Next.js 16 build (Server Components) | compila; 0 archivos con `react-native` en el bundle del cliente |
| Tailwind genera las clases del paquete a través de `@source` anidado | sí (`bg-primary`, `text-body-md`, `h-11`…) |
| Vite build + typecheck | OK |
| Expo `export` | resuelve la implementación native: aparece `active:opacity-80` y ningún `hover:` ni `react-dom` |
| `pnpm turbo run build typecheck test:*` | 14/14 |

## Lecciones

- ⚠️ **Los `.d.ts` conservan el sufijo** (`Button.web.d.ts`), pero son coherentes: `index.d.ts` importa `./Button.web.js`. Es feo y funciona; `attw` lo da por bueno. El JS sí sale sin sufijo gracias a `entryFileNames`.
- ⚠️ **Uniwind no descubre temas a través de imports CSS anidados.** `@import '@chroma-yesid/ui/native.css'` que a su vez importaba los tokens daba `Cannot use @variant with unknown variant: light`. Por eso `native.css` solo hace `@source` y la app importa `@chroma-yesid/tokens/native.css` directamente. En web (Tailwind) el anidado funciona.
- Next ya no necesita `transpilePackages`: el `dist` es JS estándar.
- `typecheck` de los ejemplos necesita `^build` (consumen el `dist`).
- Una búsqueda ingenua de `react-native` en el bundle da falsos positivos (mi propio texto de ejemplo); hay que buscar imports (`from "react-native"`).

## Pendiente

- Ver los estilos de Uniwind en un dispositivo/simulador (Expo Go 58 o `expo run:ios`).
- Reclamar el scope npm `@chroma-yesid` y configurar el trusted publisher antes del primer `pnpm release`.
