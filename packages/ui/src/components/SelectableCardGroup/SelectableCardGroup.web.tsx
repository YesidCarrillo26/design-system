'use client';

import { useId } from 'react';
import { tv } from '../../lib/tv';
import { useControllableState } from '../../lib/useControllableState';
import { Icon } from '../Icon';
import type { SelectableCardGroupBaseProps } from './SelectableCardGroup.types';
import { nextSelection, selectableCardStyles } from './selectableCardGroup.variants';

const webStyles = tv({
  extend: selectableCardStyles,
  slots: {
    root: 'm-0 flex flex-col border-0 p-0',
    card: 'flex cursor-pointer transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background',
    indicator: 'inline-flex shrink-0',
  },
});

export type SelectableCardGroupProps = SelectableCardGroupBaseProps;

/**
 * Tarjetas elegibles con `<input type="radio" | "checkbox">` reales (ocultos): las flechas, Espacio y los
 * lectores de pantalla funcionan sin código extra. Toda la tarjeta es la zona de toque.
 */
export function SelectableCardGroup({ label, selectionMode = 'single', options, value, defaultValue = [], onValueChange, maxSelected, disabled = false, className }: SelectableCardGroupProps) {
  const name = useId();
  const [current, setCurrent] = useControllableState<string[]>({ value, defaultValue, onChange: onValueChange });
  const s = webStyles();
  const order = options.map((option) => option.value);
  const limitReached = selectionMode === 'multiple' && maxSelected !== undefined && current.length >= maxSelected;
  return (
    <fieldset className={s.root({ className })} disabled={disabled}>
      <legend className="sr-only">{label}</legend>
      {options.map((option) => {
        const selected = current.includes(option.value);
        const isDisabled = disabled || option.disabled || (limitReached && !selected);
        const item = webStyles({ selected, mode: selectionMode, disabled: isDisabled });
        return (
          <label key={option.value} className="relative flex">
            <input
              type={selectionMode === 'single' ? 'radio' : 'checkbox'}
              className="peer sr-only"
              name={name}
              value={option.value}
              checked={selected}
              disabled={option.disabled || (limitReached && !selected)}
              onChange={() => setCurrent(nextSelection(order, current, option.value, selectionMode))}
            />
            <span className={`w-full ${item.card()}`}>
              {option.icon ? <Icon name={option.icon} size="lg" tone={selected ? 'primary' : 'muted'} /> : null}
              <span className={`flex ${item.body()}`}>
                <span className={item.title()}>{option.title}</span>
                {option.description ? <span className={item.description()}>{option.description}</span> : null}
              </span>
              <span aria-hidden className={item.indicator()}>
                {selected ? <Icon name="check" size="sm" tone="on-primary" /> : null}
              </span>
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}
