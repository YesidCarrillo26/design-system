import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Progress } from './Progress';

const meta = {
  title: 'Progress',
  component: Progress,
  tags: ['!autodocs', 'web-only'],
  args: { label: 'Subiendo archivo' },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExposesValueToAssistiveTech: Story = {
  args: { value: 40 },
  play: async ({ canvas }) => {
    const bar = canvas.getByRole('progressbar', { name: 'Subiendo archivo' });
    await expect(bar).toHaveAttribute('aria-valuenow', '40');
    await expect(bar).toHaveAttribute('aria-valuemax', '100');
  },
};

export const IndeterminateHasNoValue: Story = {
  args: { value: null },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('progressbar')).not.toHaveAttribute('aria-valuenow');
  },
};

export const ClampsOutOfRangeValues: Story = {
  args: { value: 250, max: 100 },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
  },
};

export const CircularIsAProgressbarToo: Story = {
  args: { variant: 'circular', value: 75 },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('progressbar', { name: 'Subiendo archivo' })).toHaveAttribute('aria-valuenow', '75');
  },
};
