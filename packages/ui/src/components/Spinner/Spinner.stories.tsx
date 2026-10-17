import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '../Stack';
import { Spinner } from './Spinner';

const meta = {
  component: Spinner,
  argTypes: { size: { control: 'inline-radio' } },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Large: Story = { args: { size: 'lg' } };

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" gap="lg" align="center">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </Stack>
  ),
};
