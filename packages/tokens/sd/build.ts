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

const BANNER = '/* Generado por @yesid/tokens (pnpm --filter @yesid/tokens build). No editar a mano. */';

/** Web usa rem (respeta el tamaño de fuente del usuario); native usa px. */
const toRem = (px: string) => `${Number.parseFloat(px) / 16}rem`;

/** Variables de texto: `text.body-md.size` → `--text-body-md`, `...line-height` → `--text-body-md--line-height`. */
function textVars(format: (px: string) => string): string[] {
  return text.map((t) => {
    const [, name, prop] = t.path;
    const suffix = prop === 'line-height' ? '--line-height' : '';
    return `  --text-${name}${suffix}: ${format(t.value)};`;
  });
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

${lines(textVars(toRem))}

${lines(shadow.map((t) => `  --shadow-${t.path[1]}: ${t.value};`))}

${lines(ease.map((t) => `  --ease-${t.path[1]}: ${t.value};`))}

${lines(breakpoint.map((t) => `  --breakpoint-${t.path[1]}: ${toRem(t.value)};`))}

${lines(families.map((f) => `  --font-${f}: ${fontValue(f, 'web')};`))}
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

${lines(textVars((px) => px))}

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
const textObject: Record<string, { size: number; lineHeight: number }> = {};
for (const t of text) {
  const [, name, prop] = t.path;
  if (!name) continue;
  const entry = (textObject[name] ??= { size: 0, lineHeight: 0 });
  if (prop === 'size') entry.size = Number.parseFloat(t.value);
  else entry.lineHeight = Number.parseFloat(t.value);
}

const constants = {
  colors: { light: colorsObject(lightColors), dark: colorsObject(darkColors) },
  radius: radiusObject,
  text: textObject,
  shadow: Object.fromEntries(shadow.map((t) => [t.path[1], t.value])),
  duration: Object.fromEntries(duration.map((t) => [t.path[1], Number.parseFloat(t.value)])),
  ease: Object.fromEntries(ease.map((t) => [t.path[1], t.value])),
  breakpoint: Object.fromEntries(breakpoint.map((t) => [t.path[1], Number.parseFloat(t.value)])),
  fontFamily: Object.fromEntries(
    families.map((f) => [f, { web: fontValue(f, 'web'), ios: fontValue(f, 'ios'), android: fontValue(f, 'android') }]),
  ),
};

const indexJs = `// Generado por @yesid/tokens. No editar a mano.
export const colors = ${JSON.stringify(constants.colors, null, 2)};

/** Radios en px. */
export const radius = ${JSON.stringify(constants.radius, null, 2)};

/** Tamaño de fuente y alto de línea en px. */
export const text = ${JSON.stringify(constants.text, null, 2)};

/** Sombras como valor CSS box-shadow (web y React Native 0.76+). */
export const shadow = ${JSON.stringify(constants.shadow, null, 2)};

/** Duraciones en ms. */
export const duration = ${JSON.stringify(constants.duration, null, 2)};

export const ease = ${JSON.stringify(constants.ease, null, 2)};

/** Breakpoints en px. */
export const breakpoint = ${JSON.stringify(constants.breakpoint, null, 2)};

export const fontFamily = ${JSON.stringify(constants.fontFamily, null, 2)};
`;

const union = (keys: string[]) => keys.map((k) => JSON.stringify(k)).join(' | ');
const indexDts = `// Generado por @yesid/tokens. No editar a mano.
export type ColorToken = ${union([...lightNames])};
export type RadiusToken = ${union(radius.map((t) => t.path[1] ?? ''))};
export type TextToken = ${union(Object.keys(textObject))};
export type ThemeName = 'light' | 'dark';

export declare const colors: Record<ThemeName, Record<ColorToken, string>>;
export declare const radius: Record<RadiusToken, number>;
export declare const text: Record<TextToken, { size: number; lineHeight: number }>;
export declare const shadow: Record<'sm' | 'md' | 'lg', string>;
export declare const duration: Record<'fast' | 'base' | 'slow', number>;
export declare const ease: Record<'standard' | 'in' | 'out', string>;
export declare const breakpoint: Record<'sm' | 'md' | 'lg' | 'xl', number>;
export declare const fontFamily: Record<'sans' | 'mono', { web: string; ios: string; android: string }>;
`;

// ── tw-merge ─────────────────────────────────────────────────────────────────
// tailwind-merge clasifica `text-<valor desconocido>` como color. Sin esto,
// `text-body-md` (tamaño) y `text-foreground` (color) se pisan entre sí.
const textNames = Object.keys(textObject);
const twMergeJs = `// Generado por @yesid/tokens. No editar a mano.
export const twMergeConfig = {
  extend: {
    theme: {
      text: ${JSON.stringify(textNames)},
    },
  },
};
`;
const twMergeDts = `// Generado por @yesid/tokens. No editar a mano.
export declare const twMergeConfig: {
  extend: { theme: { text: string[] } };
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
  ...Object.entries(textObject).map(([name, v]) => ({
    name,
    type: 'text',
    cssVar: `--text-${name}`,
    values: { all: `${v.size}px / ${v.lineHeight}px` },
  })),
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
  `tokens: ${lightNames.size} colores × 2 temas, ${radius.length} radios, ${textNames.length} tamaños de texto → dist/`,
);
