'use client';

import { useId } from 'react';
import { tv } from '../../lib/tv';
import { useControllableState } from '../../lib/useControllableState';
import type { SegmentedControlBaseProps } from './SegmentedControl.types';
import { segmentedControlStyles } from './segmentedControl.variants';

const webStyles = tv({
  extend: segmentedControlStyles,
  slots: {
    root: 'm-0 flex w-fit border-0',
    segment: 'inline-flex cursor-pointer transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-ring',
  },
});

export type SegmentedControlProps = SegmentedControlBaseProps;

/** Control segmentado con `<input type="radio">` reales: las flechas del teclado mueven la selección. */
export function SegmentedControl({ label, options, value, defaultValue, onValueChange, size, disabled = false, className }: SegmentedControlProps) {
  const name = useId();
  const [current, setCurrent] = useControllableState({ value, defaultValue: defaultValue ?? options[0]?.value ?? '', onChange: onValueChange });
  const s = webStyles({ size });
  return (
    <fieldset className={s.root({ className })} disabled={disabled}>
      <legend className="sr-only">{label}</legend>
      {options.map((option) => {
        const selected = current === option.value;
        const item = webStyles({ size, selected, disabled: disabled || option.disabled });
        return (
          <label key={option.value} className="relative flex">
            <input
              type="radio"
              className="peer sr-only"
              name={name}
              value={option.value}
              checked={selected}
              disabled={option.disabled}
              onChange={() => setCurrent(option.value)}
            />
            <span className={`${item.segment()} ${item.label()}`}>{option.label}</span>
          </label>
        );
      })}
    </fieldset>
  );
}
