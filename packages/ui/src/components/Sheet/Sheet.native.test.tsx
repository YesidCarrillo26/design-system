import { composeStories } from '@storybook/react';
import { render, screen, userEvent, waitFor } from '@testing-library/react-native';
import * as stories from './Sheet.stories';

const { Default } = composeStories(stories);
jest.useFakeTimers();

describe('Sheet (native)', () => {
  test('se abre y se cierra', async () => {
    const user = userEvent.setup();
    await render(<Default />);

    await user.press(screen.getByRole('button', { name: 'Abrir hoja' }));
    expect(screen.getByRole('dialog', { name: 'Filtros' })).toBeOnTheScreen();

    await user.press(screen.getByRole('button', { name: 'Cerrar' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeOnTheScreen());
  });
});
