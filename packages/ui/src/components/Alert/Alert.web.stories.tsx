import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { Alert } from './Alert';

const meta = {
  title: 'Alert',
  component: Alert,
  tags: ['!autodocs', 'web-only'],
  args: { title: 'No se pudo enviar', children: 'Revisa tu conexión.', tone: 'destructive' },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IsSilentByDefault: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.queryByRole('alert')).toBeNull();
    await expect(canvas.queryByRole('status')).toBeNull();
  },
};

export const AnnouncesWhenLive: Story = {
  args: { live: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('alert')).toHaveTextContent('No se pudo enviar');
  },
};

export const InfoUsesStatusRole: Story = {
  args: { tone: 'info', live: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('status')).toBeInTheDocument();
  },
};

export const DismissesFromButton: Story = {
  args: { onDismiss: fn() },
  play: async ({ canvas, args, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Cerrar' }));
    await expect(args.onDismiss).toHaveBeenCalledTimes(1);
  },
};
