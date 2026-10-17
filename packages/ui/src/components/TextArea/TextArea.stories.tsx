import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { TextArea } from './TextArea';

const meta = {
  component: TextArea,
  args: { label: 'Comentarios', placeholder: 'Cuéntanos más…', onChangeText: fn() },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithError: Story = { args: { error: 'Escribe al menos 10 caracteres.', defaultValue: 'Hola' } };
export const Tall: Story = { args: { rows: 6 } };
