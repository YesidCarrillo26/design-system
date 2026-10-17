import type { Meta, StoryObj } from '@storybook/react-vite';
import { delay, http, HttpResponse } from 'msw';
import { expect } from 'storybook/test';
import { TASKS_URL } from '../store/taskboxSlice';
import { remoteTodos } from './tasks.fixtures';
import { InboxScreen } from './InboxScreen';

const meta = { component: InboxScreen } satisfies Meta<typeof InboxScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Cada story declara cómo responde "la API" con `msw.use(...)` (msw-storybook-addon 3). */
export const Default: Story = {
  beforeEach: ({ msw }) => {
    msw.use(http.get(TASKS_URL, () => HttpResponse.json(remoteTodos)));
  },
  play: async ({ canvas, userEvent }) => {
    await expect(await canvas.findByText('Escribir la guía')).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: 'Fijar: Revisar el PR' }));
    await expect(canvas.getByText('Fijada el 15 ene 2026')).toBeInTheDocument();
  },
};

export const Loading: Story = {
  beforeEach: ({ msw }) => {
    msw.use(http.get(TASKS_URL, async () => { await delay('infinite'); return HttpResponse.json([]); }));
  },
  play: async ({ canvas }) => {
    await expect(await canvas.findByRole('status', { name: 'Cargando tareas' })).toBeInTheDocument();
  },
};

export const Empty: Story = {
  beforeEach: ({ msw }) => {
    msw.use(http.get(TASKS_URL, () => HttpResponse.json([])));
  },
  play: async ({ canvas }) => {
    await expect(await canvas.findByRole('heading', { name: 'No tienes tareas' })).toBeInTheDocument();
  },
};

export const ServerError: Story = {
  beforeEach: ({ msw }) => {
    msw.use(http.get(TASKS_URL, () => new HttpResponse(null, { status: 500 })));
  },
  play: async ({ canvas }) => {
    await expect(await canvas.findByText(/error 500/)).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Reintentar' })).toBeInTheDocument();
  },
};

/** Falla la primera vez; al pulsar "Reintentar" responde bien. */
export const RetryRecovers: Story = {
  beforeEach: ({ msw }) => {
    msw.use(
        http.get(TASKS_URL, () => new HttpResponse(null, { status: 500 }), { once: true }),
        http.get(TASKS_URL, () => HttpResponse.json(remoteTodos)),
    );
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(await canvas.findByRole('button', { name: 'Reintentar' }));
    await expect(await canvas.findByText('Escribir la guía')).toBeInTheDocument();
  },
};
