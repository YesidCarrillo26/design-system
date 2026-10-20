import { useEffect, useState } from 'react';
import { Animated, Easing, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useReducedMotion } from '../../lib/useReducedMotion.native';
import { useTokenColor } from '../../lib/useTokenColor.native';
import { Spinner } from '../Spinner';
import type { ProgressBaseProps } from './Progress.types';
import { progressPercent, progressStyles, ringMetrics, ringToneToken } from './progress.variants';

export type ProgressProps = ProgressBaseProps;

/** Tramo que cruza la pista en el modo indeterminado. Con movimiento reducido queda fijo y atenuado. */
function IndeterminateFill({ className }: { className: string }) {
  const reduced = useReducedMotion();
  const [progress] = useState(() => new Animated.Value(0));
  useEffect(() => {
    if (reduced) return;
    const loop = Animated.loop(Animated.timing(progress, { toValue: 1, duration: 1400, easing: Easing.inOut(Easing.ease), useNativeDriver: false }));
    loop.start();
    return () => loop.stop();
  }, [reduced, progress]);
  if (reduced) return <View className={`${className} w-full opacity-50`} />;
  return (
    <Animated.View style={{ width: '40%', height: '100%', transform: [{ translateX: progress.interpolate({ inputRange: [0, 1], outputRange: ['-100%', '250%'] }) }] }}>
      <View className={`${className} w-full`} />
    </Animated.View>
  );
}

/** Barra o anillo de progreso (`role="progressbar"` con `aria-valuenow`). Indeterminado si `value` es `null`. */
export function Progress({ label, value = null, max = 100, variant = 'linear', size = 'md', tone = 'primary', showValue = false, className }: ProgressProps) {
  const percent = progressPercent(value, max);
  const color = useTokenColor(ringToneToken[tone]);
  const track = useTokenColor('muted');
  const aria = {
    role: 'progressbar' as const,
    'aria-label': label,
    'aria-valuemin': 0,
    'aria-valuemax': max,
    'aria-valuenow': percent === null ? undefined : Math.min(Math.max(value ?? 0, 0), max),
  };

  if (variant === 'circular') {
    // Indeterminado: el spinner del sistema, que ya es un `progressbar` accesible.
    if (percent === null) return <Spinner size={size === 'sm' ? 'sm' : 'lg'} tone={tone === 'primary' ? 'primary' : 'muted'} label={label} />;
    const { px, stroke } = ringMetrics[size];
    const r = (px - stroke) / 2;
    const c = 2 * Math.PI * r;
    return (
      <View {...aria} accessible className={className} style={{ width: px, height: px }}>
        <Svg width={px} height={px} viewBox={`0 0 ${px} ${px}`} fill="none">
          <Circle cx={px / 2} cy={px / 2} r={r} stroke={track} strokeWidth={stroke} />
          <Circle
            cx={px / 2}
            cy={px / 2}
            r={r}
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - percent / 100)}
            rotation={-90}
            origin={`${px / 2}, ${px / 2}`}
          />
        </Svg>
        {showValue && size === 'lg' && (
          <View pointerEvents="none" className="absolute inset-0 items-center justify-center">
            <Text className="text-body-sm font-medium text-foreground">{percent}%</Text>
          </View>
        )}
      </View>
    );
  }

  const s = progressStyles({ size, tone });
  return (
    <View className={s.root({ className })}>
      <View {...aria} accessible className={s.track()}>
        {percent === null ? <IndeterminateFill className={s.fill()} /> : <View className={s.fill()} style={{ width: `${percent}%` }} />}
      </View>
      {showValue && percent !== null && <Text className={s.value()}>{percent}%</Text>}
    </View>
  );
}
