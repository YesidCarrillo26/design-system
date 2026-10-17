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
export function Checkbox({ label, checked, defaultChecked = false, onCheckedChange, disabled = false, className }: CheckboxProps) {
  const [value, setValue] = useControllableState({ value: checked, defaultValue: defaultChecked, onChange: onCheckedChange });
  const s = checkboxWebStyles({ checked: value, disabled });
  return (
    <label className={s.root({ className })}>
      <input type="checkbox" className="peer sr-only" checked={value} disabled={disabled} onChange={(e) => setValue(e.target.checked)} />
      <span aria-hidden className={s.box()}>
        {value ? <Icon name="check" size="sm" tone="on-primary" /> : null}
      </span>
      <span className={s.label()}>{label}</span>
    </label>
  );
}
