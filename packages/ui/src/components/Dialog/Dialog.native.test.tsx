import { composeStories } from '@storybook/react';
import { render, screen, userEvent, waitFor } from '@testing-library/react-native';
import * as stories from './Dialog.stories';

const { Default } = composeStories(stories);
jest.useFakeTimers();

describe('Dialog (native)', () => {
  test('se abre con su título como nombre y se cierra desde el contenido', async () => {
    const user = userEvent.setup();
    await render(<Default />);
    expect(screen.queryByRole('dialog')).not.toBeOnTheScreen();

    await user.press(screen.getByRole('button', { name: 'Abrir diálogo' }));
    expect(screen.getByRole('dialog', { name: 'Eliminar proyecto' })).toBeOnTheScreen();

    await user.press(screen.getByRole('button', { name: 'Cancelar' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeOnTheScreen());
  });

  test('el botón de cerrar también lo cierra', async () => {
    const user = userEvent.setup();
    await render(<Default />);
    await user.press(screen.getByRole('button', { name: 'Abrir diálogo' }));

    await user.press(screen.getByRole('button', { name: 'Cerrar' }));

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeOnTheScreen());
  });
});
