import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { TextField } from './TextField';

const meta = {
  component: TextField,
  args: { label: 'Correo', placeholder: 'tu@correo.com', onChangeText: fn() },
  argTypes: { type: { control: 'select' } },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithDescription: Story = { args: { description: 'Nunca compartiremos tu correo.' } };
export const WithError: Story = { args: { error: 'Ingresa un correo válido.', defaultValue: 'no-es-un-correo' } };
export const Required: Story = { args: { required: true } };
export const Password: Story = { args: { label: 'Contraseña', type: 'password', placeholder: '' } };
export const Disabled: Story = { args: { disabled: true, defaultValue: 'No editable' } };
export const WithLeadingIcon: Story = { args: { label: 'Buscar', placeholder: 'Buscar proyectos', leadingIcon: 'search' } };
export const WithPrefixAndSuffix: Story = { args: { label: 'Peso', type: 'number', placeholder: '0', suffix: 'kg', prefix: '≈' } };
export const WithTrailingIcon: Story = { args: { label: 'Contraseña', type: 'password', placeholder: '', trailingIcon: 'lock' } };
