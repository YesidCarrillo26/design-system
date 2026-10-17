import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '../Stack';
import { Badge } from './Badge';

const meta = {
  component: Badge,
  args: { children: 'Nuevo' },
  argTypes: { variant: { control: 'select' } },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Destructive: Story = { args: { variant: 'destructive', children: 'Error' } };
export const Outline: Story = { args: { variant: 'outline' } };

export const Variants: Story = {
  render: () => (
    <Stack direction="row" gap="sm" align="center">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </Stack>
  ),
};
