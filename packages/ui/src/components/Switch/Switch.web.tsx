'use client';

import { tv } from '../../lib/tv';
import { useControllableState } from '../../lib/useControllableState';
import type { SwitchBaseProps } from './Switch.types';
import { switchStyles } from './switch.variants';

const switchWebStyles = tv({
  extend: switchStyles,
  slots: {
    root: [
      'inline-flex cursor-pointer rounded-md',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      'focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none',
    ],
    track: 'transition-colors',
  },
});

export type SwitchProps = SwitchBaseProps;

/** Interruptor accesible (`role="switch"`). El botón completo es el control, y el texto su nombre. */
export function Switch({ label, checked, defaultChecked = false, onCheckedChange, disabled = false, className }: SwitchProps) {
  const [value, setValue] = useControllableState({ value: checked, defaultValue: defaultChecked, onChange: onCheckedChange });
  const s = switchWebStyles({ checked: value, disabled });
  return (
    <button type="button" role="switch" aria-checked={value} disabled={disabled} className={s.root({ className })} onClick={() => setValue(!value)}>
      <span aria-hidden className={s.track()}>
        <span className={s.thumb()} />
      </span>
      <span className={s.label()}>{label}</span>
    </button>
  );
}
