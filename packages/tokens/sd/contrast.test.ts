import assert from 'node:assert/strict';
import { test } from 'node:test';
import { colors } from '../dist/index.js';

/** Luminancia relativa WCAG 2.x de un color `#rrggbb`. */
function luminance(hex: string): number {
  const channels = [1, 3, 5].map((i) => {
    const c = Number.parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * (channels[0] ?? 0) + 0.7152 * (channels[1] ?? 0) + 0.0722 * (channels[2] ?? 0);
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return ((hi ?? 0) + 0.05) / ((lo ?? 0) + 0.05);
}

const STATUSES = ['primary', 'destructive', 'success', 'warning', 'info'] as const;

/** Pares texto/fondo que deben llegar a 4.5:1 (WCAG AA para texto normal). */
const textPairs: [text: string, background: string][] = [
  ['foreground', 'background'],
  ['foreground', 'muted'],
  ['card-foreground', 'card'],
  ['popover-foreground', 'popover'],
  ['muted-foreground', 'background'],
  ['muted-foreground', 'card'],
  ['muted-foreground', 'popover'],
  ['muted-foreground', 'muted'],
  ['secondary-foreground', 'secondary'],
  ['accent-foreground', 'accent'],
  // Enlaces y mensajes de error escritos directamente sobre una superficie.
  ['primary', 'background'],
  ['primary', 'card'],
  ['destructive', 'background'],
  ['destructive', 'card'],
  // Relleno de estado con su texto, y el texto suave sobre su fondo suave.
  ...STATUSES.map((s): [string, string] => [`${s}-foreground`, s]),
  ...STATUSES.map((s): [string, string] => [`${s}-subtle-foreground`, `${s}-subtle`]),
  // Texto e iconos de estado fuera de un contenedor suave: sobre fondo y tarjeta.
  ...STATUSES.filter((s) => s !== 'primary').flatMap((s): [string, string][] => [
    [`${s}-subtle-foreground`, 'background'],
    [`${s}-subtle-foreground`, 'card'],
  ]),
];

/** Pares de interfaz (no texto) que deben llegar a 3:1 (WCAG 1.4.11). */
const uiPairs: [string, string][] = [
  ['ring', 'background'],
  ['ring', 'card'],
];

// `border`, `input` y `overlay` quedan fuera a propósito: son decorativos o semitransparentes
// (ver ADR 0005). Los controles no dependen solo de su borde para ser identificables.

for (const theme of ['light', 'dark'] as const) {
  const palette = colors[theme] as Record<string, string>;
  const get = (name: string) => {
    const value = palette[name];
    assert.ok(value, `el token "${name}" no existe en el tema ${theme}`);
    return value;
  };

  for (const [fg, bg, min] of [
    ...textPairs.map(([a, b]): [string, string, number] => [a, b, 4.5]),
    ...uiPairs.map(([a, b]): [string, string, number] => [a, b, 3]),
  ]) {
    test(`[${theme}] ${fg} sobre ${bg} ≥ ${min}:1`, () => {
      const ratio = contrast(get(fg), get(bg));
      assert.ok(ratio >= min, `${fg} (${get(fg)}) sobre ${bg} (${get(bg)}) da ${ratio.toFixed(2)}:1, se pide ${min}:1`);
    });
  }
}
