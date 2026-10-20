import { composeStories } from '@storybook/react';
import { render, screen, userEvent, waitFor } from '@testing-library/react-native';
import { fn } from 'storybook/test';
import * as stories from './Menu.stories';

const { Default } = composeStories(stories);
jest.useFakeTimers();

describe('Menu (native)', () => {
  test('elegir una acción la ejecuta y cierra el menú', async () => {
    const user = userEvent.setup();
    const onSelect = fn();
    await render(<Default items={[{ label: 'Renombrar', onSelect }]} />);

    await user.press(screen.getByRole('button', { name: 'Acciones del documento' }));
    await user.press(screen.getByRole('menuitem', { name: 'Renombrar' }));

    expect(onSelect).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.queryByRole('menuitem')).not.toBeOnTheScreen());
  });

  test('una acción deshabilitada no se ejecuta', async () => {
    const user = userEvent.setup();
    const onSelect = fn();
    await render(<Default items={[{ label: 'Archivar', onSelect, disabled: true }]} />);

    await user.press(screen.getByRole('button', { name: 'Acciones del documento' }));
    await user.press(screen.getByRole('menuitem', { name: 'Archivar' }));

    expect(onSelect).not.toHaveBeenCalled();
  });
});
