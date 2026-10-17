import type { FieldBaseProps } from './Field.types';
import { fieldStyles } from './field.variants';

export interface FieldProps extends FieldBaseProps {
  /** `id` del control, para enlazar la etiqueta. */
  htmlFor?: string;
  /** `id` del texto de ayuda (el control lo referencia con aria-describedby). */
  descriptionId?: string;
  /** `id` del mensaje de error. */
  errorId?: string;
}

/** Etiqueta, ayuda y error alrededor de un control. */
export function Field({ label, description, error, required, htmlFor, descriptionId, errorId, className, children }: FieldProps) {
  const s = fieldStyles();
  return (
    <div className={s.root({ className })}>
      <label htmlFor={htmlFor} className={s.label()}>
        {label}
        {required ? <span aria-hidden> *</span> : null}
      </label>
      {children}
      {description ? <p id={descriptionId} className={s.description()}>{description}</p> : null}
      {error ? <p id={errorId} role="alert" className={s.error()}>{error}</p> : null}
    </div>
  );
}
