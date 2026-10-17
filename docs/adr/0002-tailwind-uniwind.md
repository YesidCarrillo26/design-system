# 0002 — Tailwind v4 en web y Uniwind en native

- **Estado:** aceptada
- **Fecha:** 2026-10-17

## Contexto

Con implementaciones separadas por plataforma ([0001](./0001-hybrid-per-platform.md)), lo más
valioso de compartir son los estilos. Hace falta un sistema que funcione igual en DOM y en React Native.

## Decisión

- **Web:** Tailwind CSS v4.
- **Native:** Uniwind (Tailwind v4 para React Native, resuelve estilos en build).
- Ambos reciben el mismo tema, generado desde los tokens DTCG por `@yesid/tokens`
  (`web.css` y `native.css`).
- Las variantes se definen una vez con `tailwind-variants` y solo se extienden por plataforma
  (`hover:` y `focus-visible:` en web, `active:` en native).

## Consecuencias

- Los nombres de clase (`bg-primary`, `text-body-md`) significan lo mismo en las dos plataformas.
- Las variantes compartidas solo pueden usar clases válidas en ambas (sin `hover:`, sin `grid`).
- `tailwind-merge` necesita conocer los tamaños de texto propios; `@yesid/tokens/tw-merge`
  los genera. Sin eso, `text-body-md` y `text-foreground` se pisan.
- Uniwind es una dependencia más joven que NativeWind (v4 estable, v5 en RC). Se acepta a cambio de
  su modelo de resolución en build, y se comprueba en la Fase 2 que estilice el paquete publicado.
