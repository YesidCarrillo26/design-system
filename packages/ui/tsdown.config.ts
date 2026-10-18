import { defineConfig, type UserConfig } from 'tsdown';

// Dos builds del mismo código fuente: uno por plataforma. Cada uno resuelve su sufijo
// (.web / .native) primero y quita el sufijo del nombre de salida, así `./Button` en
// el JS y en los .d.ts apunta a un archivo que existe (dist/web/.../Button.js).
function build(platform: 'web' | 'native'): UserConfig {
  const other = platform === 'web' ? 'native' : 'web';
  return {
    entry: [
      'src/**/*.{ts,tsx}',
      '!src/**/*.stories.tsx',
      '!src/**/*.test.tsx',
      '!src/**/*.example.tsx',
      '!src/**/*.d.ts',
      `!src/**/*.${other}.*`,
    ],
    outDir: `dist/${platform}`,
    format: 'esm',
    platform: 'neutral',
    unbundle: true,
    sourcemap: true,
    clean: true,
    dts: { tsconfig: `tsconfig.${platform}.json` },
    tsconfig: `tsconfig.${platform}.json`,
    inputOptions: {
      resolve: { extensions: [`.${platform}.tsx`, `.${platform}.ts`, '.tsx', '.ts', '.js'] },
    },
    outputOptions: {
      entryFileNames: (chunk) => `${chunk.name.replace(/\.(web|native)$/, '')}.js`,
    },
  };
}

export default defineConfig([build('web'), build('native')]);
