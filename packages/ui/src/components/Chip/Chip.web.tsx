'use client';

import { tv } from '../../lib/tv';
import { useControllableState } from '../../lib/useControllableState';
import { Icon } from '../Icon';
import type { ChipBaseProps } from './Chip.types';
import { chipIconTone, chipStyles } from './chip.variants';

const chipWebStyles = tv({
  extend: chipStyles,
  slots: {
    root: 'inline-flex',
    main: 'cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    remove: 'inline-flex cursor-pointer hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
  },
  variants: {
    toggleable: { true: { main: 'cursor-pointer' }, false: {} },
  },
});

export type ChipProps = ChipBaseProps;

/**
 * Chip. Con `selected`, `defaultSelected` u `onSelectedChange` es un botón de alternancia (`aria-pressed`);
 * si no, es una etiqueta. El botón de quitar es un hermano, nunca está anidado en otro botón.
 */
export function Chip({ label, selected, defaultSelected, onSelectedChange, onRemove, removeLabel, icon, disabled = false, className }: ChipProps) {
  const toggleable = selected !== undefined || defaultSelected !== undefined || onSelectedChange !== undefined;
  const [current, setCurrent] = useControllableState({ value: selected, defaultValue: defaultSelected ?? false, onChange: onSelectedChange });
  const s = chipWebStyles({ selected: toggleable && current, disabled, toggleable });
  const content = (
    <>
      {icon && <Icon name={icon} size="sm" tone={chipIconTone(toggleable && current)} />}
      <span className={s.label()}>{label}</span>
    </>
  );
  return (
    <span className={s.root({ className })}>
      {toggleable ? (
        <button type="button" aria-pressed={current} disabled={disabled} onClick={() => setCurrent(!current)} className={s.main()}>
          {content}
        </button>
      ) : (
        <span className={s.main()}>{content}</span>
      )}
      {onRemove && (
        <button type="button" aria-label={removeLabel ?? `Quitar ${label}`} disabled={disabled} onClick={onRemove} className={s.remove()}>
          <Icon name="x" size="sm" tone="muted" />
        </button>
      )}
    </span>
  );
}
