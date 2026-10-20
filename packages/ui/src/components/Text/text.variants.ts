import { tv } from '../../lib/tv';

/** Variantes compartidas: solo clases válidas en web (Tailwind) y native (Uniwind). */
export const textStyles = tv({
  variants: {
    variant: {
      caption: 'text-caption',
      'body-sm': 'text-body-sm',
      'body-md': 'text-body-md',
      'body-lg': 'text-body-lg',
      overline: 'text-overline font-medium uppercase',
      title: 'text-heading-lg font-semibold',
    },
    tone: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
    },
  },
  defaultVariants: {
    variant: 'body-md',
    tone: 'default',
  },
});
