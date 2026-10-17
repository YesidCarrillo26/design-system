import type { StorybookConfig } from '@storybook/react-vite';

// Los componentes viven en el paquete; este Storybook solo los muestra. `titlePrefix` agrupa
// todo bajo "Components", y el glob excluye las stories exclusivas de native.
const components = '../../../packages/ui/src/components';

const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: [
    { directory: components, titlePrefix: 'Components', files: '**/!(*.native).stories.tsx' },
    '../docs/**/*.mdx',
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
    '@storybook/addon-themes',
    '@storybook/addon-designs',
    'storybook-addon-pseudo-states',
    '@chromatic-com/storybook',
    // Expone /mcp en el servidor de desarrollo para que agentes (Claude Code) consulten los componentes.
    '@storybook/addon-mcp',
  ],
  features: { experimentalCodeExamples: true },
  typescript: {
    // react-docgen-typescript sí resuelve props heredadas de `ButtonBaseProps` (otro archivo),
    // que es de donde sale la documentación de los controles.
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      // Deja fuera las ~200 props del DOM heredadas de React.
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
};

export default config;
