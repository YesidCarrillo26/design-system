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
