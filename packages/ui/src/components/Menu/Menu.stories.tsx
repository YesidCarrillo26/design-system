import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Menu } from './Menu';

const meta = {
  component: Menu,
  args: {
    trigger: 'Acciones',
    label: 'Acciones del documento',
    items: [
      { label: 'Renombrar', onSelect: fn() },
      { label: 'Duplicar', onSelect: fn() },
      { label: 'Archivar', onSelect: fn(), disabled: true },
      { label: 'Eliminar', onSelect: fn(), destructive: true },
    ],
  },
  parameters: { layout: 'centered', controls: { exclude: ['trigger', 'items'] }, platforms: { web: 'menú flotante', native: 'hoja de acciones' } },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
