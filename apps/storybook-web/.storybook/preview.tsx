import { withThemeByDataAttribute } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react-vite';
import { breakpoint } from '@yesid/tokens';
import './preview.css';
import { chromaticModes } from './modes';

// Viewports derivados de los breakpoints de los tokens.
const viewports = {
  mobile: { name: 'Mobile', styles: { width: '375px', height: '812px' } },
  tablet: { name: `Tablet (md ${breakpoint.md}px)`, styles: { width: `${breakpoint.md}px`, height: '1024px' } },
  desktop: { name: `Desktop (lg ${breakpoint.lg}px)`, styles: { width: `${breakpoint.lg}px`, height: '800px' } },
};

const preview: Preview = {
  tags: ['autodocs'],
  // Permite correr toda la suite de tests en tema oscuro: VITE_SB_THEME=dark.
  initialGlobals: { theme: import.meta.env.VITE_SB_THEME === 'dark' ? 'dark' : 'light' },
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
    viewport: { options: viewports },
    chromatic: { modes: chromaticModes },
    // El fondo lo pone el tema (ver decorador), no el addon de backgrounds.
    backgrounds: { disabled: true },
    options: {
      storySort: {
        order: ['Introduction', 'Foundations', ['Colors', 'Typography', 'Spacing', 'Radius', 'Elevation', 'Motion'], 'Components', 'Patterns', '*'],
      },
    },
  },
};

export default preview;
