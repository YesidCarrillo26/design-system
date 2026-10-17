import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { Switch } from './Switch';

// Solo web: rol, estado anunciado y teclado.
const meta = {
  title: 'Switch',
  component: Switch,
  tags: ['!autodocs', 'web-only'],
  args: { label: 'Notificaciones', onCheckedChange: fn() },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AnnouncesStateWhenToggled: Story = {
  play: async ({ canvas, args, userEvent }) => {
    const control = canvas.getByRole('switch', { name: 'Notificaciones' });
    await expect(control).toHaveAttribute('aria-checked', 'false');
    await userEvent.click(control);
    await expect(control).toHaveAttribute('aria-checked', 'true');
    await expect(args.onCheckedChange).toHaveBeenLastCalledWith(true);
  },
};

export const TogglesWithKeyboard: Story = {
  play: async ({ canvas, args, userEvent }) => {
    await userEvent.tab();
    await expect(canvas.getByRole('switch')).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(args.onCheckedChange).toHaveBeenLastCalledWith(true);
  },
};
