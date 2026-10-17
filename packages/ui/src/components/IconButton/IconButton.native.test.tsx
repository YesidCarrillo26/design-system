import { composeStories } from '@storybook/react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { fn } from 'storybook/test';
import * as stories from './IconButton.stories';

const { Ghost, Disabled } = composeStories(stories);

jest.useFakeTimers();

describe('IconButton (native)', () => {
  test('se identifica por su label y llama a onPress', async () => {
    const user = userEvent.setup();
    const onPress = fn();
    await render(<Ghost onPress={onPress} />);

    await user.press(screen.getByRole('button', { name: 'Agregar' }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  test('no llama a onPress deshabilitado', async () => {
    const user = userEvent.setup();
    const onPress = fn();
    await render(<Disabled onPress={onPress} />);

    await user.press(screen.getByRole('button', { name: 'Agregar' }));

    expect(onPress).not.toHaveBeenCalled();
  });
});
