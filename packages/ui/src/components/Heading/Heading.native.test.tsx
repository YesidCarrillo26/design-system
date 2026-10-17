import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react-native';
import * as stories from './Heading.stories';

const { Default } = composeStories(stories);

describe('Heading (native)', () => {
  test('tiene rol de encabezado', async () => {
    await render(<Default />);

    expect(screen.getByRole('heading', { name: 'Un título' })).toBeOnTheScreen();
  });
});
