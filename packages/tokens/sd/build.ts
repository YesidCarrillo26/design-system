/**
 * Pipeline de tokens: DTCG JSON → Style Dictionary (resuelve referencias) → salidas.
 *
 * Style Dictionary solo parsea y resuelve `{color.neutral.0}`. Cada archivo de salida
 * mezcla modos (light + dark), algo que el pipeline de formatos de SD no hace bien
 * (un format ve un solo diccionario), así que los escribimos nosotros.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import StyleDictionary from 'style-dictionary';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = path.join(root, 'dist');

interface Token {
  /** Ruta completa, p. ej. ['color', 'primary'] o ['text', 'body-md', 'size']. */
  path: string[];
  value: string;
  description?: string;
}

async function resolveTokens(source: string[], include: string[] = []): Promise<Token[]> {
  const sd = new StyleDictionary({
    usesDtcg: true,
    source: source.map((glob) => path.join(root, glob)),
    include: include.map((glob) => path.join(root, glob)),
    log: { warnings: 'warn', errors: { brokenReferences: 'throw' } },
    platforms: { resolve: { transforms: [] } },
  });
  const { allTokens } = await sd.getPlatformTokens('resolve');
  // Los tokens de `include` (primitivos) solo sirven para resolver referencias.
  return allTokens
    .filter((token) => token.isSource)
    .map((token) => ({
      path: token.path,
      value: String(token.$value),
      description: token.$description,
    }));
}

const light = await resolveTokens(['tokens/semantic/light/**/*.json'], ['tokens/primitives/**/*.json']);
const dark = await resolveTokens(['tokens/semantic/dark/**/*.json'], ['tokens/primitives/**/*.json']);
const shared = await resolveTokens(['tokens/shared/**/*.json']);

const group = (tokens: Token[], name: string) => tokens.filter((t) => t.path[0] === name);
const colorName = (t: Token) => t.path.slice(1).join('-');

const lightColors = group(light, 'color');
const darkColors = group(dark, 'color');
const radius = group(shared, 'radius');
const text = group(shared, 'text');
const shadow = group(shared, 'shadow');
const duration = group(shared, 'duration');
const ease = group(shared, 'ease');
const breakpoint = group(shared, 'breakpoint');
const fontWeight = group(shared, 'font-weight');
const zIndex = group(shared, 'z-index');
const opacity = group(shared, 'opacity');
const font = group(shared, 'font');
/** font.sans.ios → ['sans', 'ios'] */
const fontValue = (family: string, platform: string) =>
  font.find((t) => t.path[1] === family && t.path[2] === platform)?.value ?? '';
const families = [...new Set(font.map((t) => t.path[1] ?? ''))];

// Cada color semántico debe existir en ambos temas: si no, un tema queda con huecos.
const lightNames = new Set(lightColors.map(colorName));
const darkNames = new Set(darkColors.map(colorName));
for (const name of lightNames) {
  if (!darkNames.has(name)) throw new Error(`El token de color "${name}" no existe en el tema dark`);
}
for (const name of darkNames) {
  if (!lightNames.has(name)) throw new Error(`El token de color "${name}" no existe en el tema light`);
}

const BANNER = '/* Generado por @chroma-yesid/tokens (pnpm --filter @chroma-yesid/tokens build). No editar a mano. */';

/** Web usa rem (respeta el tamaño de fuente del usuario); native usa px. */
const toRem = (px: string) => `${Number.parseFloat(px) / 16}rem`;

/** Estilo de texto: tamaño y alto de línea en px; `letterSpacing` en em (como en el token). */
interface TextStyle {
  size: number;
  lineHeight: number;
  letterSpacing: number;
}

