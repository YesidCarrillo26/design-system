import { cloneElement, type ReactElement } from 'react';
import type { TooltipBaseProps } from './Tooltip.types';

export type TooltipProps = TooltipBaseProps;

/** En native no hay "hover": el texto se expone como pista de accesibilidad (`accessibilityHint`). */
export function Tooltip({ content, children }: TooltipProps) {
  return cloneElement(children as ReactElement<{ accessibilityHint?: string }>, { accessibilityHint: content });
}
