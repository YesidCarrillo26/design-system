import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Stack } from '../Stack';
import { Chip } from './Chip';

const meta = {
  component: Chip,
  args: { label: 'Diseño' },
  parameters: { layout: 'centered', docs: { description: { component: 'Referencias en Mobbin: filtros de YouTube Studio, VSCO y IKEA Home smart.' } } },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Sin estado de selección es una etiqueta; no se puede alternar. */
export const Label: Story = {};
export const Filter: Story = { args: { onSelectedChange: fn() } };
export const Selected: Story = { args: { defaultSelected: true, onSelectedChange: fn() } };
export const WithIcon: Story = { args: { icon: 'star', onSelectedChange: fn() } };
export const Removable: Story = { args: { onRemove: fn() } };
export const Disabled: Story = { args: { disabled: true, onSelectedChange: fn() } };

export const FilterRow: Story = {
  render: () => (
    <Stack direction="row" gap="sm" align="center">
      <Chip label="Todos" defaultSelected onSelectedChange={() => {}} />
      <Chip label="Sin editar" onSelectedChange={() => {}} />
      <Chip label="Editados" onSelectedChange={() => {}} />
      <Chip label="Guardados" icon="check" onSelectedChange={() => {}} />
    </Stack>
  ),
};
