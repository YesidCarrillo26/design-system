import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../Badge';
import { Table, type TableProps } from './Table';
import { type Invoice, invoiceColumns, invoices, sortableInvoiceColumns } from './table.fixtures';

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

/** Encabezados ordenables: ascendente → descendente → sin ordenar. */
export const Sortable: Story = { args: { columns: sortableInvoiceColumns } };

export const SortedByTotalDescending: Story = {
  args: { columns: sortableInvoiceColumns, defaultSort: { key: 'total', direction: 'desc' } },
};

/** Con `selectable` aparece una columna de casillas y "seleccionar todas" (mixto si solo hay algunas). */
export const Selectable: Story = {
  args: { selectable: true, defaultSelectedKeys: ['F-002'], getRowLabel: (row: Invoice) => row.client },
};

export const SortableAndSelectable: Story = {
  args: { columns: sortableInvoiceColumns, selectable: true, defaultSelectedKeys: ['F-001', 'F-003'], getRowLabel: (row: Invoice) => row.client },
};
