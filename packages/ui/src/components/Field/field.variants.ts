import { tv } from '../../lib/tv';

export const fieldStyles = tv({
  slots: {
    root: 'flex flex-col gap-1.5',
    label: 'text-body-sm font-medium text-foreground',
    description: 'text-caption text-muted-foreground',
    error: 'text-caption text-destructive',
  },
});
