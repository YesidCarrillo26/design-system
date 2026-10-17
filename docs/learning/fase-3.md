# Fase 3 — Tokens completos y Foundations

## Qué se construyó

- Tokens nuevos: colores `muted`, `destructive`, `destructive-foreground`; elevación (`shadow` sm/md/lg); movimiento (`duration`, `ease`); `breakpoint`; familias tipográficas por plataforma.
- El generador (`packages/tokens/sd/build.ts`) emite todo a `web.css`, `native.css`, constantes TS y `tokens.json`.
- Páginas **Foundations** (Colors, Typography, Spacing, Radius, Elevation, Motion) con bloques propios (`docs/blocks/`) alimentados por `tokens.json`.
- Marca del manager (`.storybook/theme.ts` con colores de los tokens) y viewports derivados de los breakpoints.

## Conceptos de Storybook

- **MDX + Doc Blocks:** `<Meta title="Foundations/Colors" />` crea una página de docs sin componente (docs "no adjuntas"). El contenido son componentes React normales, así que pueden leer los tokens.
- **Orden del sidebar:** `parameters.options.storySort.order` admite grupos anidados (`'Foundations', ['Colors', ...]`).
- **Theming del manager:** `create()` de `storybook/theming` + `addons.setConfig({ theme })` en `manager.ts`. El manager es un bundle aparte del preview: no hereda el tema del Storybook.
- **Viewports:** `parameters.viewport.options` se arma desde los tokens, sin duplicar números.
- **Tema en docs:** `addon-themes` pone `data-theme` en `<html>` también en las páginas de docs; la página conserva el tema claro de Storybook, pero las muestras sí reflejan los tokens (se fuerza `data-theme` en cada muestra para ver los dos temas a la vez).

## Lecciones

- `@variant ios` / `@variant android` dentro de `@layer theme { :root { … } }` compilan en Uniwind (probado con `expo export` en iOS y Android): así la fuente cambia por plataforma desde los tokens.
- Tailwind v4 no tiene namespace para duraciones; se exponen como `--ds-duration-*` y se usan con `duration-(--ds-duration-base)` o en estilos inline.
- Las clases de los bloques de docs deben ser literales (por eso los mapas `radiusClass`, `shadowClass`, `spacingScale`): Tailwind las escanea desde `@source '../docs'`.

## Pendiente

- Tema oscuro del manager (hoy solo claro).
- Páginas de Guidelines (accesibilidad, reglas multiplataforma, contribución).
