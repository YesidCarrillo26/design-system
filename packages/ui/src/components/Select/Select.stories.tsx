import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Select } from './Select';

const meta = {
  component: Select,
  args: {
    label: 'País',
    placeholder: 'Selecciona un país',
    options: [
      { value: 'co', label: 'Colombia' },
      { value: 'mx', label: 'México' },
      { value: 'ar', label: 'Argentina' },
    ],
    onValueChange: fn(),
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithValue: Story = { args: { defaultValue: 'co' } };
export const WithError: Story = { args: { error: 'Elige un país.' } };
export const Disabled: Story = { args: { disabled: true, defaultValue: 'mx' } };
