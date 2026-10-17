import { tv } from '../../lib/tv';

export const dividerStyles = tv({
  base: 'bg-border',
  variants: { orientation: { horizontal: 'h-px w-full', vertical: 'w-px self-stretch' } },
  defaultVariants: { orientation: 'horizontal' },
});
