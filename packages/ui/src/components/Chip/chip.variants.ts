import { tv } from '../../lib/tv';
import type { IconTone } from '../Icon/Icon.types';

export const chipStyles = tv({
  slots: {
    root: 'h-8 flex-row items-center self-start rounded-full border',
    main: 'h-full flex-row items-center gap-1.5 rounded-full px-3',
    label: 'text-body-sm font-medium',
    remove: 'mr-1 size-6 items-center justify-center rounded-full',
  },
  variants: {
    selected: {
      true: { root: 'border-primary bg-primary-subtle', label: 'text-primary-subtle-foreground' },
      false: { root: 'border-input bg-card', label: 'text-foreground' },
    },
    disabled: { true: { root: 'opacity-disabled' }, false: {} },
  },
  defaultVariants: { selected: false, disabled: false },
});

export const chipIconTone = (selected: boolean): IconTone => (selected ? 'primary' : 'muted');
