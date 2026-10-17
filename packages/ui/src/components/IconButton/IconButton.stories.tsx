import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Stack } from '../Stack';
import { IconButton } from './IconButton';

const meta = {
  component: IconButton,
  args: { icon: 'plus', label: 'Agregar', onPress: fn() },
  argTypes: { variant: { control: 'select' }, size: { control: 'inline-radio' } },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ghost: Story = {};
export const Primary: Story = { args: { variant: 'primary' } };
export const Disabled: Story = { args: { disabled: true } };

export const Variants: Story = {
  render: (args) => (
    <Stack direction="row" gap="md" align="center">
      <IconButton {...args} variant="primary" />
      <IconButton {...args} variant="secondary" />
      <IconButton {...args} variant="outline" />
      <IconButton {...args} variant="ghost" />
    </Stack>
  ),
};
