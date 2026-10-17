import { composeStories } from '@storybook/react';
import { render, screen, userEvent } from '@testing-library/react-native';
import * as stories from './EmptyState.stories';

const { Default, WithAction } = composeStories(stories);
jest.useFakeTimers();

describe('EmptyState (native)', () => {
  test('muestra título y descripción', async () => {
    await render(<Default />);

    expect(screen.getByRole('heading', { name: 'No hay tareas' })).toBeOnTheScreen();
    expect(screen.getByText('Cuando agregues una, aparecerá aquí.')).toBeOnTheScreen();
  });

  test('la acción es operable', async () => {
    const user = userEvent.setup();
    await render(<WithAction />);

    await user.press(screen.getByRole('button', { name: 'Agregar tarea' }));
  });
});
