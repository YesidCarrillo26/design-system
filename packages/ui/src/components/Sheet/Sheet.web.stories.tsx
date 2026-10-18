import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, screen, waitFor } from 'storybook/test';
import { SheetExample } from './Sheet.example';

const meta = {
  title: 'Sheet',
  component: SheetExample,
  tags: ['!autodocs', 'web-only'],
  args: { title: 'Filtros' },
} satisfies Meta<typeof SheetExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OpensAndClosesWithEscape: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Abrir hoja' }));
    await expect(await screen.findByRole('dialog', { name: 'Filtros' })).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  },
};
