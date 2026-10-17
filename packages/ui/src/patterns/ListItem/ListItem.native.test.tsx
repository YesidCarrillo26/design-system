import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react-native';
import * as stories from './ListItem.stories';

const { Default, WithLeadingAndTrailing } = composeStories(stories);

describe('ListItem (native)', () => {
  test('muestra título y descripción', async () => {
    await render(<Default />);

    expect(screen.getByText('Ada Lovelace')).toBeOnTheScreen();
    expect(screen.getByText('Matemática')).toBeOnTheScreen();
  });

  test('compone los controles de leading y trailing', async () => {
    await render(<WithLeadingAndTrailing />);

    expect(screen.getByRole('img', { name: 'Ada Lovelace' })).toBeOnTheScreen();
    expect(screen.getByRole('button', { name: 'Ver perfil' })).toBeOnTheScreen();
  });
});
