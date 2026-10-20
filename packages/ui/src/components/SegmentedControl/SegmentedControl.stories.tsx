import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { SegmentedControl } from './SegmentedControl';

const options = [
  { value: 'day', label: 'Día' },
  { value: 'week', label: 'Semana' },
  { value: 'month', label: 'Mes' },
];

const meta = {
  component: SegmentedControl,
  args: { label: 'Vista del calendario', options, onValueChange: fn() },
  argTypes: { size: { control: 'inline-radio' } },
  parameters: { layout: 'centered', docs: { description: { component: 'Referencias en Mobbin: Redfin, Jobber, YouTube Studio.' } } },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Small: Story = { args: { size: 'sm' } };
export const StartsOnLast: Story = { args: { defaultValue: 'month' } };
export const OneSegmentDisabled: Story = { args: { options: [...options.slice(0, 2), { value: 'month', label: 'Mes', disabled: true }] } };
export const Disabled: Story = { args: { disabled: true } };
