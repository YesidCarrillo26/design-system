import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { RadioGroup } from './RadioGroup';

// Solo web: agrupación semántica y navegación con flechas.
const meta = {
  title: 'RadioGroup',
  component: RadioGroup,
  tags: ['!autodocs', 'web-only'],
  args: {
    label: 'Plan',
    options: [
      { value: 'free', label: 'Gratis' },
      { value: 'pro', label: 'Pro' },
    ],
    defaultValue: 'free',
    onValueChange: fn(),
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IsAGroupNamedByLabel: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('group', { name: 'Plan' })).toBeInTheDocument();
    await expect(canvas.getByRole('radio', { name: 'Gratis' })).toBeChecked();
  },
};

export const ArrowKeysMoveSelection: Story = {
  play: async ({ canvas, args, userEvent }) => {
    await userEvent.tab();
    await userEvent.keyboard('{ArrowDown}');
    await expect(canvas.getByRole('radio', { name: 'Pro' })).toBeChecked();
    await expect(args.onValueChange).toHaveBeenLastCalledWith('pro');
  },
};
