import { colors } from '@yesid/tokens';
import { create } from 'storybook/theming';

// Marca del Storybook, tomada de los tokens (no se duplican colores).
export default create({
  base: 'light',
  brandTitle: 'Design System',
  brandUrl: 'https://github.com/YesidCarrillo26/design-system',
  colorPrimary: colors.light.primary,
  colorSecondary: colors.light.primary,
  textColor: colors.light.foreground,
  appBg: colors.light.secondary,
  barBg: colors.light.background,
  appBorderColor: colors.light.border,
  fontBase: '"Inter", ui-sans-serif, system-ui, sans-serif',
});