/** Agrupa `text.<nombre>.size|line-height|letter-spacing` por nombre. */
const textStyles: Record<string, TextStyle> = {};
for (const t of text) {
  const [, name, prop] = t.path;
  if (!name) continue;
  const style = (textStyles[name] ??= { size: 0, lineHeight: 0, letterSpacing: 0 });
  const value = Number.parseFloat(t.value);
  if (prop === 'size') style.size = value;
  else if (prop === 'line-height') style.lineHeight = value;
  else if (prop === 'letter-spacing') style.letterSpacing = value;
  else throw new Error(`Propiedad de texto desconocida: text.${name}.${String(prop)}`);
}
for (const [name, style] of Object.entries(textStyles)) {
  if (!style.size || !style.lineHeight) throw new Error(`El texto "${name}" necesita size y line-height`);
}

const round2 = (n: number) => Math.round(n * 100) / 100;
/**
 * Native recibe el espaciado entre letras en px: Uniwind resuelve `em` contra 16px (`--uniwind-em`)
 * y no contra el tamaño del propio texto, así que `-0.02em` saldría mal calculado.
 */
const letterSpacingPx = (style: TextStyle) => round2(style.letterSpacing * style.size);

/**
 * Variables de texto: `--text-body-md`, `--text-body-md--line-height` y, si el estilo lo define,
 * `--text-body-md--letter-spacing` (Tailwind las lee las tres al usar `text-body-md`).
 */
function textVars(format: { length: (px: number) => string; letterSpacing: (style: TextStyle) => string }): string[] {
  return Object.entries(textStyles).flatMap(([name, style]) => [
    `  --text-${name}: ${format.length(style.size)};`,
    `  --text-${name}--line-height: ${format.length(style.lineHeight)};`,
    ...(style.letterSpacing ? [`  --text-${name}--letter-spacing: ${format.letterSpacing(style)};`] : []),
  ]);
}

const lines = (items: string[]) => items.join('\n');

// ── web.css (Tailwind v4) ────────────────────────────────────────────────────
const webCss = `${BANNER}
@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));

@theme {
  /* La paleta por defecto de Tailwind se elimina: solo existen colores semánticos. */
  --color-*: initial;
  --color-transparent: transparent;
  --color-current: currentColor;

${lines(radius.map((t) => `  --radius-${t.path[1]}: ${toRem(t.value)};`))}

  /* Igual con los tamaños y pesos de texto: text-xs…text-9xl y font-light/black dejan de existir. */
  --text-*: initial;
  --font-weight-*: initial;

${lines(textVars({ length: (px) => `${px / 16}rem`, letterSpacing: (style) => `${style.letterSpacing}em` }))}

${lines(fontWeight.map((t) => `  --font-weight-${t.path[1]}: ${t.value};`))}

${lines(zIndex.map((t) => `  --z-index-${t.path[1]}: ${t.value};`))}

${lines(opacity.map((t) => `  --opacity-${t.path[1]}: ${t.value};`))}

${lines(shadow.map((t) => `  --shadow-${t.path[1]}: ${t.value};`))}

${lines(ease.map((t) => `  --ease-${t.path[1]}: ${t.value};`))}

${lines(breakpoint.map((t) => `  --breakpoint-${t.path[1]}: ${toRem(t.value)};`))}

${lines(families.map((f) => `  --font-${f}: ${fontValue(f, 'web')};`))}

  /* Barra de progreso indeterminada: un tramo que cruza la pista (utilidad animate-indeterminate). */
  --animate-indeterminate: indeterminate 1.4s var(--ease-standard) infinite;

  @keyframes indeterminate {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(250%);
    }
  }
}

/* Duraciones: no son un namespace de Tailwind; se usan como duration-(--ds-duration-base). */
:root {
${lines(duration.map((t) => `  --ds-duration-${t.path[1]}: ${t.value};`))}
}

/* "inline" hace que bg-primary emita var(--ds-primary) directamente, así el cambio de
   tema funciona aunque las variables vivan fuera de :root. */
@theme inline {
${lines(lightColors.map((t) => `  --color-${colorName(t)}: var(--ds-${colorName(t)});`))}
}

/* Tema claro por defecto; el oscuro se activa con data-theme="dark" en <html>. */
:root,
[data-theme="light"] {
  color-scheme: light;
${lines(lightColors.map((t) => `  --ds-${colorName(t)}: ${t.value};`))}
}

[data-theme="dark"] {
  color-scheme: dark;
${lines(darkColors.map((t) => `  --ds-${colorName(t)}: ${t.value};`))}
}

/* Movimiento reducido: la preferencia del sistema gana a cualquier animación o transición,
   también a las de componentes de terceros. Las duraciones no llegan a 0 para que los eventos
   de fin de transición (transitionend) sigan disparándose. */
@media (prefers-reduced-motion: reduce) {
  :root {
    --ds-duration-fast: 1ms;
    --ds-duration-base: 1ms;
    --ds-duration-slow: 1ms;
  }

  *,
  *::before,
  *::after {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
    scroll-behavior: auto !important;
  }
}
`;

