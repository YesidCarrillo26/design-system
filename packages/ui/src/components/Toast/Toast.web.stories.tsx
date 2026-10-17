import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { ToastExample } from './ToastExample';

// Solo web: anuncio por la región aria-live, rol según la gravedad y cierre automático.
const meta = {
  title: 'Toast',
  component: ToastExample,
  tags: ['!autodocs', 'web-only'],
} satisfies Meta<typeof ToastExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AnnouncesInLiveRegion: Story = {
  args: { duration: 0 },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Mostrar aviso' }));
    const region = canvas.getByRole('region', { name: 'Notificaciones' });
    await expect(region).toHaveAttribute('aria-live', 'polite');
    await expect(canvas.getByRole('status')).toHaveTextContent('Cambios guardados');
  },
};

export const ErrorsAreAlerts: Story = {
  args: { duration: 0 },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Mostrar error' }));
    await expect(canvas.getByRole('alert')).toHaveTextContent('No se pudo guardar');
  },
};

export const DismissesWithTheButton: Story = {
  args: { duration: 0 },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Mostrar aviso' }));
    await userEvent.click(canvas.getByRole('button', { name: 'Cerrar aviso' }));
    await waitFor(() => expect(canvas.queryByRole('status')).not.toBeInTheDocument());
  },
};

export const HidesItselfAfterTheDuration: Story = {
  args: { duration: 300 },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Mostrar aviso' }));
    await expect(canvas.getByRole('status')).toBeInTheDocument();
    await waitFor(() => expect(canvas.queryByRole('status')).not.toBeInTheDocument(), { timeout: 2000 });
  },
};
