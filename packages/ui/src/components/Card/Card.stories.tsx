import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { Heading } from '../Heading';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { Card } from './Card';

const meta = {
  component: Card,
  argTypes: { variant: { control: 'inline-radio' }, padding: { control: 'inline-radio' }, elevation: { control: 'inline-radio' } },
  render: (args) => (
    <Card {...args}>
      <Stack gap="sm">
        <Heading level={3}>Título de la tarjeta</Heading>
        <Text tone="muted">Descripción breve del contenido.</Text>
        <Button size="sm" onPress={() => {}}>Acción</Button>
      </Stack>
    </Card>
  ),
  parameters: { controls: { exclude: ['children'] } },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Raised: Story = { args: { elevation: 'md', padding: 'lg' } };
export const Flat: Story = { args: { elevation: 'none' } };
export const Muted: Story = { args: { variant: 'muted', elevation: 'none' } };
export const Outline: Story = { args: { variant: 'outline', elevation: 'none' } };
export const Compact: Story = { args: { padding: 'sm' } };
