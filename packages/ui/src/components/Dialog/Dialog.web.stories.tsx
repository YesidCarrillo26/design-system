import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, screen, waitFor } from 'storybook/test';
import { DialogExample } from './DialogExample';

// Solo web: foco atrapado, Escape y rol. El diálogo se renderiza en un portal (fuera del canvas),
// por eso se consulta con `screen` y no con `canvas`.
const meta = {
  title: 'Dialog',
  component: DialogExample,
  tags: ['!autodocs', 'web-only'],
  args: { title: 'Eliminar proyecto', description: 'Esta acción no se puede deshacer.' },
} satisfies Meta<typeof DialogExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OpensAsNamedDialog: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Abrir diálogo' }));
    await expect(await screen.findByRole('dialog', { name: 'Eliminar proyecto' })).toBeInTheDocument();
  },
};

export const ClosesWithEscapeAndRestoresFocus: Story = {
  play: async ({ canvas, userEvent }) => {
    const opener = canvas.getByRole('button', { name: 'Abrir diálogo' });
    await userEvent.click(opener);
    await screen.findByRole('dialog');
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    await expect(opener).toHaveFocus();
  },
};
