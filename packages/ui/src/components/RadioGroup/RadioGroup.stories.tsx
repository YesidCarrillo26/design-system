import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { RadioGroup } from './RadioGroup';

const meta = {
  component: RadioGroup,
  args: {
    label: 'Plan',
    options: [
      { value: 'free', label: 'Gratis' },
      { value: 'pro', label: 'Pro' },
      { value: 'team', label: 'Equipo' },
    ],
    defaultValue: 'free',
    onValueChange: fn(),
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
export const OneOptionDisabled: Story = {
  args: {
    options: [
      { value: 'free', label: 'Gratis' },
      { value: 'pro', label: 'Pro', disabled: true },
    ],
  },
};
