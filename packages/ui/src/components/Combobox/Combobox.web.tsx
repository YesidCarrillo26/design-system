'use client';

import { Combobox as BaseCombobox } from '@base-ui/react/combobox';
import { useId } from 'react';
import { matchesQuery } from '../../lib/filterOptions';
import { overlayMotion } from '../../lib/overlayMotion.web';
import { tv } from '../../lib/tv';
import { useControllableState } from '../../lib/useControllableState';
import { Field } from '../Field';
import { Icon } from '../Icon';
import type { SelectOption } from '../Select/Select.types';
import type { ComboboxBaseProps } from './Combobox.types';
import { comboboxStyles } from './combobox.variants';

const comboboxWebStyles = tv({
  extend: comboboxStyles,
  slots: {
    trigger: [
      'flex w-full cursor-pointer text-body-md text-foreground data-[placeholder]:text-muted-foreground',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      'focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed',
    ],
    search: 'w-full outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring',
    empty: 'empty:hidden',
    option: [
      'cursor-default select-none justify-start gap-2 rounded-md px-2 outline-none',
      'data-[highlighted]:bg-accent data-[disabled]:opacity-disabled',
    ],
  },
});

const popupClasses = [
  'min-w-(--anchor-width) flex flex-col gap-1 rounded-lg border border-border bg-popover p-1 shadow-md outline-none',
  ...overlayMotion.popupScale,
].join(' ');

export type ComboboxProps = ComboboxBaseProps;

/**
 * Selector con búsqueda (Base UI `Combobox`, con el campo dentro del popup). Navegación con flechas,
 * Enter para elegir y Escape para cerrar; filtra sin distinguir acentos ni mayúsculas.
 */
export function Combobox({ label, options, value, defaultValue = '', placeholder, description, error, required, disabled, onValueChange, searchPlaceholder, emptyText, className }: ComboboxProps) {
  const id = useId();
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;
  const [current, setCurrent] = useControllableState({ value, defaultValue, onChange: onValueChange });
  const selected = options.find((option) => option.value === current) ?? null;
  const describedBy = [description ? descriptionId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined;
  const s = comboboxWebStyles({ invalid: Boolean(error) });
  return (
    <Field label={label} description={description} error={error} required={required} htmlFor={id} descriptionId={descriptionId} errorId={errorId}>
      <BaseCombobox.Root
        items={options}
        value={selected}
        onValueChange={(option: SelectOption | null) => setCurrent(option?.value ?? '')}
        isItemEqualToValue={(a: SelectOption, b: SelectOption) => a.value === b.value}
        itemToStringLabel={(option: SelectOption) => option.label}
        filter={(option: SelectOption, query: string) => matchesQuery(option.label, query)}
        disabled={disabled}
        required={required}
      >
        <BaseCombobox.Trigger id={id} aria-invalid={error ? true : undefined} aria-describedby={describedBy} className={s.trigger({ className })}>
          <BaseCombobox.Value placeholder={placeholder ?? 'Selecciona…'} />
          <Icon name="chevrons-up-down" size="sm" tone="muted" />
        </BaseCombobox.Trigger>
        <BaseCombobox.Portal>
          <BaseCombobox.Positioner sideOffset={4} align="start" className="z-popover">
            <BaseCombobox.Popup aria-label={label} className={popupClasses}>
              <BaseCombobox.Input placeholder={searchPlaceholder ?? 'Buscar…'} aria-label={`Buscar en ${label}`} className={s.search()} />
              <BaseCombobox.Empty className={s.empty()}>{emptyText ?? 'Sin resultados'}</BaseCombobox.Empty>
              <BaseCombobox.List aria-label={label} className="max-h-64 overflow-auto overscroll-contain">
                {(option: SelectOption) => (
                  <BaseCombobox.Item key={option.value} value={option} disabled={option.disabled} className={s.option()}>
                    <span className="inline-flex size-4 shrink-0">
                      <BaseCombobox.ItemIndicator>
                        <Icon name="check" size="sm" tone="primary" />
                      </BaseCombobox.ItemIndicator>
                    </span>
                    <span className={s.optionLabel()}>{option.label}</span>
                  </BaseCombobox.Item>
                )}
              </BaseCombobox.List>
            </BaseCombobox.Popup>
          </BaseCombobox.Positioner>
        </BaseCombobox.Portal>
      </BaseCombobox.Root>
    </Field>
  );
}
