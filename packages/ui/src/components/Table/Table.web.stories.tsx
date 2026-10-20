import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { Table, type TableProps } from './Table';
import { type Invoice, invoiceColumns, invoices, mixedInvoices, sortableInvoiceColumns } from './table.fixtures';

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

const names = (canvas: { getAllByRole: (role: string) => HTMLElement[] }) =>
  canvas.getAllByRole('row').slice(1).map((row) => row.querySelectorAll('td')[1]?.textContent);

export const SortsAndAnnouncesTheDirection: Story = {
  args: { columns: sortableInvoiceColumns, onSortChange: fn() },
  play: async ({ canvas, args, userEvent }) => {
    const header = canvas.getByRole('columnheader', { name: /Total/ });
    await expect(header).toHaveAttribute('aria-sort', 'none');

    await userEvent.click(canvas.getByRole('button', { name: 'Total, ordenar' }));
    await expect(header).toHaveAttribute('aria-sort', 'ascending');
    await expect(args.onSortChange).toHaveBeenLastCalledWith({ key: 'total', direction: 'asc' });
    await expect(names(canvas)).toEqual(['Grace Hopper', 'Ada Lovelace', 'Alan Turing']);

    await userEvent.click(canvas.getByRole('button', { name: 'Total, orden ascendente' }));
    await expect(header).toHaveAttribute('aria-sort', 'descending');
    await expect(names(canvas)).toEqual(['Alan Turing', 'Ada Lovelace', 'Grace Hopper']);

    await userEvent.click(canvas.getByRole('button', { name: 'Total, orden descendente' }));
    await expect(header).toHaveAttribute('aria-sort', 'none');
    await expect(args.onSortChange).toHaveBeenLastCalledWith(null);
    await expect(names(canvas)).toEqual(['Ada Lovelace', 'Grace Hopper', 'Alan Turing']);
  },
};

export const SortsWithKeyboard: Story = {
  args: { columns: sortableInvoiceColumns },
  play: async ({ canvas, userEvent }) => {
    canvas.getByRole('button', { name: 'Cliente, ordenar' }).focus();
    await userEvent.keyboard('{Enter}');
    await expect(canvas.getByRole('columnheader', { name: /Cliente/ })).toHaveAttribute('aria-sort', 'ascending');
  },
};

export const SortsTextIgnoringAccentsAndNumbersNaturally: Story = {
  args: { rows: mixedInvoices, columns: sortableInvoiceColumns, defaultSort: { key: 'id', direction: 'asc' } },
  play: async ({ canvas }) => {
    // "F-2" va antes que "F-10" (orden natural), no después como en un orden de texto simple.
    await expect(canvas.getAllByRole('row').slice(1).map((row) => row.querySelectorAll('td')[0]?.textContent)).toEqual(['F-1', 'F-2', 'F-10']);
  },
};

export const ManualSortingLeavesRowsUntouched: Story = {
  args: { columns: sortableInvoiceColumns, manualSorting: true, defaultSort: { key: 'total', direction: 'desc' } },
  play: async ({ canvas }) => {
    await expect(names(canvas)).toEqual(['Ada Lovelace', 'Grace Hopper', 'Alan Turing']);
    await expect(canvas.getByRole('columnheader', { name: /Total/ })).toHaveAttribute('aria-sort', 'descending');
  },
};

export const SelectsRowsAndShowsMixedState: Story = {
  args: { selectable: true, onSelectionChange: fn(), getRowLabel: (row: Invoice) => row.client },
  play: async ({ canvas, args, userEvent }) => {
    const all = canvas.getByRole('checkbox', { name: 'Seleccionar todas las filas' });
    await expect(all).not.toBeChecked();

    await userEvent.click(canvas.getByRole('checkbox', { name: 'Seleccionar Grace Hopper' }));
    await expect(args.onSelectionChange).toHaveBeenLastCalledWith(['F-002']);
    await expect(all).toBePartiallyChecked();

    await userEvent.click(all);
    await expect(args.onSelectionChange).toHaveBeenLastCalledWith(['F-001', 'F-002', 'F-003']);
    await expect(all).toBeChecked();

    await userEvent.click(all);
    await expect(args.onSelectionChange).toHaveBeenLastCalledWith([]);
  },
};

export const SelectionFollowsRowsWhenSorted: Story = {
  args: { selectable: true, columns: sortableInvoiceColumns, onSelectionChange: fn(), getRowLabel: (row: Invoice) => row.client },
  play: async ({ canvas, args, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Total, ordenar' }));
    await userEvent.click(canvas.getByRole('checkbox', { name: 'Seleccionar Ada Lovelace' }));
    // Se informa con las claves, en el orden original de `rows`, no el visual.
    await expect(args.onSelectionChange).toHaveBeenLastCalledWith(['F-001']);
  },
};
