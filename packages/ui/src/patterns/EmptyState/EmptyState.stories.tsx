import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Button } from '../../components/Button';
import { EmptyState } from './EmptyState';

const meta = {
  component: EmptyState,
  args: { title: 'No hay tareas', description: 'Cuando agregues una, aparecerá aquí.' },
  argTypes: { icon: { control: 'select' } },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithAction: Story = {
  render: (args) => (
    <EmptyState {...args}>
      <Button size="sm" onPress={fn()}>Agregar tarea</Button>
    </EmptyState>
  ),
};
