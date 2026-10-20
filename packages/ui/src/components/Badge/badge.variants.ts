import { tv } from '../../lib/tv';
import type { IconTone } from '../Icon/Icon.types';
import type { BadgeAppearance, BadgeBaseProps, BadgeTone, BadgeVariant } from './Badge.types';

export const badgeStyles = tv({
  slots: {
    root: 'flex-row items-center gap-1 self-start rounded-full border px-2.5 py-0.5',
    label: 'text-caption font-medium',
  },
  variants: {
    tone: { neutral: {}, primary: {}, success: {}, warning: {}, info: {}, destructive: {} },
    appearance: { solid: {}, subtle: {}, outline: {} },
  },
  compoundVariants: [
    { tone: 'neutral', appearance: 'solid', class: { root: 'border-transparent bg-secondary', label: 'text-secondary-foreground' } },
    { tone: 'primary', appearance: 'solid', class: { root: 'border-transparent bg-primary', label: 'text-primary-foreground' } },
    { tone: 'success', appearance: 'solid', class: { root: 'border-transparent bg-success', label: 'text-success-foreground' } },
    { tone: 'warning', appearance: 'solid', class: { root: 'border-transparent bg-warning', label: 'text-warning-foreground' } },
    { tone: 'info', appearance: 'solid', class: { root: 'border-transparent bg-info', label: 'text-info-foreground' } },
    { tone: 'destructive', appearance: 'solid', class: { root: 'border-transparent bg-destructive', label: 'text-destructive-foreground' } },
    { tone: 'neutral', appearance: 'subtle', class: { root: 'border-transparent bg-muted', label: 'text-muted-foreground' } },
    { tone: 'primary', appearance: 'subtle', class: { root: 'border-transparent bg-primary-subtle', label: 'text-primary-subtle-foreground' } },
    { tone: 'success', appearance: 'subtle', class: { root: 'border-transparent bg-success-subtle', label: 'text-success-subtle-foreground' } },
    { tone: 'warning', appearance: 'subtle', class: { root: 'border-transparent bg-warning-subtle', label: 'text-warning-subtle-foreground' } },
    { tone: 'info', appearance: 'subtle', class: { root: 'border-transparent bg-info-subtle', label: 'text-info-subtle-foreground' } },
    { tone: 'destructive', appearance: 'subtle', class: { root: 'border-transparent bg-destructive-subtle', label: 'text-destructive-subtle-foreground' } },
    { tone: 'neutral', appearance: 'outline', class: { root: 'border-border bg-transparent', label: 'text-foreground' } },
    { tone: 'primary', appearance: 'outline', class: { root: 'border-primary-subtle-foreground/30 bg-transparent', label: 'text-primary-subtle-foreground' } },
    { tone: 'success', appearance: 'outline', class: { root: 'border-success-subtle-foreground/30 bg-transparent', label: 'text-success-subtle-foreground' } },
    { tone: 'warning', appearance: 'outline', class: { root: 'border-warning-subtle-foreground/30 bg-transparent', label: 'text-warning-subtle-foreground' } },
    { tone: 'info', appearance: 'outline', class: { root: 'border-info-subtle-foreground/30 bg-transparent', label: 'text-info-subtle-foreground' } },
    { tone: 'destructive', appearance: 'outline', class: { root: 'border-destructive-subtle-foreground/30 bg-transparent', label: 'text-destructive-subtle-foreground' } },
  ],
  defaultVariants: { tone: 'primary', appearance: 'solid' },
});

const legacy: Record<BadgeVariant, { tone: BadgeTone; appearance: BadgeAppearance }> = {
  default: { tone: 'primary', appearance: 'solid' },
  secondary: { tone: 'neutral', appearance: 'solid' },
  destructive: { tone: 'destructive', appearance: 'solid' },
  outline: { tone: 'neutral', appearance: 'outline' },
};

/** Resuelve `tone`/`appearance`: lo indicado gana al `variant` obsoleto, que a su vez gana al valor por defecto. */
export function resolveBadge({ tone, appearance, variant }: Pick<BadgeBaseProps, 'tone' | 'appearance' | 'variant'>) {
  const base = variant ? legacy[variant] : { tone: 'primary' as const, appearance: 'solid' as const };
  return { tone: tone ?? base.tone, appearance: appearance ?? base.appearance };
}

/** Tono del ícono para que coincida con el texto de la etiqueta. */
export function badgeIconTone(tone: BadgeTone, appearance: BadgeAppearance): IconTone {
  if (appearance === 'solid') {
    return { neutral: 'on-secondary', primary: 'on-primary', success: 'on-success', warning: 'on-warning', info: 'on-info', destructive: 'on-destructive' }[tone] as IconTone;
  }
  return { neutral: 'muted', primary: 'primary', success: 'success', warning: 'warning', info: 'info', destructive: 'destructive' }[tone] as IconTone;
}
