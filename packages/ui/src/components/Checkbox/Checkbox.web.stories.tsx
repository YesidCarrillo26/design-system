import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { Checkbox } from './Checkbox';

// Solo web: clic en la etiqueta y teclado (Espacio).
const meta = {
  title: 'Checkbox',
  component: Checkbox,
  tags: ['!autodocs', 'web-only'],
  args: { label: 'Acepto los términos', onCheckedChange: fn() },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TogglesWhenClickingLabel: Story = {
  play: async ({ canvas, args, userEvent }) => {
    await userEvent.click(canvas.getByText('Acepto los términos'));
    await expect(canvas.getByRole('checkbox')).toBeChecked();
    await expect(args.onCheckedChange).toHaveBeenLastCalledWith(true);
  },
};

export const TogglesWithSpace: Story = {
  play: async ({ canvas, args, userEvent }) => {
    await userEvent.tab();
    await userEvent.keyboard(' ');
    await expect(args.onCheckedChange).toHaveBeenLastCalledWith(true);
    await userEvent.keyboard(' ');
    await expect(args.onCheckedChange).toHaveBeenLastCalledWith(false);
    await expect(canvas.getByRole('checkbox')).not.toBeChecked();
  },
};
