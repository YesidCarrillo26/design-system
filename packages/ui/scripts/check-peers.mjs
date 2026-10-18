// Los peerDependencies de una librería publicada deben ser rangos, no versiones exactas:
// `catalog:` los resuelve a la versión exacta que dicta Expo y bloquearía a cualquier consumidor
// con otra versión (ver docs/learning/fase-9.md, 0.1.0).
import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const exact = /^\d+\.\d+\.\d+$/;
const bad = Object.entries(pkg.peerDependencies ?? {}).filter(([, range]) => exact.test(range) || range.startsWith('catalog:'));

if (bad.length > 0) {
  console.error(`peerDependencies con versión exacta o catalog: (usa un rango): ${bad.map(([n, r]) => `${n}@${r}`).join(', ')}`);
  process.exit(1);
}
console.log('check-peers: los peerDependencies son rangos.');
