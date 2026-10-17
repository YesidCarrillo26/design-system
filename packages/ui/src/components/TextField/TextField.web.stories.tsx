import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { TextField } from './TextField';

// Solo web: escribir, etiqueta enlazada y asociación de ayuda/error con el input.
const meta = {
  title: 'TextField',
  component: TextField,
  tags: ['!autodocs', 'web-only'],
  args: { label: 'Correo', onChangeText: fn() },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TypingCallsOnChangeText: Story = {
  play: async ({ canvas, args, userEvent }) => {
    await userEvent.type(canvas.getByLabelText('Correo'), 'hola');
    await expect(args.onChangeText).toHaveBeenLastCalledWith('hola');
  },
};

export const ErrorIsDescribedAndInvalid: Story = {
  args: { error: 'Ingresa un correo válido.', description: 'Ayuda' },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Correo');
    await expect(input).toBeInvalid();
    await expect(input).toHaveAccessibleDescription('Ayuda Ingresa un correo válido.');
  },
};
