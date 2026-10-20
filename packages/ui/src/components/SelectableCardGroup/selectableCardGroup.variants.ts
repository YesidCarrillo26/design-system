import { tv } from '../../lib/tv';

export const selectableCardStyles = tv({
  slots: {
    root: 'gap-3',
    card: 'flex-row items-center gap-3 rounded-lg border p-4',
    body: 'flex-1 gap-0.5',
    title: 'text-body-md font-medium text-foreground',
    description: 'text-body-sm text-muted-foreground',
    indicator: 'size-6 items-center justify-center border',
  },
  variants: {
    selected: {
      true: { card: 'border-primary bg-primary-subtle', indicator: 'border-primary bg-primary' },
      false: { card: 'border-input bg-card', indicator: 'border-input bg-card' },
    },
    mode: { single: { indicator: 'rounded-full' }, multiple: { indicator: 'rounded-sm' } },
    disabled: { true: { card: 'opacity-disabled' }, false: {} },
  },
  defaultVariants: { selected: false, mode: 'single', disabled: false },
});

/** Pasa de la lista de elegidos a la siguiente según el modo, conservando el orden de `options`. */
export function nextSelection(order: string[], current: string[], toggled: string, mode: 'single' | 'multiple'): string[] {
  if (mode === 'single') return [toggled];
  const next = new Set(current);
  if (next.has(toggled)) next.delete(toggled);
  else next.add(toggled);
  return order.filter((value) => next.has(value));
}
