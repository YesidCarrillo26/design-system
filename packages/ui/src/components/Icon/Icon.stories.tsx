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

/** Tonos de estado: sobre superficies neutras usan los tokens `*-subtle-foreground` (contraste AA en ambos temas). */
export const StatusTones: Story = {
  render: () => (
    <Stack direction="row" gap="md" align="center">
      <Icon name="circle-check" tone="success" size="lg" label="Éxito" />
      <Icon name="alert" tone="warning" size="lg" label="Advertencia" />
      <Icon name="info" tone="info" size="lg" label="Información" />
      <Icon name="circle-alert" tone="destructive" size="lg" label="Error" />
    </Stack>
  ),
};
