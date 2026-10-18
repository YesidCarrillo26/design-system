import { composeStories } from '@storybook/react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { fn } from 'storybook/test';
import * as stories from './Pagination.stories';
import { getPageItems } from './usePagination';

const { Default, LastPage, SinglePage } = composeStories(stories);
jest.useFakeTimers();

describe('Pagination (native)', () => {
  test('avanza con Siguiente y marca la página actual', async () => {
    const user = userEvent.setup();
    const onPageChange = fn();
    await render(<Default onPageChange={onPageChange} />);
    expect(screen.getByRole('button', { name: 'Página 1' })).toBeSelected();

    await user.press(screen.getByRole('button', { name: 'Siguiente' }));

    expect(onPageChange).toHaveBeenLastCalledWith(2);
    expect(screen.getByRole('button', { name: 'Página 2' })).toBeSelected();
  });

  test('deshabilita Anterior en la primera y Siguiente en la última', async () => {
    await render(<Default />);
    expect(screen.getByRole('button', { name: 'Anterior' })).toBeDisabled();

    await render(<LastPage />);
    expect(screen.getAllByRole('button', { name: 'Siguiente' }).at(-1)).toBeDisabled();
  });

  test('con una sola página no hay a dónde ir', async () => {
    await render(<SinglePage />);

    expect(screen.getByRole('button', { name: 'Anterior' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Siguiente' })).toBeDisabled();
  });
});

describe('getPageItems', () => {
  test('muestra todas las páginas si caben', () => {
    expect(getPageItems(1, 4)).toEqual([1, 2, 3, 4]);
  });

  test('mantiene 7 elementos al inicio, al medio y al final', () => {
    expect(getPageItems(1, 10)).toEqual([1, 2, 3, 4, 5, 'ellipsis-end', 10]);
    expect(getPageItems(5, 10)).toEqual([1, 'ellipsis-start', 4, 5, 6, 'ellipsis-end', 10]);
    expect(getPageItems(10, 10)).toEqual([1, 'ellipsis-start', 6, 7, 8, 9, 10]);
  });

  test('tolera valores fuera de rango', () => {
    expect(getPageItems(99, 10)).toEqual([1, 'ellipsis-start', 6, 7, 8, 9, 10]);
    expect(getPageItems(1, 0)).toEqual([1]);
  });
});
