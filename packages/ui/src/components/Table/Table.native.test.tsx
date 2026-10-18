import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react-native';
import * as stories from './Table.stories';

const { Default, Empty } = composeStories(stories);

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
});
