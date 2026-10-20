import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { Chip } from './Chip';

const meta = {
  title: 'Chip',
  component: Chip,
  tags: ['!autodocs', 'web-only'],
  args: { label: 'Diseño' },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TogglesAndAnnouncesState: Story = {
  args: { onSelectedChange: fn() },
  play: async ({ canvas, args, userEvent }) => {
    const chip = canvas.getByRole('button', { name: 'Diseño' });
    await expect(chip).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(chip);
    await expect(chip).toHaveAttribute('aria-pressed', 'true');
    await expect(args.onSelectedChange).toHaveBeenLastCalledWith(true);
  },
};

export const TogglesWithKeyboard: Story = {
  args: { onSelectedChange: fn() },
  play: async ({ canvas, args, userEvent }) => {
    await userEvent.tab();
    await expect(canvas.getByRole('button', { name: 'Diseño' })).toHaveFocus();
    await userEvent.keyboard(' ');
    await expect(args.onSelectedChange).toHaveBeenLastCalledWith(true);
  },
};

export const LabelIsNotAButton: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.queryByRole('button')).toBeNull();
  },
};

export const RemoveButtonIsASibling: Story = {
  args: { onRemove: fn(), onSelectedChange: fn() },
  play: async ({ canvas, args, userEvent }) => {
    const remove = canvas.getByRole('button', { name: 'Quitar Diseño' });
    await expect(remove.closest('button:not([aria-label])')).toBeNull();
    await userEvent.click(remove);
    await expect(args.onRemove).toHaveBeenCalledTimes(1);
    // Quitar no alterna la selección.
    await expect(args.onSelectedChange).not.toHaveBeenCalled();
  },
};
