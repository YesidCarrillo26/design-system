import { Text, type TextProps } from 'react-native';
import type { HeadingBaseProps } from './Heading.types';
import { headingStyles } from './heading.variants';

export type HeadingProps = HeadingBaseProps & Omit<TextProps, keyof HeadingBaseProps>;

/** Título con rol de encabezado para lectores de pantalla. */
export function Heading({ level = 2, tone, className, ...props }: HeadingProps) {
  return <Text role="heading" aria-level={level} className={headingStyles({ level, tone, className })} {...props} />;
}
