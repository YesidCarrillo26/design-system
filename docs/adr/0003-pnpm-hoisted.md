# 0003 — pnpm con `nodeLinker: hoisted`

- **Estado:** aceptada
- **Fecha:** 2026-10-17

## Contexto

pnpm instala de forma aislada por defecto (cada paquete solo ve lo que declara). Uniwind declara
como peers piezas internas de Metro (`metro`, `metro-cache`, `metro-transform-worker`,
`@expo/metro-config`). Con instalación aislada, pnpm puede resolverlas a un Metro distinto del que
usa Expo, y el transformador falla en silencio. Expo SDK 54+ soporta instalaciones aisladas, pero
documenta que "no todos los paquetes funcionan", y `create-expo-app` con pnpm usa hoisted.

## Decisión

`nodeLinker: hoisted` en `pnpm-workspace.yaml` desde el primer día. Las versiones compartidas
(React, React Native, Storybook, Tailwind…) se fijan en `catalog:`. **La versión de React la
dicta Expo**, no el último release de npm.

## Consecuencias

- Se pierde la protección contra dependencias fantasma (importar algo que no declaraste).
  Se compensa con `knip`, `publint`, `attw` y apps de ejemplo que consumen el `dist`.
- Un spike con instalación aislada queda pendiente para más adelante.