// ── native.css (Uniwind) ─────────────────────────────────────────────────────
const nativeCss = `${BANNER}
@theme {
${lines(radius.map((t) => `  --radius-${t.path[1]}: ${t.value};`))}

  --text-*: initial;
  --font-weight-*: initial;

${lines(textVars({ length: (px) => `${px}px`, letterSpacing: (style) => `${letterSpacingPx(style)}px` }))}

${lines(fontWeight.map((t) => `  --font-weight-${t.path[1]}: ${t.value};`))}

${lines(opacity.map((t) => `  --opacity-${t.path[1]}: ${t.value};`))}

${lines(shadow.map((t) => `  --shadow-${t.path[1]}: ${t.value};`))}
}

@layer theme {
  :root {
    @variant ios {
${lines(families.map((f) => `      --font-${f}: ${fontValue(f, 'ios')};`))}
    }

    @variant android {
${lines(families.map((f) => `      --font-${f}: ${fontValue(f, 'android')};`))}
    }

    @variant light {
${lines(lightColors.map((t) => `      --color-${colorName(t)}: ${t.value};`))}
    }

    @variant dark {
${lines(darkColors.map((t) => `      --color-${colorName(t)}: ${t.value};`))}
    }
  }
}
`;

// ── index.js / index.d.ts (constantes TypeScript) ────────────────────────────
const colorsObject = (tokens: Token[]) =>
  Object.fromEntries(tokens.map((t) => [colorName(t), t.value]));
const radiusObject = Object.fromEntries(radius.map((t) => [t.path[1], Number.parseFloat(t.value)]));
const textObject = Object.fromEntries(
  Object.entries(textStyles).map(([name, style]) => [
    name,
    { size: style.size, lineHeight: style.lineHeight, letterSpacing: letterSpacingPx(style) },
  ]),
);

/** `cubic-bezier(0.2, 0, 0, 1)` → `[0.2, 0, 0, 1]`, el formato de `Easing.bezier(...)` en React Native. */
function parseBezier(name: string, value: string): [number, number, number, number] {
  const match = /^cubic-bezier\(([^)]+)\)$/.exec(value);
  const nums = match?.[1]?.split(',').map((n) => Number.parseFloat(n)) ?? [];
  if (nums.length !== 4 || nums.some(Number.isNaN)) throw new Error(`La curva "${name}" no es un cubic-bezier válido: ${value}`);
  return nums as [number, number, number, number];
}

const constants = {
  colors: { light: colorsObject(lightColors), dark: colorsObject(darkColors) },
  radius: radiusObject,
  text: textObject,
  shadow: Object.fromEntries(shadow.map((t) => [t.path[1], t.value])),
  duration: Object.fromEntries(duration.map((t) => [t.path[1], Number.parseFloat(t.value)])),
  ease: Object.fromEntries(ease.map((t) => [t.path[1], t.value])),
  easing: Object.fromEntries(ease.map((t) => [t.path[1], parseBezier(t.path[1] ?? '', t.value)])),
  fontWeight: Object.fromEntries(fontWeight.map((t) => [t.path[1], Number.parseInt(t.value, 10)])),
  zIndex: Object.fromEntries(zIndex.map((t) => [t.path[1], Number.parseInt(t.value, 10)])),
  opacity: Object.fromEntries(opacity.map((t) => [t.path[1], Number.parseFloat(t.value)])),
  breakpoint: Object.fromEntries(breakpoint.map((t) => [t.path[1], Number.parseFloat(t.value)])),
  fontFamily: Object.fromEntries(
    families.map((f) => [f, { web: fontValue(f, 'web'), ios: fontValue(f, 'ios'), android: fontValue(f, 'android') }]),
  ),
};

