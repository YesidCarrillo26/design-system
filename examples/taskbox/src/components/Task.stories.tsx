import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { Task } from './Task';

const meta = {
  component: Task,
  args: { task: { id: '1', title: 'Escribir la guía', state: 'TASK_INBOX' }, onPinTask: fn(), onArchiveTask: fn() },
} satisfies Meta<typeof Task>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Pinned: Story = {
  args: { task: { id: '1', title: 'Escribir la guía', state: 'TASK_PINNED', pinnedAt: '2026-01-10T12:00:00Z' } },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('Fijada el 10 ene 2026')).toBeInTheDocument();
  },
};

export const Archived: Story = {
  args: { task: { id: '1', title: 'Escribir la guía', state: 'TASK_ARCHIVED' } },
  play: async ({ canvas }) => {
    // Una tarea archivada no se puede fijar.
    await expect(canvas.getByRole('button', { name: /Fijar/ })).toBeDisabled();
  },
};

export const PinsAndArchivesWithTheIds: Story = {
  play: async ({ canvas, args, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Fijar: Escribir la guía' }));
    await expect(args.onPinTask).toHaveBeenCalledWith('1');
    await userEvent.click(canvas.getByRole('button', { name: 'Archivar: Escribir la guía' }));
    await expect(args.onArchiveTask).toHaveBeenCalledWith('1');
  },
};
