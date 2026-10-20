import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '../Stack';
import { Text } from './Text';

const meta = {
  component: Text,
  args: {
    children: 'El veloz murciélago hindú comía feliz cardillo y kiwi.',
  },
  argTypes: {
    variant: { control: 'select' },
    tone: { control: 'inline-radio' },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Muted: Story = {
  args: { tone: 'muted' },
};

export const Primary: Story = {
  args: { tone: 'primary' },
};

export const Title: Story = {
  args: { variant: 'title', children: 'Un título' },
};

/** Toda la escala tipográfica, de `caption` a `title`. */
export const TypeScale: Story = {
  render: () => (
    <Stack gap="sm">
      <Text variant="title">Title 24/32 (obsoleto: usa Heading)</Text>
      <Text variant="overline" tone="muted">Overline 12/16</Text>
      <Text variant="body-lg">Body large 18/28</Text>
      <Text variant="body-md">Body medium 16/24</Text>
      <Text variant="body-sm">Body small 14/20</Text>
      <Text variant="caption" tone="muted">
        Caption 12/16
      </Text>
    </Stack>
  ),
};
