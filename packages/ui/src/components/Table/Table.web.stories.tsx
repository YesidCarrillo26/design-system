import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Table, type TableProps } from './Table';
import { type Invoice, invoiceColumns, invoices } from './table.fixtures';

// Stories SOLO WEB: estructura semántica del DOM (ver Button.web.stories.tsx).
const meta = {
  title: 'Table',
  component: Table<Invoice>,
  tags: ['!autodocs', 'web-only'],
  args: { caption: 'Facturas recientes', rows: invoices, getRowKey: (row) => row.id, columns: invoiceColumns },
} satisfies Meta<TableProps<Invoice>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HasSemanticStructure: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('table', { name: 'Facturas recientes' })).toBeVisible();
    await expect(canvas.getAllByRole('columnheader')).toHaveLength(3);
    await expect(canvas.getAllByRole('columnheader')[0]).toHaveAttribute('scope', 'col');
    // 1 fila de encabezado + 3 de datos.
    await expect(canvas.getAllByRole('row')).toHaveLength(4);
    await expect(canvas.getByRole('cell', { name: '$1.200' })).toBeVisible();
  },
};
