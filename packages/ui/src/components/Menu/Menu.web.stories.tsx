import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, screen, waitFor } from 'storybook/test';
import { Menu } from './Menu';

const onRename = fn();
const meta = {
  title: 'Menu',
  component: Menu,
  tags: ['!autodocs', 'web-only'],
  parameters: {
    // Base UI inserta "focus guards" (span aria-hidden con tabindex=0) mientras el menú está abierto:
    // son parte de cómo atrapa el foco, pero axe los marca. Se desactiva solo esta regla, solo aquí.
    a11y: { config: { rules: [{ id: 'aria-hidden-focus', enabled: false }] } },
  },
  args: {
    trigger: 'Acciones',
    label: 'Acciones del documento',
    items: [
      { label: 'Renombrar', onSelect: onRename },
      { label: 'Eliminar', onSelect: fn(), destructive: true },
    ],
  },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ChoosesItemWithKeyboard: Story = {
  play: async ({ canvas, userEvent }) => {
    onRename.mockClear();
    await userEvent.click(canvas.getByRole('button', { name: 'Acciones del documento' }));
    await expect(await screen.findByRole('menuitem', { name: 'Renombrar' })).toBeInTheDocument();
    await userEvent.keyboard('{ArrowDown}{Enter}');
    await waitFor(() => expect(onRename).toHaveBeenCalledTimes(1));
  },
};
