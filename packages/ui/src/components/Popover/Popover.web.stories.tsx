import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, screen, waitFor } from 'storybook/test';
import { Popover } from './Popover';

const meta = {
  title: 'Popover',
  component: Popover,
  tags: ['!autodocs', 'web-only'],
  args: { trigger: 'Ver detalles', label: 'Ver detalles del plan', children: <p>Contenido</p> },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OpensOnClickAndClosesWithEscape: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Ver detalles del plan' }));
    await expect(await screen.findByText('Contenido')).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByText('Contenido')).not.toBeInTheDocument());
  },
};
