import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Tabs } from './Tabs';
import { tabItems } from './tabs.fixtures';

const meta = {
  component: Tabs,
  args: {
    onValueChange: fn(),
    items: tabItems,
  },
  parameters: { layout: 'padded', controls: { exclude: ['items'] } },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const StartsOnSecond: Story = { args: { defaultValue: 'actividad' } };
