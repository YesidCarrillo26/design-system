import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '../Stack';
import { Progress } from './Progress';
import type { ProgressTone } from './Progress.types';

const meta = {
  component: Progress,
  args: { label: 'Subiendo archivo', value: 60 },
  argTypes: {
    variant: { control: 'inline-radio' },
    size: { control: 'inline-radio' },
    tone: { control: 'select' },
    value: { control: { type: 'range', min: 0, max: 100 } },
  },
  decorators: [(Story) => <Stack gap="md"><Story /></Stack>],
  parameters: { layout: 'padded', docs: { description: { component: 'Referencias en Mobbin: barra de avance en onboarding de Nibble y Superpower, y KPIs de YouTube Studio.' } } },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Linear: Story = {};
export const WithValue: Story = { args: { showValue: true } };
export const Indeterminate: Story = { args: { value: null, label: 'Cargando' } };
export const Complete: Story = { args: { value: 100, tone: 'success', showValue: true } };
export const Circular: Story = { args: { variant: 'circular', size: 'lg', showValue: true } };
export const CircularIndeterminate: Story = { args: { variant: 'circular', value: null, label: 'Cargando' } };

const tones: ProgressTone[] = ['primary', 'success', 'info', 'warning', 'destructive'];

export const Tones: Story = {
  render: (args) => (
    <Stack gap="sm">
      {tones.map((tone) => (
        <Progress key={tone} {...args} tone={tone} label={tone} />
      ))}
    </Stack>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <Stack gap="md">
      <Progress {...args} size="sm" label="Pequeño" />
      <Progress {...args} size="md" label="Mediano" />
      <Progress {...args} size="lg" label="Grande" />
      <Stack direction="row" gap="md" align="center">
        <Progress {...args} variant="circular" size="sm" label="Anillo pequeño" />
        <Progress {...args} variant="circular" size="md" label="Anillo mediano" />
        <Progress {...args} variant="circular" size="lg" showValue label="Anillo grande" />
      </Stack>
    </Stack>
  ),
};
