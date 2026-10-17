import { composeStories } from '@storybook/react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { fn } from 'storybook/test';
import * as stories from './Select.stories';

const { Default } = composeStories(stories);

jest.useFakeTimers();

describe('Select (native)', () => {
  test('abre la lista, elige una opción y la muestra', async () => {
    const user = userEvent.setup();
    const onValueChange = fn();
    await render(<Default onValueChange={onValueChange} />);

    await user.press(screen.getByRole('combobox', { name: 'País' }));
    await user.press(screen.getByRole('radio', { name: 'México' }));

    expect(onValueChange).toHaveBeenLastCalledWith('mx');
    expect(screen.getByRole('combobox', { name: 'País' })).toHaveTextContent('México');
  });
});
