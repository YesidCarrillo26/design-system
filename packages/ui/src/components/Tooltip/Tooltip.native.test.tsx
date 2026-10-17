import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react-native';
import * as stories from './Tooltip.stories';

const { Default } = composeStories(stories);

describe('Tooltip (native)', () => {
  test('expone el texto como pista de accesibilidad del elemento', async () => {
    await render(<Default />);

    expect(screen.getByRole('button', { name: 'Agregar' })).toHaveProp('accessibilityHint', 'Agregar elemento');
  });
});
