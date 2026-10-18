import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../Badge';
import { Table, type TableProps } from './Table';
import { type Invoice, invoiceColumns, invoices } from './table.fixtures';

const meta = {
  component: Table<Invoice>,
  args: {
    caption: 'Facturas recientes',
    rows: invoices,
    getRowKey: (row) => row.id,
    columns: invoiceColumns,
  },
  parameters: {
    platforms: {
      web: '<table> real con caption y scope="col"; desplazamiento horizontal',
      native: 'Views con roles table/row/columnheader/cell; columnas de igual ancho',
    },
  },
} satisfies Meta<TableProps<Invoice>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCustomCells: Story = {
  args: {
    columns: [
      { key: 'client', header: 'Cliente' },
      {
        key: 'status',
        header: 'Estado',
        render: (row) => <Badge variant={row.status === 'Pagada' ? 'default' : 'secondary'}>{row.status}</Badge>,
      },
    ],
  },
};

export const Empty: Story = { args: { rows: [], emptyText: 'No hay facturas' } };
