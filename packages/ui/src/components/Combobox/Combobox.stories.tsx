import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Combobox } from './Combobox';

const cities = [
  { value: 'bog', label: 'Bogotá' },
  { value: 'med', label: 'Medellín' },
  { value: 'cal', label: 'Cali' },
  { value: 'baq', label: 'Barranquilla' },
  { value: 'ctg', label: 'Cartagena' },
  { value: 'cuc', label: 'Cúcuta' },
  { value: 'buc', label: 'Bucaramanga' },
  { value: 'per', label: 'Pereira' },
  { value: 'sma', label: 'Santa Marta' },
  { value: 'ibe', label: 'Ibagué' },
];

const meta = {
  component: Combobox,
  args: { label: 'Ciudad', placeholder: 'Selecciona una ciudad', searchPlaceholder: 'Buscar ciudad', options: cities, onValueChange: fn() },
  parameters: { layout: 'padded', docs: { description: { component: 'Referencias en Mobbin: filtros con búsqueda de Qatalog, Slite y Sprig.' } } },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithValue: Story = { args: { defaultValue: 'med' } };
export const WithError: Story = { args: { error: 'Elige una ciudad.' } };
export const OneOptionDisabled: Story = { args: { options: cities.map((c) => (c.value === 'cal' ? { ...c, disabled: true } : c)) } };
export const Disabled: Story = { args: { disabled: true, defaultValue: 'bog' } };
