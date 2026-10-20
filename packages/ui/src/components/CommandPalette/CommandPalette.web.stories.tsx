import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, screen, waitFor } from 'storybook/test';
import { CommandPaletteExample } from './CommandPalette.example';

// Solo web: teclado, foco y Escape. La paleta está en un portal, así que se consulta con `screen`.
const onSettings = fn();
const meta = {
  title: 'CommandPalette',
  component: CommandPaletteExample,
  tags: ['!autodocs', 'web-only'],
  args: {
    groups: [
      {
        label: 'Navegación',
        items: [
          { id: 'settings', label: 'Ajustes', keywords: ['preferencias'], shortcut: ['⌘', ','], onSelect: onSettings },
          { id: 'inbox', label: 'Bandeja de entrada', onSelect: fn() },
        ],
      },
      { label: 'Acciones', items: [{ id: 'new', label: 'Nuevo proyecto', onSelect: fn() }] },
    ],
  },
} satisfies Meta<typeof CommandPaletteExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OpensAsNamedDialog: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Abrir paleta' }));
    await expect(await screen.findByRole('dialog', { name: 'Paleta de comandos' })).toBeInTheDocument();
  },
};

export const FocusesTheSearchFieldOnOpen: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Abrir paleta' }));
    const input = await screen.findByRole('combobox');
    await waitFor(() => expect(input).toHaveFocus());
  },
};

export const FiltersByKeywordIgnoringAccents: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Abrir paleta' }));
    await userEvent.type(await screen.findByRole('combobox'), 'PREFERENCIAS');
    await expect(await screen.findByRole('option', { name: /Ajustes/ })).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByRole('option', { name: /Nuevo proyecto/ })).toBeNull());
    // El grupo sin coincidencias desaparece.
    await waitFor(() => expect(screen.queryByText('Acciones')).toBeNull());
  },
};

export const EnterRunsTheHighlightedCommandAndCloses: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Abrir paleta' }));
    await userEvent.type(await screen.findByRole('combobox'), 'ajus');
    await userEvent.keyboard('{Enter}');
    await expect(onSettings).toHaveBeenCalled();
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    await expect(await canvas.findByText('Último: Ajustes')).toBeVisible();
  },
};

export const ArrowsMoveTheHighlight: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Abrir paleta' }));
    const input = await screen.findByRole('combobox');
    await waitFor(() => expect(input).toHaveFocus());
    await userEvent.keyboard('{ArrowDown}{Enter}');
    await expect(await canvas.findByText('Último: Bandeja de entrada')).toBeVisible();
  },
};

export const ShowsEmptyMessage: Story = {
  args: { emptyText: 'Sin coincidencias' },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Abrir paleta' }));
    await userEvent.type(await screen.findByRole('combobox'), 'zzz');
    await expect(await screen.findByText('Sin coincidencias')).toBeInTheDocument();
  },
};

export const ClosesWithEscapeAndRestoresFocus: Story = {
  play: async ({ canvas, userEvent }) => {
    const opener = canvas.getByRole('button', { name: 'Abrir paleta' });
    await userEvent.click(opener);
    await screen.findByRole('dialog');
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    await expect(opener).toHaveFocus();
  },
};
