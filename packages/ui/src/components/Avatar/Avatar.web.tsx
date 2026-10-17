'use client';

import { tv } from '../../lib/tv';
import type { AvatarBaseProps } from './Avatar.types';
import { avatarStyles } from './avatar.variants';
import { initials, useAvatar } from './useAvatar';

const avatarWebStyles = tv({ extend: avatarStyles, slots: { root: 'inline-flex' } });

export type AvatarProps = AvatarBaseProps;

/** Imagen de perfil con iniciales como respaldo. */
export function Avatar({ name, src, size, className }: AvatarProps) {
  const { showImage, onError } = useAvatar(src);
  const { root, label, image } = avatarWebStyles({ size });
  return (
    <span role="img" aria-label={name} className={root({ className })}>
      {showImage ? (
        <img src={src} alt="" onError={onError} className={image()} />
      ) : (
        <span aria-hidden className={label()}>{initials(name)}</span>
      )}
    </span>
  );
}
