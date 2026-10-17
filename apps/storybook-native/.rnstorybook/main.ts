import type { StorybookConfig } from '@storybook/react-native';

// Mismo origen y mismo `titlePrefix` que el Storybook web, así los títulos coinciden. El glob
// excluye las stories exclusivas de web (con play functions de DOM).
const components = '../../../packages/ui/src/components';
const patterns = '../../../packages/ui/src/patterns';

const main: StorybookConfig = {
  stories: [
    { directory: components, titlePrefix: 'Components', files: '**/!(*.web).stories.tsx' },
    { directory: patterns, titlePrefix: 'Patterns', files: '**/!(*.web).stories.tsx' },
  ],
  addons: [],
  deviceAddons: ['@storybook/addon-ondevice-controls', '@storybook/addon-ondevice-actions'],
};

export default main;
