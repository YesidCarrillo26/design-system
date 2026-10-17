import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '../Stack';
import { Icon } from './Icon';
import { iconPaths, type IconName } from './icons';

const meta = {
  component: Icon,
  args: { name: 'check' },
  argTypes: { name: { control: 'select', options: Object.keys(iconPaths) }, size: { control: 'inline-radio' }, tone: { control: 'select' } },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Primary: Story = { args: { name: 'info', tone: 'primary', size: 'lg' } };
export const Destructive: Story = { args: { name: 'alert', tone: 'destructive', label: 'Advertencia' } };

export const Gallery: Story = {
  render: () => (
    <Stack direction="row" gap="lg" align="center">
      {(Object.keys(iconPaths) as IconName[]).map((name) => (
        <Icon key={name} name={name} size="lg" />
      ))}
    </Stack>
  ),
};
