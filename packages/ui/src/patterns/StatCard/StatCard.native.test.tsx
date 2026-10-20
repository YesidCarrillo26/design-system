import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react-native';
import * as stories from './StatCard.stories';

const { Positive, UpIsBad, ValueOnly, Loading } = composeStories(stories);

describe('StatCard (native)', () => {
  test('muestra etiqueta, cifra, variación con su signo y comparación', async () => {
    await render(<Positive />);

    expect(screen.getByText('Suscriptores')).toBeOnTheScreen();
    expect(screen.getByText('26')).toBeOnTheScreen();
    expect(screen.getByText('+420 %')).toBeOnTheScreen();
    expect(screen.getByText('vs. período anterior')).toBeOnTheScreen();
  });

  test('el signo de la variación está en el texto, no solo en el color', async () => {
    await render(<UpIsBad />);

    expect(screen.getByText('+27 %')).toBeOnTheScreen();
  });

  test('sin variación ni comparación solo muestra la cifra', async () => {
    await render(<ValueOnly />);

    expect(screen.getByText('26')).toBeOnTheScreen();
    expect(screen.queryByText('+420 %')).not.toBeOnTheScreen();
  });

  test('cargando oculta la cifra y mantiene la etiqueta', async () => {
    await render(<Loading />);

    expect(screen.getByText('Suscriptores')).toBeOnTheScreen();
    expect(screen.queryByText('26')).not.toBeOnTheScreen();
  });
});
