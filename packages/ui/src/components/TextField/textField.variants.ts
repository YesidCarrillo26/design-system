import { tv } from '../../lib/tv';

/**
 * TextField: el borde lo lleva el contenedor (`root`) para poder alojar adornos a los lados del
 * campo (ícono o texto antes y después). `TextArea` sigue usando `textInputStyles`.
 */
export const textFieldStyles = tv({
  slots: {
    root: 'h-11 flex-row items-center gap-2 rounded-md border bg-card px-3',
    input: 'flex-1 p-0 text-body-md text-foreground',
    affix: 'text-body-md text-muted-foreground',
  },
  variants: {
    invalid: { true: { root: 'border-destructive' }, false: { root: 'border-input' } },
    disabled: { true: { root: 'opacity-disabled' }, false: {} },
  },
  defaultVariants: { invalid: false, disabled: false },
});
