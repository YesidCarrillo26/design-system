import type { TextFieldBaseProps } from '../TextField/TextField.types';

/** Contrato compartido de `TextArea`: como `TextField`, de varias líneas y sin `type`. */
export interface TextAreaBaseProps extends Omit<TextFieldBaseProps, 'type'> {
  /**
   * Líneas visibles.
   * @default 3
   */
  rows?: number;
}
