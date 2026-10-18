import type { TableColumn } from './Table.types';

export interface Invoice {
  id: string;
  client: string;
  status: 'Pagada' | 'Pendiente';
  total: number;
}

export const invoices: Invoice[] = [
  { id: 'F-001', client: 'Ada Lovelace', status: 'Pagada', total: 1200 },
  { id: 'F-002', client: 'Grace Hopper', status: 'Pendiente', total: 860 },
  { id: 'F-003', client: 'Alan Turing', status: 'Pagada', total: 2450 },
];

export const invoiceColumns: TableColumn<Invoice>[] = [
  { key: 'id', header: 'Factura' },
  { key: 'client', header: 'Cliente' },
  { key: 'total', header: 'Total', align: 'end', render: (row) => `$${row.total.toLocaleString('es-CO')}` },
];
