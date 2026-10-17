import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react-native';
import * as stories from './Avatar.stories';
import { initials } from './useAvatar';

const { Initials } = composeStories(stories);

describe('Avatar (native)', () => {
  test('muestra las iniciales cuando no hay imagen', async () => {
    await render(<Initials />);

    expect(screen.getByText('AL')).toBeOnTheScreen();
  });

  test('initials resuelve nombres de una y varias palabras', () => {
    expect(initials('Ada Lovelace')).toBe('AL');
    expect(initials('  grace  ')).toBe('G');
    expect(initials('Ana María Pérez')).toBe('AM');
  });
});
