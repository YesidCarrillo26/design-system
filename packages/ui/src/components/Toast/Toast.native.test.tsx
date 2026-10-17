import { composeStories } from '@storybook/react';
import { act, render, screen, userEvent } from '@testing-library/react-native';
import * as stories from './Toast.stories';

const { Persistent } = composeStories(stories);
jest.useFakeTimers();

describe('Toast (native)', () => {
  test('muestra un aviso y se cierra con su botón', async () => {
    const user = userEvent.setup();
    await render(<Persistent />);

    await user.press(screen.getByRole('button', { name: 'Mostrar aviso' }));
    expect(screen.getByText('Cambios guardados')).toBeOnTheScreen();

    await user.press(screen.getByRole('button', { name: 'Cerrar aviso' }));
    expect(screen.queryByText('Cambios guardados')).not.toBeOnTheScreen();
  });

  test('los errores se anuncian como alerta', async () => {
    const user = userEvent.setup();
    await render(<Persistent />);

    await user.press(screen.getByRole('button', { name: 'Mostrar error' }));

    expect(screen.getByRole('alert')).toHaveTextContent('No se pudo guardar');
  });

  test('se oculta solo pasada la duración', async () => {
    const user = userEvent.setup();
    await render(<Persistent duration={500} />);

    await user.press(screen.getByRole('button', { name: 'Mostrar aviso' }));
    expect(screen.getByText('Cambios guardados')).toBeOnTheScreen();
    await act(async () => {
      await jest.advanceTimersByTimeAsync(600);
    });

    expect(screen.queryByText('Cambios guardados')).not.toBeOnTheScreen();
  });
});
