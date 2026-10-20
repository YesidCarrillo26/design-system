import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { SegmentedControl } from './SegmentedControl';

const meta = {
  title: 'SegmentedControl',
  component: SegmentedControl,
  tags: ['!autodocs', 'web-only'],
  args: {
    label: 'Vista del calendario',
    onValueChange: fn(),
    options: [
      { value: 'day', label: 'Día' },
      { value: 'week', label: 'Semana' },
      { value: 'month', label: 'Mes' },
    ],
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SelectsOnClick: Story = {
  play: async ({ canvas, args, userEvent }) => {
    await expect(canvas.getByRole('radio', { name: 'Día' })).toBeChecked();
    await userEvent.click(canvas.getByText('Semana'));
    await expect(canvas.getByRole('radio', { name: 'Semana' })).toBeChecked();
    await expect(args.onValueChange).toHaveBeenLastCalledWith('week');
  },
};

export const ArrowKeysMoveSelection: Story = {
  play: async ({ canvas, args, userEvent }) => {
    await userEvent.tab();
    await expect(canvas.getByRole('radio', { name: 'Día' })).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByRole('radio', { name: 'Semana' })).toBeChecked();
    await expect(args.onValueChange).toHaveBeenLastCalledWith('week');
  },
};

export const GroupHasAccessibleName: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('group', { name: 'Vista del calendario' })).toBeInTheDocument();
  },
};
