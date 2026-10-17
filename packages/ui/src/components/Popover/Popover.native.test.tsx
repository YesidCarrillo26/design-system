import { composeStories } from '@storybook/react';
import { render, screen, userEvent } from '@testing-library/react-native';
import * as stories from './Popover.stories';

const { Default } = composeStories(stories);
jest.useFakeTimers();

describe('Popover (native)', () => {
  test('muestra su contenido al tocar el disparador', async () => {
    const user = userEvent.setup();
    await render(<Default />);
    expect(screen.queryByText('Plan Pro')).not.toBeOnTheScreen();

    await user.press(screen.getByRole('button', { name: 'Ver detalles del plan' }));

    expect(screen.getByText('Plan Pro')).toBeOnTheScreen();
  });
});
