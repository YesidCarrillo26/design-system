import { tv } from '../../lib/tv';

export const boxStyles = tv({
  variants: {
    padding: { none: 'p-0', sm: 'p-2', md: 'p-4', lg: 'p-6' },
    surface: { none: '', muted: 'bg-muted', raised: 'bg-card' },
    radius: { none: 'rounded-none', sm: 'rounded-sm', md: 'rounded-md', lg: 'rounded-lg' },
    bordered: { true: 'border border-border', false: '' },
  },
  defaultVariants: { padding: 'none', surface: 'none', radius: 'none', bordered: false },
});
