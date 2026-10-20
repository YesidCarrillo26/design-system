# @chroma-yesid/tokens

Design tokens del sistema `@chroma-yesid`, definidos en formato [DTCG](https://design-tokens.github.io/community-group/format/) y compilados con Style Dictionary a:

- CSS para **Tailwind v4** (web) y **Uniwind** (React Native).
- Constantes y tipos de **TypeScript**.
- Un `tokens.json` plano.
- La configuración de `tailwind-merge` que entiende las clases de texto del sistema.

Los componentes viven en [`@chroma-yesid/ui`](https://www.npmjs.com/package/@chroma-yesid/ui), que ya incluye estos tokens. Instala este paquete solo si quieres usar los tokens por separado.

## Instalación

```sh
npm i @chroma-yesid/tokens
```

## Uso

### Web (Tailwind v4)

```css
@import 'tailwindcss';
@import '@chroma-yesid/tokens/web.css';
```

Después usa clases semánticas: `bg-primary`, `text-foreground`, `text-body-md`, `rounded-lg`. El tema oscuro se aplica con la clase o atributo que defina el CSS generado.

### React Native (Uniwind)

```css
@import 'tailwindcss';
@import 'uniwind';
@import '@chroma-yesid/tokens/native.css';
```

Importa los tokens directamente en tu CSS de entrada: Uniwind no descubre los temas a través de imports anidados.

### TypeScript

```ts
import { colors, radius, text, fontWeight, shadow, duration, ease, easing, zIndex, opacity, breakpoint, fontFamily } from '@chroma-yesid/tokens';

colors.light.primary; // valor del color en el tema claro
radius.md;            // número, en px
text['heading-lg'];   // { size, lineHeight, letterSpacing }, los tres en px
fontWeight.semibold;  // 600
easing.out;           // [0, 0, 0.2, 1], para Easing.bezier(...easing.out) en React Native
```

Los tipos `ColorToken`, `RadiusToken`, `TextToken`, `FontWeightToken`, `ShadowToken`, `DurationToken`, `EaseToken`, `ZIndexToken`, `OpacityToken` y `ThemeName` también se exportan.

### `tailwind-merge`

```ts
import { extendTailwindMerge } from 'tailwind-merge';
import { twMergeConfig } from '@chroma-yesid/tokens/tw-merge';

const twMerge = extendTailwindMerge(twMergeConfig);
```

Sin esta configuración, `tailwind-merge` confunde `text-body-md` (tamaño) con un color de texto.

## Qué incluye

- **Color:** semánticos con valor claro y oscuro. Superficies (`background`, `card`, `popover`), acciones (`primary`, `secondary`, `accent`), bordes (`border`, `input`, `ring`), `overlay` y, para cada estado (`destructive`, `success`, `warning`, `info`), `X`, `X-foreground`, `X-subtle` y `X-subtle-foreground`. El texto o icono de estado usa `X-subtle-foreground`; `warning` no se usa como color de texto.
- **Tipografía:** `display`, `heading-xl|lg|md|sm`, `body-lg|md|sm`, `caption`, `overline` (y `title`, obsoleto). Pesos `font-normal|medium|semibold|bold`.
- **Otros:** radios, sombras (`xs`…`lg`), movimiento (`duration`, `ease`), capas `z-overlay|popover|toast` (solo web) y opacidades `opacity-disabled|pressed`.
- **Contraste:** cada par texto/fondo se comprueba en cada build (4.5:1 el texto, 3:1 el anillo de foco).

> Los CSS **eliminan** los tamaños y pesos de texto por defecto de Tailwind (`text-xs`…`text-9xl`, `font-light`…) y la paleta de color, como ya se hacía con los colores. Usa los estilos del sistema.

## Exports

| Ruta | Contenido |
| --- | --- |
| `@chroma-yesid/tokens` | Constantes y tipos de TypeScript |
| `@chroma-yesid/tokens/web.css` | Tema para Tailwind v4 |
| `@chroma-yesid/tokens/native.css` | Tema para Uniwind |
| `@chroma-yesid/tokens/tokens.json` | Tokens en JSON plano |
| `@chroma-yesid/tokens/tw-merge` | Configuración de `tailwind-merge` |

## Más información

- Código y decisiones de diseño: [github.com/YesidCarrillo26/design-system](https://github.com/YesidCarrillo26/design-system)
- Licencia: MIT
