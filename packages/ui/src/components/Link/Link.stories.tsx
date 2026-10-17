import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Link } from './Link';

const meta = {
  component: Link,
  args: { href: 'https://storybook.js.org', children: 'Ir a Storybook', onPress: fn() },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
