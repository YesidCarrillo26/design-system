import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { tasks, withPinned } from './tasks.fixtures';
import { TaskListView } from './TaskListView';

const meta = {
  component: TaskListView,
  args: { tasks, onPinTask: fn(), onArchiveTask: fn() },
} satisfies Meta<typeof TaskListView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole('listitem')).toHaveLength(3);
  },
};

export const WithPinned: Story = { args: { tasks: withPinned } };

export const Loading: Story = {
  args: { tasks: [], loading: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('status', { name: 'Cargando tareas' })).toBeInTheDocument();
  },
};

export const Empty: Story = {
  args: { tasks: [] },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { name: 'No tienes tareas' })).toBeInTheDocument();
  },
};
