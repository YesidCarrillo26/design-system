import { tv } from '../../lib/tv';

export const kbdStyles = tv({
  slots: {
    root: 'h-5 min-w-5 items-center justify-center self-start rounded-sm border border-border bg-muted px-1',
    label: 'text-caption font-medium text-muted-foreground',
  },
});
