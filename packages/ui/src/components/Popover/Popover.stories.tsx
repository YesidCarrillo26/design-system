import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from '../Heading';
import { Text } from '../Text';
import { Popover } from './Popover';

const meta = {
  component: Popover,
  args: {
    trigger: 'Ver detalles',
    label: 'Ver detalles del plan',
    children: (
      <>
        <Heading level={3}>Plan Pro</Heading>
        <Text tone="muted">Incluye proyectos ilimitados.</Text>
      </>
    ),
  },
  parameters: { layout: 'centered', controls: { exclude: ['children', 'trigger'] }, platforms: { web: 'flotante anclado', native: 'panel centrado' } },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
