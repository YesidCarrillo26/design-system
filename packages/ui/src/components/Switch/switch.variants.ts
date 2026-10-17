import { tv } from '../../lib/tv';

export const switchStyles = tv({
  slots: {
    root: 'flex-row items-center gap-3',
    track: 'h-6 w-11 flex-row items-center rounded-full px-0.5',
    thumb: 'size-5 rounded-full bg-background',
    label: 'text-body-md text-foreground',
  },
  variants: {
    checked: {
      true: { track: 'justify-end bg-primary' },
      false: { track: 'justify-start bg-muted-foreground' },
    },
    disabled: { true: { root: 'opacity-50' }, false: {} },
  },
  defaultVariants: { checked: false, disabled: false },
});
