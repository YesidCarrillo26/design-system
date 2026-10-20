import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { CommandPaletteExample } from './CommandPalette.example';

const groups = [
  {
    label: 'Navegación',
    items: [
      { id: 'home', label: 'Ir al inicio', icon: 'chevron-right' as const, shortcut: ['G', 'H'], onSelect: fn() },
      { id: 'settings', label: 'Ajustes', description: 'Cuenta y preferencias', icon: 'settings' as const, shortcut: ['⌘', ','], keywords: ['preferencias', 'configuración'], onSelect: fn() },
      { id: 'inbox', label: 'Bandeja de entrada', icon: 'mail' as const, onSelect: fn() },
    ],
  },
  {
    label: 'Acciones',
    items: [
      { id: 'new', label: 'Nuevo proyecto', icon: 'plus' as const, shortcut: ['⌘', 'N'], onSelect: fn() },
      { id: 'invite', label: 'Invitar a alguien', icon: 'user' as const, onSelect: fn() },
    ],
  },
];

// Referencias de diseño (Mobbin): paletas de comandos de Devin, Juicebox y Magnific.
const meta = {
  component: CommandPaletteExample,
  args: { groups },
  parameters: { layout: 'centered', docs: { description: { component: 'Referencias en Mobbin: paletas de comandos de Devin, Juicebox y Magnific. En native es una hoja alta con búsqueda; no muestra atajos de teclado.' } } },
} satisfies Meta<typeof CommandPaletteExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithCustomTexts: Story = { args: { label: 'Buscar acciones', placeholder: 'Busca una acción…', emptyText: 'Ninguna acción coincide' } };
