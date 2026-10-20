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

/** Facturas con columnas ordenables, para las stories de orden y selección. */
export const sortableInvoiceColumns: TableColumn<Invoice>[] = [
  { key: 'id', header: 'Factura', sortable: true },
  { key: 'client', header: 'Cliente', sortable: true },
  { key: 'total', header: 'Total', align: 'end', sortable: true, render: (row) => `$${row.total.toLocaleString('es-CO')}` },
];

/** Para probar el orden con textos con acentos y números dentro del texto. */
export const mixedInvoices: Invoice[] = [
  { id: 'F-10', client: 'Álvaro Díaz', status: 'Pendiente', total: 300 },
  { id: 'F-2', client: 'Zoe Pérez', status: 'Pagada', total: 1200 },
  { id: 'F-1', client: 'álvaro Núñez', status: 'Pagada', total: 50 },
];
