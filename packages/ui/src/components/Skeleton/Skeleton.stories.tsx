import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '../Stack';
import { Skeleton } from './Skeleton';

const meta = {
  component: Skeleton,
  argTypes: { shape: { control: 'inline-radio' } },
  parameters: {
    platforms: {
      web: 'Pulso con animate-pulse; se desactiva con prefers-reduced-motion.',
      native: 'Estático (sin pulso); oculto a los lectores de pantalla.',
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {};
export const Rect: Story = { args: { shape: 'rect' } };
export const Circle: Story = { args: { shape: 'circle' } };

/** Composición típica: un avatar y dos líneas de texto mientras carga un elemento de lista. */
export const ListItem: Story = {
  render: () => (
    <Stack direction="row" gap="md" align="center">
      <Skeleton shape="circle" />
      <Stack gap="sm" className="flex-1">
        <Skeleton className="w-2/3" />
        <Skeleton className="w-1/3" />
      </Stack>
    </Stack>
  ),
};
