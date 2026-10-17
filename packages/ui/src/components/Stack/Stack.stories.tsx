import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '../Text';
import { Stack } from './Stack';

const meta = {
  component: Stack,
  argTypes: {
    direction: { control: 'inline-radio' },
    gap: { control: 'select' },
    align: { control: 'select' },
    justify: { control: 'select' },
  },
  // Los hijos son elementos de ejemplo. `children` se deja fuera de los controles porque un
  // ReactNode no se edita bien en el panel.
  render: (args) => (
    <Stack {...args}>
      <Text className="bg-secondary p-2">Uno</Text>
      <Text className="bg-secondary p-2">Dos</Text>
      <Text className="bg-secondary p-2">Tres</Text>
    </Stack>
  ),
  parameters: {
    controls: { exclude: ['children'] },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Column: Story = {};

export const Row: Story = {
  args: { direction: 'row' },
};

export const CenteredRow: Story = {
  args: { direction: 'row', align: 'center', justify: 'center', gap: 'lg' },
};

export const SpaceBetween: Story = {
  args: { direction: 'row', justify: 'between' },
};
