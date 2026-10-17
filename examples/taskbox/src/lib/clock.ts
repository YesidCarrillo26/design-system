/**
 * Reloj de la app. Vive en su propio módulo para poder simularlo en Storybook con `sb.mock`
 * (así las fechas de las stories y de Chromatic son siempre las mismas).
 */
export function now(): Date {
  return new Date();
}
