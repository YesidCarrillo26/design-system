import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Checkbox } from './Checkbox';

const meta = {
  component: Checkbox,
  args: { label: 'Acepto los términos', onCheckedChange: fn() },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };

/** Estado mixto: una parte de un grupo está marcada. Se anuncia como `mixed`. */
export const Indeterminate: Story = { args: { label: 'Seleccionar todas', indeterminate: true } };

/** Sin texto visible: el nombre accesible se conserva (útil en tablas y listas). */
export const HiddenLabel: Story = { args: { label: 'Seleccionar fila 1', hideLabel: true } };
