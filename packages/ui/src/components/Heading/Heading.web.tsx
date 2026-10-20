import type { ComponentPropsWithRef } from 'react';
import type { HeadingBaseProps } from './Heading.types';
import { defaultSizeForLevel, headingStyles } from './heading.variants';

export type HeadingProps = HeadingBaseProps & Omit<ComponentPropsWithRef<'h2'>, keyof HeadingBaseProps>;

/** Título con el elemento h1–h4 que corresponde al nivel. */
export function Heading({ level = 2, size = defaultSizeForLevel[level], tone, className, ...props }: HeadingProps) {
  const Tag = `h${level}` as const;
  return <Tag className={headingStyles({ size, tone, className })} {...props} />;
}
