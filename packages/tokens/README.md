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
import { colors, radius, text, shadow, duration, ease, breakpoint, fontFamily } from '@chroma-yesid/tokens';

colors.light.primary; // valor del color en el tema claro
radius.md;            // número, en px
```

Los tipos `ColorToken`, `RadiusToken`, `TextToken` y `ThemeName` también se exportan.

### `tailwind-merge`

```ts
import { extendTailwindMerge } from 'tailwind-merge';
import { twMergeConfig } from '@chroma-yesid/tokens/tw-merge';

const twMerge = extendTailwindMerge(twMergeConfig);
```

Sin esta configuración, `tailwind-merge` confunde `text-body-md` (tamaño) con un color de texto.

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