const indexJs = `// Generado por @chroma-yesid/tokens. No editar a mano.
export const colors = ${JSON.stringify(constants.colors, null, 2)};

/** Radios en px. */
export const radius = ${JSON.stringify(constants.radius, null, 2)};

/** Tamaño de fuente, alto de línea y espaciado entre letras, los tres en px. */
export const text = ${JSON.stringify(constants.text, null, 2)};

/** Pesos de fuente (400–700). */
export const fontWeight = ${JSON.stringify(constants.fontWeight, null, 2)};

/** Sombras como valor CSS box-shadow (web y React Native 0.76+). */
export const shadow = ${JSON.stringify(constants.shadow, null, 2)};

/** Duraciones en ms. */
export const duration = ${JSON.stringify(constants.duration, null, 2)};

/** Curvas como valor CSS \`cubic-bezier(...)\`. */
export const ease = ${JSON.stringify(constants.ease, null, 2)};

/** Las mismas curvas como \`[x1, y1, x2, y2]\`, para \`Easing.bezier(...easing.standard)\` en React Native. */
export const easing = ${JSON.stringify(constants.easing)};

/** Capas z-index. Solo web: en native el orden lo da el Modal. */
export const zIndex = ${JSON.stringify(constants.zIndex, null, 2)};

/** Opacidades (0–1). */
export const opacity = ${JSON.stringify(constants.opacity, null, 2)};

/** Breakpoints en px. */
export const breakpoint = ${JSON.stringify(constants.breakpoint, null, 2)};

export const fontFamily = ${JSON.stringify(constants.fontFamily, null, 2)};
`;

const union = (keys: string[]) => keys.map((k) => JSON.stringify(k)).join(' | ');
const names = (tokens: Token[]) => union(tokens.map((t) => t.path[1] ?? ''));
const indexDts = `// Generado por @chroma-yesid/tokens. No editar a mano.
export type ColorToken = ${union([...lightNames])};
export type RadiusToken = ${names(radius)};
export type TextToken = ${union(Object.keys(textObject))};
export type FontWeightToken = ${names(fontWeight)};
export type ShadowToken = ${names(shadow)};
export type DurationToken = ${names(duration)};
export type EaseToken = ${names(ease)};
export type ZIndexToken = ${names(zIndex)};
export type OpacityToken = ${names(opacity)};
export type ThemeName = 'light' | 'dark';

export declare const colors: Record<ThemeName, Record<ColorToken, string>>;
export declare const radius: Record<RadiusToken, number>;
export declare const text: Record<TextToken, { size: number; lineHeight: number; letterSpacing: number }>;
export declare const fontWeight: Record<FontWeightToken, number>;
export declare const shadow: Record<ShadowToken, string>;
export declare const duration: Record<DurationToken, number>;
export declare const ease: Record<EaseToken, string>;
export declare const easing: Record<EaseToken, [number, number, number, number]>;
export declare const zIndex: Record<ZIndexToken, number>;
export declare const opacity: Record<OpacityToken, number>;
export declare const breakpoint: Record<${names(breakpoint)}, number>;
export declare const fontFamily: Record<${union(families)}, { web: string; ios: string; android: string }>;
`;

