import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { SelectableCardGroup } from './SelectableCardGroup';

const meta = {
  title: 'SelectableCardGroup',
  component: SelectableCardGroup,
  tags: ['!autodocs', 'web-only'],
  args: {
    label: '¿Cuáles son tus objetivos?',
    onValueChange: fn(),
    options: [
      { value: 'a', title: 'Productividad' },
      { value: 'b', title: 'Hábitos' },
      { value: 'c', title: 'Ahorro' },
    ],
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof SelectableCardGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleReplacesTheSelection: Story = {
  play: async ({ canvas, args, userEvent }) => {
    await userEvent.click(canvas.getByText('Productividad'));
    await expect(args.onValueChange).toHaveBeenLastCalledWith(['a']);
    await userEvent.click(canvas.getByText('Hábitos'));
    await expect(args.onValueChange).toHaveBeenLastCalledWith(['b']);
    await expect(canvas.getByRole('radio', { name: 'Productividad' })).not.toBeChecked();
  },
};

export const MultipleKeepsOrderOfOptions: Story = {
  args: { selectionMode: 'multiple' },
  play: async ({ canvas, args, userEvent }) => {
    await userEvent.click(canvas.getByText('Ahorro'));
    await userEvent.click(canvas.getByText('Productividad'));
    await expect(args.onValueChange).toHaveBeenLastCalledWith(['a', 'c']);
  },
};

export const LimitDisablesTheRest: Story = {
  args: { selectionMode: 'multiple', maxSelected: 1, defaultValue: ['a'] },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('checkbox', { name: 'Hábitos' })).toBeDisabled();
    await expect(canvas.getByRole('checkbox', { name: 'Productividad' })).toBeEnabled();
  },
};

export const ArrowKeysMoveTheRadio: Story = {
  play: async ({ canvas, args, userEvent }) => {
    await userEvent.tab();
    await expect(canvas.getByRole('radio', { name: 'Productividad' })).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    await expect(args.onValueChange).toHaveBeenLastCalledWith(['b']);
  },
};
