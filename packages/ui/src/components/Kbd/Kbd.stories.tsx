import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { Kbd } from './Kbd';

const meta = {
  component: Kbd,
  args: { children: '⌘' },
  parameters: { layout: 'centered', docs: { description: { component: 'Referencias en Mobbin: pie de atajos de las paletas de comandos de Devin y Juicebox.' } } },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Shortcut: Story = {
  render: () => (
    <Stack direction="row" gap="sm" align="center">
      <Text tone="muted">Buscar</Text>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </Stack>
  ),
};
