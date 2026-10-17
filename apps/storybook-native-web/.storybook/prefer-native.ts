import type { Plugin } from 'vite';

/**
 * El framework `react-native-web-vite` resuelve `.web.tsx` primero, que en packages/ui son las
 * implementaciones de DOM. Este plugin hace lo contrario SOLO para los archivos de packages/ui:
 * `import './Button'` → `Button.native.tsx` si existe.
 *
 * Las librerías de terceros (react-native-web, reanimated…) no pasan por aquí y siguen
 * resolviendo sus propios `.web.js`.
 */
export function preferNativeSuffix(): Plugin {
  return {
    name: 'yesid:prefer-native-suffix',
    enforce: 'pre',
    async resolveId(source, importer, options) {
      if (!importer || !source.startsWith('.') || !importer.includes('/packages/ui/src/')) return null;
      for (const suffix of ['.native.tsx', '.native.ts']) {
        const resolved = await this.resolve(source + suffix, importer, { ...options, skipSelf: true });
        if (resolved) return resolved;
      }
      return null;
    },
  };
}
