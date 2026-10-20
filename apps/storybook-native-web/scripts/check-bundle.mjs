// Comprueba que el Storybook "native en el navegador" cargó las implementaciones NATIVE y no las web.
// Los componentes no se distinguen en el DOM (react-native-web convierte role="button" en <button>),
// así que se buscan clases que solo existen en una de las dos implementaciones.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const dir = new URL('../storybook-static/assets', import.meta.url).pathname;
const code = readdirSync(dir)
  .filter((file) => file.endsWith('.js'))
  .map((file) => readFileSync(join(dir, file), 'utf8'))
  .join('\n');

const mustHave = ['active:opacity-pressed']; // feedback al presionar: solo native
const mustNotHave = ['hover:opacity-90', 'focus-visible:ring-2', '@base-ui']; // solo web

const problems = [
  ...mustHave.filter((text) => !code.includes(text)).map((text) => `falta "${text}" (¿se cargó la implementación native?)`),
  ...mustNotHave.filter((text) => code.includes(text)).map((text) => `sobra "${text}" (se coló código web)`),
];

if (problems.length) {
  console.error(`check-bundle: ${problems.join('\n  ')}`);
  process.exit(1);
}
console.log('check-bundle: el bundle contiene solo las implementaciones native.');
