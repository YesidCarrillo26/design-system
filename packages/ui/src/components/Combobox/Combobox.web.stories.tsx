import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, screen, waitFor } from 'storybook/test';
import { Combobox } from './Combobox';

const meta = {
  title: 'Combobox',
  component: Combobox,
  tags: ['!autodocs', 'web-only'],
  args: {
    label: 'Ciudad',
    onValueChange: fn(),
    options: [
      { value: 'bog', label: 'Bogotá' },
      { value: 'med', label: 'Medellín' },
      { value: 'cuc', label: 'Cúcuta' },
    ],
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FiltersIgnoringAccents: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('combobox', { name: 'Ciudad' }));
    await userEvent.type(await screen.findByPlaceholderText('Buscar…'), 'bogota');
    await expect(await screen.findByRole('option', { name: 'Bogotá' })).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByRole('option', { name: 'Medellín' })).toBeNull());
  },
};

export const SelectsWithKeyboard: Story = {
  play: async ({ canvas, args, userEvent }) => {
    await userEvent.click(canvas.getByRole('combobox', { name: 'Ciudad' }));
    await userEvent.type(await screen.findByPlaceholderText('Buscar…'), 'med');
    await userEvent.keyboard('{ArrowDown}{Enter}');
    await expect(args.onValueChange).toHaveBeenLastCalledWith('med');
  },
};

export const ShowsEmptyMessage: Story = {
  args: { emptyText: 'Sin coincidencias' },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('combobox', { name: 'Ciudad' }));
    await userEvent.type(await screen.findByPlaceholderText('Buscar…'), 'zzz');
    await expect(await screen.findByText('Sin coincidencias')).toBeInTheDocument();
  },
};

export const EscapeClosesWithoutChanging: Story = {
  play: async ({ canvas, args, userEvent }) => {
    await userEvent.click(canvas.getByRole('combobox', { name: 'Ciudad' }));
    await screen.findByPlaceholderText('Buscar…');
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByPlaceholderText('Buscar…')).toBeNull());
    await expect(args.onValueChange).not.toHaveBeenCalled();
  },
};
