import { withThemeByDataAttribute } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react-vite';
import './preview.css';

const preview: Preview = {
  tags: ['autodocs'],
  decorators: [
    // Alterna data-theme="light|dark" en <html>: los tokens cambian solos.
    withThemeByDataAttribute({
      themes: { light: 'light', dark: 'dark' },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
    (Story) => (
      <div className="bg-background p-6 text-foreground">
        <Story />
      </div>
    ),
  ],
  parameters: {
    a11y: {
      // 'error' hace fallar el test de la story ante una violación; 'todo' la deja como aviso.
      test: 'error',
    },
    controls: {
      sort: 'requiredFirst',
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    // El fondo lo pone el tema (ver decorador), no el addon de backgrounds.
    backgrounds: { disabled: true },
    options: {
      storySort: {
        order: ['Introduction', 'Foundations', 'Components', 'Patterns', '*'],
      },
    },
  },
};

export default preview;
