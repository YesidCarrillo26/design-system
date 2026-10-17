import { Image, Text, View } from 'react-native';
import type { AvatarBaseProps } from './Avatar.types';
import { avatarStyles } from './avatar.variants';
import { initials, useAvatar } from './useAvatar';

export type AvatarProps = AvatarBaseProps;

/** Imagen de perfil con iniciales como respaldo. */
export function Avatar({ name, src, size, className }: AvatarProps) {
  const { showImage, onError } = useAvatar(src);
  const { root, label, image } = avatarStyles({ size });
  return (
    <View accessible role="img" aria-label={name} className={root({ className })}>
      {showImage ? (
        <Image source={{ uri: src }} onError={onError} className={image()} accessibilityIgnoresInvertColors />
      ) : (
        <Text className={label()}>{initials(name)}</Text>
      )}
    </View>
  );
}
