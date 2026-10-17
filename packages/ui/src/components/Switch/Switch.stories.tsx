import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Switch } from './Switch';

const meta = {
  component: Switch,
  args: { label: 'Notificaciones', onCheckedChange: fn() },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = {};
export const On: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };
