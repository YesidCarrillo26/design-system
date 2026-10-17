import Svg, { Path } from 'react-native-svg';
import { useTokenColor } from '../../lib/useTokenColor.native';
import type { IconBaseProps } from './Icon.types';
import { iconSizePx, iconToneToken } from './icon.variants';
import { iconPaths } from './icons';

export type IconProps = IconBaseProps;

/** Ícono SVG. Decorativo salvo que se indique `label`. */
export function Icon({ name, size = 'md', tone = 'default', label }: IconProps) {
  const px = iconSizePx[size];
  const color = useTokenColor(iconToneToken[tone]);
  return (
    <Svg
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      accessible={!!label}
      accessibilityLabel={label}
      importantForAccessibility={label ? 'yes' : 'no-hide-descendants'}
    >
      <Path d={iconPaths[name]} />
    </Svg>
  );
}
