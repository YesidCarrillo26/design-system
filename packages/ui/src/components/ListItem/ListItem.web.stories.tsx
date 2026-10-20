import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { ListItem } from './ListItem';

const meta = {
  title: 'ListItem',
  component: ListItem,
  tags: ['!autodocs', 'web-only'],
  args: { title: 'Modo oscuro', value: 'Automático', showChevron: true },
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IsAButtonWhenPressable: Story = {
  args: { onPress: fn() },
  play: async ({ canvas, args, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: /Modo oscuro/ }));
    await expect(args.onPress).toHaveBeenCalledTimes(1);
  },
};

export const ActivatesWithKeyboard: Story = {
  args: { onPress: fn() },
  play: async ({ canvas, args, userEvent }) => {
    await userEvent.tab();
    await expect(canvas.getByRole('button', { name: /Modo oscuro/ })).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(args.onPress).toHaveBeenCalledTimes(1);
  },
};

export const IsNotAButtonWhenStatic: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.queryByRole('button')).toBeNull();
    await expect(canvas.getByText('Automático')).toBeVisible();
  },
};
