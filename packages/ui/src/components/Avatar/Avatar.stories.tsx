import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '../Stack';
import { Avatar } from './Avatar';

const meta = {
  component: Avatar,
  args: { name: 'Ada Lovelace' },
  argTypes: { size: { control: 'inline-radio' } },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initials: Story = {};

/** Si la imagen no carga, se muestran las iniciales. */
export const BrokenImage: Story = { args: { src: 'https://invalid.example/no-existe.png' } };

export const Sizes: Story = {
  render: (args) => (
    <Stack direction="row" gap="md" align="center">
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" />
    </Stack>
  ),
};
