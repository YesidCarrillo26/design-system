import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { storeWith, tasks, withPinned } from './tasks.fixtures';
import { TaskList } from './TaskList';

// Conectado a Redux: cada story arranca con su propio store (ver el decorador de preview.tsx).
const meta = {
  component: TaskList,
  parameters: { store: { preloadedState: storeWith(tasks) } },
} satisfies Meta<typeof TaskList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const PinnedGoFirst: Story = {
  parameters: { store: { preloadedState: storeWith([tasks[0]!, tasks[1]!, { ...tasks[2]!, state: 'TASK_PINNED', pinnedAt: '2026-01-10T12:00:00Z' }]) } },
  play: async ({ canvas }) => {
    const items = canvas.getAllByRole('listitem');
    await expect(items[0]).toHaveTextContent('Publicar la versión');
  },
};

/** El reloj está simulado (preview.tsx): la fecha de fijado es siempre la misma. */
export const PinningStampsTheMockedDate: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Fijar: Revisar el PR' }));
    await expect(canvas.getByText('Fijada el 15 ene 2026')).toBeInTheDocument();
    await expect(canvas.getAllByRole('listitem')[0]).toHaveTextContent('Revisar el PR');
  },
};

export const WithPinnedFromTheStart: Story = {
  parameters: { store: { preloadedState: storeWith(withPinned) } },
};

export const ArchivingMovesToTheEnd: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Archivar: Escribir la guía' }));
    await expect(canvas.getAllByRole('listitem')[2]).toHaveTextContent('Escribir la guía');
  },
};
