import { tv } from '../../lib/tv';

/** Estilo compartido de los campos de texto (TextField y TextArea). */
export const textInputStyles = tv({
  base: 'rounded-md border bg-card px-3 text-body-md text-foreground disabled:opacity-disabled',
  variants: {
    invalid: { true: 'border-destructive', false: 'border-border' },
    multiline: { true: 'min-h-24 py-2', false: 'h-11' },
  },
  defaultVariants: { invalid: false, multiline: false },
});
