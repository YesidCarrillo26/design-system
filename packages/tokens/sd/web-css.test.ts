import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

const css = await readFile(new URL('../dist/web.css', import.meta.url), 'utf8');

test('web.css respeta prefers-reduced-motion', () => {
  const block = css.slice(css.indexOf('@media (prefers-reduced-motion: reduce)'));
  assert.match(block, /animation-duration: 1ms !important/);
  assert.match(block, /transition-duration: 1ms !important/);
  assert.match(block, /--ds-duration-base: 1ms/);
});

test('web.css no desactiva el movimiento fuera de la media query', () => {
  const outside = css.slice(0, css.indexOf('@media (prefers-reduced-motion: reduce)'));
  assert.doesNotMatch(outside, /animation-duration: 1ms/);
});

test('web.css elimina los tamaños y pesos por defecto de Tailwind', () => {
  assert.match(css, /--text-\*: initial;/);
  assert.match(css, /--font-weight-\*: initial;/);
});

test('web.css define el espaciado entre letras en em, relativo al tamaño de cada texto', () => {
  assert.match(css, /--text-display--letter-spacing: -0\.022em;/);
  assert.match(css, /--text-overline--letter-spacing: 0\.04em;/);
});

test('web.css define pesos, capas y opacidades', () => {
  assert.match(css, /--font-weight-semibold: 600;/);
  assert.match(css, /--z-index-overlay: 40;/);
  assert.match(css, /--opacity-disabled: 0\.5;/);
});
