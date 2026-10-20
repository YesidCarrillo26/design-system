'use client';

import { tv } from '../../lib/tv';
import { useControllableState } from '../../lib/useControllableState';
import { Icon } from '../Icon';
import type { CheckboxBaseProps } from './Checkbox.types';
import { checkboxStyles } from './checkbox.variants';

const checkboxWebStyles = tv({
  extend: checkboxStyles,
  slots: {
    root: 'inline-flex cursor-pointer',
    box: 'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background',
  },
});

export type CheckboxProps = CheckboxBaseProps;

/** Casilla de verificación. Usa un `<input type="checkbox">` real (oculto) para teclado y lectores. */
export function Checkbox({ label, checked, defaultChecked = false, onCheckedChange, indeterminate = false, hideLabel = false, disabled = false, className }: CheckboxProps) {
  const [value, setValue] = useControllableState({ value: checked, defaultValue: defaultChecked, onChange: onCheckedChange });
  const s = checkboxWebStyles({ checked: value || indeterminate, disabled });
  return (
    <label className={s.root({ className })}>
      <input
        type="checkbox"
        className="peer sr-only"
        checked={value}
        disabled={disabled}
        // `indeterminate` solo existe como propiedad del DOM, no como atributo.
        ref={(input) => {
          if (input) input.indeterminate = indeterminate;
        }}
        onChange={(e) => setValue(e.target.checked)}
      />
      <span aria-hidden className={s.box()}>
        {indeterminate ? <Icon name="minus" size="sm" tone="on-primary" /> : value ? <Icon name="check" size="sm" tone="on-primary" /> : null}
      </span>
      <span className={hideLabel ? 'sr-only' : s.label()}>{label}</span>
    </label>
  );
}
