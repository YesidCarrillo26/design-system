import assert from 'node:assert/strict';
import { test } from 'node:test';
import { extendTailwindMerge } from 'tailwind-merge';
import { twMergeConfig } from '../dist/tw-merge.js';

const merge = extendTailwindMerge(twMergeConfig);

test('un tamaño de texto del DS y un color semántico conviven', () => {
  assert.equal(merge('text-body-md text-foreground'), 'text-body-md text-foreground');
});

test('dos tamaños del DS se resuelven a favor del último', () => {
  assert.equal(merge('text-body-sm text-body-lg'), 'text-body-lg');
});

test('dos colores semánticos se resuelven a favor del último', () => {
  assert.equal(merge('text-foreground text-muted-foreground'), 'text-muted-foreground');
});

test('sin la configuración del DS, tailwind-merge pisa el tamaño (el bug que evitamos)', () => {
  const plain = extendTailwindMerge({});
  assert.equal(plain('text-body-md text-foreground'), 'text-foreground');
});

test('los estilos de texto nuevos (display, heading-*) conviven con colores y se pisan entre sí', () => {
  assert.equal(merge('text-heading-lg text-foreground'), 'text-heading-lg text-foreground');
  assert.equal(merge('text-display text-heading-sm'), 'text-heading-sm');
});

test('z-overlay y z-popover son del mismo grupo: gana el último', () => {
  assert.equal(merge('z-overlay z-popover'), 'z-popover');
  assert.equal(merge('z-popover z-10'), 'z-10');
});

test('opacity-disabled y opacity-pressed son del mismo grupo: gana el último', () => {
  assert.equal(merge('opacity-disabled opacity-pressed'), 'opacity-pressed');
  assert.equal(merge('opacity-pressed opacity-50'), 'opacity-50');
});

test('los pesos del DS se resuelven a favor del último', () => {
  assert.equal(merge('font-medium font-semibold'), 'font-semibold');
});
