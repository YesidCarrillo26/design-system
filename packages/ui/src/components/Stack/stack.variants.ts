import { tv } from '../../lib/tv';

/**
 * Flexbox con `gap`: funciona igual en DOM y en React Native, así que estas variantes
 * se comparten sin extensiones por plataforma.
 */
export const stackStyles = tv({
  base: 'flex',
  variants: {
    direction: { row: 'flex-row', column: 'flex-col' },
    gap: { none: 'gap-0', xs: 'gap-1', sm: 'gap-2', md: 'gap-4', lg: 'gap-6', xl: 'gap-8' },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
    },
  },
  defaultVariants: {
    direction: 'column',
    gap: 'md',
    align: 'stretch',
    justify: 'start',
  },
});
