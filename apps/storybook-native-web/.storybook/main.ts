import tailwindcss from '@tailwindcss/vite';
import type { StorybookConfig } from '@storybook/react-native-web-vite';
import { uniwind } from 'uniwind/vite';
import { mergeConfig } from 'vite';
import { preferNativeSuffix } from './prefer-native';

// Mismas stories que el Storybook on-device: compartidas, sin las exclusivas de web.
const ui = '../../../packages/ui/src';

const config: StorybookConfig = {
  framework: '@storybook/react-native-web-vite',
  stories: [
    { directory: `${ui}/components`, titlePrefix: 'Components', files: '**/!(*.web).stories.tsx' },
    { directory: `${ui}/patterns`, titlePrefix: 'Patterns', files: '**/!(*.web).stories.tsx' },
  ],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  viteFinal: (viteConfig) =>
    mergeConfig(viteConfig, {
      plugins: [preferNativeSuffix(), tailwindcss(), uniwind({ cssEntryFile: './src/global.css', dtsFile: './src/uniwind-types.d.ts' })],
    }),
};

export default config;
