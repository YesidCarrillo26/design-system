'use client';

import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import type { TooltipBaseProps } from './Tooltip.types';
import { tooltipStyles } from './tooltip.variants';

export type TooltipProps = TooltipBaseProps;

/** Tooltip al pasar el cursor o enfocar con teclado. Aplica `aria-describedby` al elemento. */
export function Tooltip({ content, children }: TooltipProps) {
  return (
    <BaseTooltip.Provider>
      <BaseTooltip.Root>
        <BaseTooltip.Trigger render={children} />
        <BaseTooltip.Portal>
          <BaseTooltip.Positioner sideOffset={6}>
            <BaseTooltip.Popup className={tooltipStyles()}>{content}</BaseTooltip.Popup>
          </BaseTooltip.Positioner>
        </BaseTooltip.Portal>
      </BaseTooltip.Root>
    </BaseTooltip.Provider>
  );
}
