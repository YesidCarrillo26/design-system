import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react-native';
import * as stories from './Kbd.stories';

const { Default } = composeStories(stories);

describe('Kbd (native)', () => {
  test('muestra la tecla', async () => {
    await render(<Default />);

    expect(screen.getByText('⌘')).toBeOnTheScreen();
  });
});
