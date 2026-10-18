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
