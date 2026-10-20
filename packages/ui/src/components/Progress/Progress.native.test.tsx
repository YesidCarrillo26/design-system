import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react-native';
import * as stories from './Progress.stories';

const { Linear, Indeterminate, Circular, CircularIndeterminate } = composeStories(stories);

describe('Progress (native)', () => {
  test('expone el valor a tecnologías de apoyo', async () => {
    await render(<Linear />);

    expect(screen.getByRole('progressbar', { name: 'Subiendo archivo' })).toHaveProp('aria-valuenow', 60);
  });

  test('el anillo también es un progressbar con valor', async () => {
    await render(<Circular />);

    expect(screen.getByRole('progressbar', { name: 'Subiendo archivo' })).toHaveProp('aria-valuenow', 60);
    expect(screen.getByText('60%')).toBeOnTheScreen();
  });

  test('indeterminado no informa valor', async () => {
    await render(<Indeterminate />);

    expect(screen.getByRole('progressbar', { name: 'Cargando' })).not.toHaveProp('aria-valuenow');
  });

  test('el anillo indeterminado usa el spinner accesible', async () => {
    await render(<CircularIndeterminate />);

    expect(screen.getByRole('progressbar', { name: 'Cargando' })).toBeOnTheScreen();
  });
});
