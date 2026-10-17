/** Trazos de 24x24 (estilo Lucide, `stroke="currentColor"`). Compartidos por web y native. */
export const iconPaths = {
  check: 'M20 6 9 17l-5-5',
  x: 'M18 6 6 18M6 6l12 12',
  plus: 'M12 5v14M5 12h14',
  'chevron-right': 'm9 18 6-6-6-6',
  info: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM12 16v-4M12 8h.01',
  alert: 'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3ZM12 9v4M12 17h.01',
} as const;

export type IconName = keyof typeof iconPaths;
