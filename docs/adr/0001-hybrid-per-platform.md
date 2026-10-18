# 0001 — Componentes híbridos por plataforma

- **Estado:** aceptada
- **Fecha:** 2026-10-17

## Contexto

El sistema debe servir a apps web (Next.js, Vite) y mobile (Expo). Hay tres formas de lograrlo:
una sola implementación con react-native-web, dos librerías independientes, o implementaciones
separadas por plataforma que comparten todo lo que no es render.

## Decisión

Cada componente tiene `X.web.tsx` (React DOM puro) y `X.native.tsx` (React Native). Se comparten:

- tokens (`@chroma-yesid/tokens`),
- el contrato de props (`X.types.ts`),
- las variantes (`x.variants.ts`, con `tailwind-variants`),
- la lógica (`useX.ts`),
- las stories (`X.stories.tsx`).

Las apps web **no** dependen de react-native-web.

## Consecuencias

- Cada plataforma queda con calidad nativa (`<button>` real en web, `Pressable` en mobile).
- Se escribe cada componente dos veces, pero solo el render: lo demás se comparte.
- El riesgo es que las dos implementaciones diverjan. Se mitiga con tipos: `packages/ui` se
  compila dos veces (`tsconfig.web.json` y `tsconfig.native.json`, con `moduleSuffixes`), así que
  una prop que exista solo en una plataforma rompe el typecheck del archivo compartido.
- Las fronteras (web sin `react-native`, native sin `react-dom`) las hace cumplir oxlint.
