import { type ColorToken, colors } from '@chroma-yesid/tokens';
import { useColorScheme } from 'react-native';

/**
 * Color de un token según el tema actual. Los componentes que no son estilizables con
 * `className` (íconos SVG, ActivityIndicator) necesitan un valor real, no una clase.
 */
export function useTokenColor(token: ColorToken): string {
  const scheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  return colors[scheme][token];
}
