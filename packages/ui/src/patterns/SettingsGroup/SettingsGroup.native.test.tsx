import { composeStories } from '@storybook/react';
import { render, screen, userEvent } from '@testing-library/react-native';
import * as stories from './SettingsGroup.stories';

const { Default, WithFooter, WithoutTitle } = composeStories(stories);

jest.useFakeTimers();

describe('SettingsGroup (native)', () => {
  test('muestra el título, las filas y sus valores', async () => {
    await render(<Default />);

    expect(screen.getByText('Preferencias')).toBeOnTheScreen();
    expect(screen.getByText('Notificaciones push')).toBeOnTheScreen();
    expect(screen.getByText('Activadas')).toBeOnTheScreen();
  });

  test('las filas pulsables son botones y el interruptor sigue operable', async () => {
    const user = userEvent.setup();
    await render(<Default />);

    expect(screen.getByRole('button', { name: /Correo/ })).toBeOnTheScreen();
    await user.press(screen.getByRole('switch', { name: 'Sincronizar calendario' }));

    expect(screen.getByRole('switch', { name: 'Sincronizar calendario' })).toBeChecked();
  });

  test('muestra la nota al pie', async () => {
    await render(<WithFooter />);

    expect(screen.getByText('El modo automático sigue el ajuste del sistema.')).toBeOnTheScreen();
  });

  test('sin título no muestra encabezado', async () => {
    await render(<WithoutTitle />);

    expect(screen.queryByText('Preferencias')).not.toBeOnTheScreen();
    expect(screen.getByText('Ayuda')).toBeOnTheScreen();
  });
});
