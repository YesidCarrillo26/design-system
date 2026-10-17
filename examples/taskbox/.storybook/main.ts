import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-vitest', 'msw-storybook-addon'],
  // El service worker de MSW se sirve desde public/.
  staticDirs: ['../public'],
  // Composición: el Storybook del sistema de diseño aparece dentro de este, en el sidebar.
  // En desarrollo apunta al servidor local (pnpm storybook en apps/storybook-web); en producción
  // se define DS_STORYBOOK_URL con la URL publicada del sistema de diseño.
  refs: (_config, { configType }) => {
    const url = configType === 'DEVELOPMENT' ? 'http://localhost:6006' : process.env.DS_STORYBOOK_URL;
    return url ? { ds: { title: 'Design System', url } } : {};
  },
};

export default config;
