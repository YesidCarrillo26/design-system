import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Button } from '../../components/Button';
import { PageHeader } from './PageHeader';

const meta = {
  component: PageHeader,
  args: { title: 'Bandeja de entrada', description: 'Tus tareas pendientes.' },
  parameters: { layout: 'fullscreen', controls: { exclude: ['actions'] } },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithActions: Story = {
  args: { actions: <Button size="sm" onPress={fn()}>Nueva tarea</Button> },
};
