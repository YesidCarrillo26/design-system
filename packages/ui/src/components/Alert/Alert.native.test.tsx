import { composeStories } from '@storybook/react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { fn } from 'storybook/test';
import * as stories from './Alert.stories';

const { Info, Dismissible } = composeStories(stories);

jest.useFakeTimers();

describe('Alert (native)', () => {
  test('muestra título y mensaje', async () => {
    await render(<Info />);

    expect(screen.getByText('Revisa tu plan')).toBeOnTheScreen();
    expect(screen.getByText('Tu período de prueba termina en 3 días.')).toBeOnTheScreen();
  });

  test('el botón de cerrar invoca onDismiss', async () => {
    const user = userEvent.setup();
    const onDismiss = fn();
    await render(<Dismissible onDismiss={onDismiss} />);

    await user.press(screen.getByRole('button', { name: 'Cerrar' }));

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  test('sin onDismiss no hay botón de cerrar', async () => {
    await render(<Info />);

    expect(screen.queryByRole('button', { name: 'Cerrar' })).not.toBeOnTheScreen();
  });
});
