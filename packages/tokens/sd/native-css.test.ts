import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { text } from '../dist/index.js';

const css = await readFile(new URL('../dist/native.css', import.meta.url), 'utf8');

test('native.css da el espaciado entre letras en px: Uniwind resuelve em contra 16px, no contra el texto', () => {
  // -0.022em × 36px = -0.792px
  assert.match(css, /--text-display--letter-spacing: -0\.79px;/);
  // 0.04em × 12px = 0.48px
  assert.match(css, /--text-overline--letter-spacing: 0\.48px;/);
  assert.doesNotMatch(css, /letter-spacing: [-\d.]+em/);
});

test('native.css y la constante `text` coinciden en el espaciado entre letras', () => {
  assert.equal(text.display.letterSpacing, -0.79);
  assert.equal(text['body-md'].letterSpacing, 0);
});

test('native.css elimina los tamaños y pesos por defecto y define los del DS', () => {
  assert.match(css, /--text-\*: initial;/);
  assert.match(css, /--font-weight-\*: initial;/);
  assert.match(css, /--font-weight-medium: 500;/);
  assert.match(css, /--opacity-pressed: 0\.8;/);
});

test('native.css no incluye z-index: en native el orden lo da el Modal', () => {
  assert.doesNotMatch(css, /z-index/);
});
