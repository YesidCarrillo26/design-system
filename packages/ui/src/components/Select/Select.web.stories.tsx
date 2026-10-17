import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { Select } from './Select';

// Solo web: elegir con el select nativo y etiqueta enlazada.
const meta = {
  title: 'Select',
  component: Select,
  tags: ['!autodocs', 'web-only'],
  args: {
    label: 'País',
    options: [
      { value: 'co', label: 'Colombia' },
      { value: 'mx', label: 'México' },
    ],
    onValueChange: fn(),
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SelectsAnOption: Story = {
  play: async ({ canvas, args, userEvent }) => {
    await userEvent.selectOptions(canvas.getByLabelText('País'), 'mx');
    await expect(args.onValueChange).toHaveBeenLastCalledWith('mx');
    await expect(canvas.getByRole('combobox', { name: 'País' })).toHaveValue('mx');
  },
};
