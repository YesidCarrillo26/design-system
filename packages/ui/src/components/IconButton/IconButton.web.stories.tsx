import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { IconButton } from './IconButton';

// Solo web: nombre accesible y activación con teclado.
const meta = {
  title: 'IconButton',
  component: IconButton,
  tags: ['!autodocs', 'web-only'],
  args: { icon: 'plus', label: 'Agregar', onPress: fn() },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IsNamedByLabel: Story = {
  play: async ({ canvas, args, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Agregar' }));
    await expect(args.onPress).toHaveBeenCalledTimes(1);
  },
};

export const ActivatesWithKeyboard: Story = {
  play: async ({ canvas, args, userEvent }) => {
    await userEvent.tab();
    await expect(canvas.getByRole('button', { name: 'Agregar' })).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(args.onPress).toHaveBeenCalledTimes(1);
  },
};