// ── tw-merge ─────────────────────────────────────────────────────────────────
// tailwind-merge clasifica `text-<valor desconocido>` como color. Sin esto,
// `text-body-md` (tamaño) y `text-foreground` (color) se pisan entre sí.
// Lo mismo pasa con `z-overlay` y `opacity-disabled`: sin declararlos, tailwind-merge no sabe
// que son del mismo grupo y conserva los dos en vez de quedarse con el último.
const textNames = Object.keys(textObject);
const zIndexNames = zIndex.map((t) => t.path[1] ?? '');
const opacityNames = opacity.map((t) => t.path[1] ?? '');
const twMergeJs = `// Generado por @chroma-yesid/tokens. No editar a mano.
export const twMergeConfig = {
  extend: {
    theme: {
      text: ${JSON.stringify(textNames)},
    },
    classGroups: {
      z: [{ z: ${JSON.stringify(zIndexNames)} }],
      opacity: [{ opacity: ${JSON.stringify(opacityNames)} }],
    },
  },
};
`;
const twMergeDts = `// Generado por @chroma-yesid/tokens. No editar a mano.
export declare const twMergeConfig: {
  extend: {
    theme: { text: string[] };
    classGroups: { z: { z: string[] }[]; opacity: { opacity: string[] }[] };
  };
};
`;

// ── tokens.json (para las páginas de Foundations) ────────────────────────────
const docsTokens = [
  ...[...lightNames].map((name) => ({
    name,
    type: 'color',
    cssVar: `--color-${name}`,
    values: {
      light: lightColors.find((t) => colorName(t) === name)?.value,
      dark: darkColors.find((t) => colorName(t) === name)?.value,
    },
    description: lightColors.find((t) => colorName(t) === name)?.description,
  })),
  ...radius.map((t) => ({
    name: t.path[1],
    type: 'radius',
    cssVar: `--radius-${t.path[1]}`,
    values: { all: t.value },
  })),
  ...Object.entries(textStyles).map(([name, v]) => ({
    name,
    type: 'text',
    cssVar: `--text-${name}`,
    values: {
      all: `${v.size}px / ${v.lineHeight}px`,
      ...(v.letterSpacing ? { letterSpacing: `${v.letterSpacing}em` } : {}),
    },
  })),
  ...fontWeight.map((t) => ({ name: t.path[1], type: 'font-weight', cssVar: `--font-weight-${t.path[1]}`, values: { all: t.value } })),
  ...zIndex.map((t) => ({ name: t.path[1], type: 'z-index', cssVar: `--z-index-${t.path[1]}`, values: { all: t.value }, description: t.description })),
  ...opacity.map((t) => ({ name: t.path[1], type: 'opacity', cssVar: `--opacity-${t.path[1]}`, values: { all: t.value }, description: t.description })),
  ...shadow.map((t) => ({ name: t.path[1], type: 'shadow', cssVar: `--shadow-${t.path[1]}`, values: { all: t.value }, description: t.description })),
  ...duration.map((t) => ({ name: t.path[1], type: 'duration', cssVar: `--ds-duration-${t.path[1]}`, values: { all: t.value } })),
  ...ease.map((t) => ({ name: t.path[1], type: 'ease', cssVar: `--ease-${t.path[1]}`, values: { all: t.value } })),
  ...breakpoint.map((t) => ({ name: t.path[1], type: 'breakpoint', cssVar: `--breakpoint-${t.path[1]}`, values: { all: t.value } })),
  ...families.map((f) => ({ name: f, type: 'font', cssVar: `--font-${f}`, values: { web: fontValue(f, 'web'), ios: fontValue(f, 'ios'), android: fontValue(f, 'android') } })),
];

await mkdir(dist, { recursive: true });
await Promise.all([
  writeFile(path.join(dist, 'web.css'), webCss),
  writeFile(path.join(dist, 'native.css'), nativeCss),
  writeFile(path.join(dist, 'index.js'), indexJs),
  writeFile(path.join(dist, 'index.d.ts'), indexDts),
  writeFile(path.join(dist, 'tw-merge.js'), twMergeJs),
  writeFile(path.join(dist, 'tw-merge.d.ts'), twMergeDts),
  writeFile(path.join(dist, 'tokens.json'), `${JSON.stringify(docsTokens, null, 2)}\n`),
]);

console.log(
  `tokens: ${lightNames.size} colores × 2 temas, ${radius.length} radios, ${textNames.length} estilos de texto, ${fontWeight.length} pesos, ${zIndex.length} capas, ${opacity.length} opacidades → dist/`,
);
