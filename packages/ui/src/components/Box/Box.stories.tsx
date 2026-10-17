import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '../Text';
import { Box } from './Box';

const meta = {
  component: Box,
  args: { padding: 'md', surface: 'muted', radius: 'md' },
  argTypes: { padding: { control: 'inline-radio' }, surface: { control: 'inline-radio' }, radius: { control: 'inline-radio' } },
  render: (args) => (
    <Box {...args}>
      <Text>Contenido dentro de un Box</Text>
    </Box>
  ),
  parameters: { controls: { exclude: ['children'] } },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Muted: Story = {};
export const Bordered: Story = { args: { surface: 'none', bordered: true } };
export const Large: Story = { args: { padding: 'lg', radius: 'lg', bordered: true } };
