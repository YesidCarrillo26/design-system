import { Text as RNText, type TextProps as RNTextProps } from 'react-native';
import type { TextBaseProps } from './Text.types';
import { textStyles } from './text.variants';

export type TextProps = TextBaseProps & Omit<RNTextProps, keyof TextBaseProps>;

/** Texto con la escala tipográfica y los colores semánticos del design system. */
export function Text({ variant, tone, className, ...props }: TextProps) {
  return <RNText className={textStyles({ variant, tone, className })} {...props} />;
}
