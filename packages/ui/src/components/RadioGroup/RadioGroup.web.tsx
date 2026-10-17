'use client';

import { useId } from 'react';
import { tv } from '../../lib/tv';
import { useControllableState } from '../../lib/useControllableState';
import type { RadioGroupBaseProps } from './RadioGroup.types';
import { radioGroupStyles } from './radioGroup.variants';

const radioWebStyles = tv({
  extend: radioGroupStyles,
  slots: {
    root: 'm-0 border-0 p-0',
    item: 'inline-flex cursor-pointer',
    circle: 'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background',
  },
});

export type RadioGroupProps = RadioGroupBaseProps;

/** Grupo de opciones excluyentes. Usa `<input type="radio">` reales: las flechas del teclado mueven la selección. */
export function RadioGroup({ label, options, value, defaultValue = '', onValueChange, disabled = false, className }: RadioGroupProps) {
  const name = useId();
  const [current, setCurrent] = useControllableState({ value, defaultValue, onChange: onValueChange });
  const s = radioWebStyles();
  return (
    <fieldset className={s.root({ className })} disabled={disabled}>
      <legend className={s.legend()}>{label}</legend>
      {options.map((option) => {
        const selected = current === option.value;
        const item = radioWebStyles({ selected, disabled: disabled || option.disabled });
        return (
          <label key={option.value} className={item.item()}>
            <input
              type="radio"
              className="peer sr-only"
              name={name}
              value={option.value}
              checked={selected}
              disabled={option.disabled}
              onChange={() => setCurrent(option.value)}
            />
            <span aria-hidden className={item.circle()}>
              {selected ? <span className={item.dot()} /> : null}
            </span>
            <span className={item.label()}>{option.label}</span>
          </label>
        );
      })}
    </fieldset>
  );
}
