import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { Divider } from './Divider';

const meta = {
  component: Divider,
  argTypes: { orientation: { control: 'inline-radio' } },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: (args) => (
    <Stack>
      <Text>Arriba</Text>
      <Divider {...args} />
      <Text>Abajo</Text>
    </Stack>
  ),
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => (
    <Stack direction="row" align="stretch" className="h-8">
      <Text>Uno</Text>
      <Divider {...args} />
      <Text>Dos</Text>
    </Stack>
  ),
};
