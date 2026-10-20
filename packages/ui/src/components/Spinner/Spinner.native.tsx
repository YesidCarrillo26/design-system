import { ActivityIndicator } from 'react-native';
import type { ColorToken } from '@chroma-yesid/tokens';
import { useTokenColor } from '../../lib/useTokenColor.native';
import type { SpinnerBaseProps, SpinnerTone } from './Spinner.types';

const toneToken: Record<SpinnerTone, ColorToken> = {
  primary: 'primary',
  muted: 'muted-foreground',
  'on-primary': 'primary-foreground',
  'on-secondary': 'secondary-foreground',
  'on-destructive': 'destructive-foreground',
};

export type SpinnerProps = SpinnerBaseProps;

/** Indicador de carga. */
export function Spinner({ size = 'md', tone = 'primary', label = 'Cargando' }: SpinnerProps) {
  const color = useTokenColor(toneToken[tone]);
  return (
    <ActivityIndicator
      size={size === 'lg' ? 'large' : 'small'}
      color={color}
      accessibilityLabel={label}
      role="progressbar"
      accessible
    />
  );
}
