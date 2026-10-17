// Modos de Chromatic: cada story se captura en estas combinaciones de tema y viewport.
// Los valores de `viewport` son las claves de `parameters.viewport.options` (preview.tsx).
// Cada modo multiplica los snapshots, así que se usan dos por defecto.
export const chromaticModes = {
  'light-mobile': { theme: 'light', viewport: 'mobile' },
  'dark-desktop': { theme: 'dark', viewport: 'desktop' },
};
