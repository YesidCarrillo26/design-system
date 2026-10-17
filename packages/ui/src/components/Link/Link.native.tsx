import { Linking, Text, type TextProps } from 'react-native';
import type { LinkBaseProps } from './Link.types';
import { linkStyles } from './link.variants';

export type LinkProps = LinkBaseProps & Omit<TextProps, keyof LinkBaseProps>;

/** Enlace de texto: abre `href` con el sistema. */
export function Link({ href, onPress, className, ...props }: LinkProps) {
  return (
    <Text
      role="link"
      className={linkStyles({ className })}
      onPress={() => {
        onPress?.();
        void Linking.openURL(href);
      }}
      {...props}
    />
  );
}
