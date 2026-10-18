import { colors } from '@yesid/tokens';
import { create } from 'storybook/theming';

// Marca del Storybook, tomada de los tokens (no se duplican colores).
const common = {
  brandTitle: 'Design System',
  brandUrl: 'https://github.com/YesidCarrillo26/design-system',
  fontBase: '"Inter", ui-sans-serif, system-ui, sans-serif',
} as const;

export const light = create({
  ...common,
  base: 'light',
  colorPrimary: colors.light.primary,
  colorSecondary: colors.light.primary,
  textColor: colors.light.foreground,
  appBg: colors.light.secondary,
  barBg: colors.light.background,
  appBorderColor: colors.light.border,
});

export const dark = create({
  ...common,
  base: 'dark',
  colorPrimary: colors.dark.primary,
  colorSecondary: colors.dark.primary,
  textColor: colors.dark.foreground,
  appBg: colors.dark.background,
  appContentBg: colors.dark.background,
  barBg: colors.dark.secondary,
  appBorderColor: colors.dark.border,
});

