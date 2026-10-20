import { composeStories } from '@storybook/react';
import { fireEvent, render, screen, userEvent, waitFor } from '@testing-library/react-native';
import * as stories from './CommandPalette.stories';

const { Default } = composeStories(stories);

jest.useFakeTimers();

const open = async () => {
  const user = userEvent.setup();
  await render(<Default />);
  await user.press(screen.getByRole('button', { name: 'Abrir paleta' }));
  return user;
};

describe('CommandPalette (native)', () => {
  test('abre con los comandos agrupados', async () => {
    await open();

    expect(screen.getByRole('dialog', { name: 'Paleta de comandos' })).toBeOnTheScreen();
    expect(screen.getByText('Navegación')).toBeOnTheScreen();
    expect(screen.getByRole('button', { name: 'Nuevo proyecto' })).toBeOnTheScreen();
  });

  test('busca por palabra clave sin distinguir acentos y oculta el grupo vacío', async () => {
    await open();

    await fireEvent.changeText(screen.getByLabelText('Escribe un comando o busca…'), 'CONFIGURACION');

    expect(screen.getByRole('button', { name: 'Ajustes' })).toBeOnTheScreen();
    expect(screen.queryByRole('button', { name: 'Nuevo proyecto' })).not.toBeOnTheScreen();
    expect(screen.queryByText('Acciones')).not.toBeOnTheScreen();
  });

  test('elegir un comando lo ejecuta y cierra la paleta', async () => {
    const user = await open();

    await user.press(screen.getByRole('button', { name: 'Ajustes' }));

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeOnTheScreen());
    expect(screen.getByText('Último: Ajustes')).toBeOnTheScreen();
  });

  test('sin coincidencias muestra el mensaje', async () => {
    await open();

    await fireEvent.changeText(screen.getByLabelText('Escribe un comando o busca…'), 'zzz');

    expect(screen.getByText('Sin resultados')).toBeOnTheScreen();
  });
});
