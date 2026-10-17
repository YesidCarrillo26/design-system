import { ActivityIndicator } from 'react-native';
import { useTokenColor } from '../../lib/useTokenColor.native';
import type { SpinnerBaseProps } from './Spinner.types';

export type SpinnerProps = SpinnerBaseProps;

/** Indicador de carga. */
export function Spinner({ size = 'md', label = 'Cargando' }: SpinnerProps) {
  const color = useTokenColor('primary');
  return (
    <ActivityIndicator
      size={size === 'lg' ? 'large' : 'small'}
      color={color}
      accessibilityLabel={label}
      accessibilityRole="progressbar"
    />
  );
}
