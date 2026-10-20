import { composeStories } from '@storybook/react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { fn } from 'storybook/test';
import * as stories from './Table.stories';

const { Default, Empty, Sortable, SortedByTotalDescending, Selectable } = composeStories(stories);

jest.useFakeTimers();

// Un `View` con `role` no es un elemento de accesibilidad si no es `accessible`, así que
// `getByRole` no lo encuentra. Se cuenta la estructura en el árbol renderizado.
interface Node {
  props?: { role?: string };
  children?: (Node | string)[] | null;
}

function countRole(node: Node | string | null | undefined, role: string): number {
  if (!node || typeof node === 'string') return 0;
  const own = node.props?.role === role ? 1 : 0;
  return own + (node.children ?? []).reduce<number>((total, child) => total + countRole(child, role), 0);
}

const tree = () => screen.toJSON() as unknown as Node;

describe('Table (native)', () => {
  test('declara la estructura de tabla: encabezados, filas y celdas', async () => {
    await render(<Default />);

    expect(countRole(tree(), 'table')).toBe(1);
    expect(countRole(tree(), 'columnheader')).toBe(3);
    // 1 fila de encabezado + 3 de datos.
    expect(countRole(tree(), 'row')).toBe(4);
    expect(countRole(tree(), 'cell')).toBe(9);
  });

  test('muestra el título y los datos', async () => {
    await render(<Default />);

    expect(screen.getByText('Facturas recientes')).toBeOnTheScreen();
    expect(screen.getByText('Ada Lovelace')).toBeOnTheScreen();
  });

  test('usa render para personalizar una celda', async () => {
    await render(<Default />);

    expect(screen.getByText('$1.200')).toBeOnTheScreen();
  });

  test('muestra el texto vacío si no hay filas', async () => {
    await render(<Empty />);

    expect(screen.getByText('No hay facturas')).toBeOnTheScreen();
    expect(countRole(tree(), 'row')).toBe(1);
  });

  describe('orden', () => {
    const clients = () => screen.getAllByText(/Lovelace|Hopper|Turing/).map((node) => node.props.children as string);

    test('el botón del encabezado recorre ascendente → descendente → sin ordenar y lo anuncia', async () => {
      const user = userEvent.setup();
      const onSortChange = fn();
      await render(<Sortable onSortChange={onSortChange} />);

      await user.press(screen.getByRole('button', { name: 'Total, ordenar' }));
      expect(clients()).toEqual(['Grace Hopper', 'Ada Lovelace', 'Alan Turing']);
      expect(onSortChange).toHaveBeenLastCalledWith({ key: 'total', direction: 'asc' });

      await user.press(screen.getByRole('button', { name: 'Total, orden ascendente' }));
      expect(clients()).toEqual(['Alan Turing', 'Ada Lovelace', 'Grace Hopper']);

      await user.press(screen.getByRole('button', { name: 'Total, orden descendente' }));
      expect(clients()).toEqual(['Ada Lovelace', 'Grace Hopper', 'Alan Turing']);
      expect(onSortChange).toHaveBeenLastCalledWith(null);
    });

    test('arranca con el orden inicial', async () => {
      await render(<SortedByTotalDescending />);

      expect(clients()).toEqual(['Alan Turing', 'Ada Lovelace', 'Grace Hopper']);
      expect(screen.getByRole('button', { name: 'Total, orden descendente' })).toBeOnTheScreen();
    });

    test('una columna sin sortable no es un botón', async () => {
      await render(<Default />);

      expect(screen.queryByRole('button', { name: /ordenar/ })).not.toBeOnTheScreen();
    });
  });

  describe('selección', () => {
    test('elegir una fila notifica sus claves y deja "seleccionar todas" en estado mixto', async () => {
      const user = userEvent.setup();
      const onSelectionChange = fn();
      await render(<Selectable defaultSelectedKeys={[]} onSelectionChange={onSelectionChange} />);

      await user.press(screen.getByRole('checkbox', { name: 'Seleccionar Grace Hopper' }));

      expect(onSelectionChange).toHaveBeenLastCalledWith(['F-002']);
      expect(screen.getByRole('checkbox', { name: 'Seleccionar todas las filas' })).toBePartiallyChecked();
    });

    test('"seleccionar todas" elige y desmarca todas las filas', async () => {
      const user = userEvent.setup();
      const onSelectionChange = fn();
      await render(<Selectable defaultSelectedKeys={[]} onSelectionChange={onSelectionChange} />);

      await user.press(screen.getByRole('checkbox', { name: 'Seleccionar todas las filas' }));
      expect(onSelectionChange).toHaveBeenLastCalledWith(['F-001', 'F-002', 'F-003']);
      expect(screen.getByRole('checkbox', { name: 'Seleccionar todas las filas' })).toBeChecked();

      await user.press(screen.getByRole('checkbox', { name: 'Seleccionar todas las filas' }));
      expect(onSelectionChange).toHaveBeenLastCalledWith([]);
    });

    test('sin selectable no hay casillas', async () => {
      await render(<Default />);

      expect(screen.queryByRole('checkbox')).not.toBeOnTheScreen();
    });
  });
});
