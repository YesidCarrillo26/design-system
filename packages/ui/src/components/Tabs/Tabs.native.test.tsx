import { composeStories } from '@storybook/react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { fn } from 'storybook/test';
import * as stories from './Tabs.stories';

const { Default, StartsOnSecond } = composeStories(stories);
jest.useFakeTimers();

describe('Tabs (native)', () => {
  test('muestra el panel de la pestaña elegida', async () => {
    const user = userEvent.setup();
    const onValueChange = fn();
    await render(<Default onValueChange={onValueChange} />);
    expect(screen.getByText('Resumen del proyecto.')).toBeOnTheScreen();

    await user.press(screen.getByRole('tab', { name: 'Ajustes' }));

    expect(screen.getByText('Ajustes del proyecto.')).toBeOnTheScreen();
    expect(screen.queryByText('Resumen del proyecto.')).not.toBeOnTheScreen();
    expect(screen.getByRole('tab', { name: 'Ajustes' })).toBeSelected();
    expect(onValueChange).toHaveBeenLastCalledWith('ajustes');
  });

  test('respeta la pestaña inicial', async () => {
    await render(<StartsOnSecond />);

    expect(screen.getByText('Actividad reciente.')).toBeOnTheScreen();
  });
});
