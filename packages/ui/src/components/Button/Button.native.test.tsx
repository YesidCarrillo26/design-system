import { composeStories } from '@storybook/react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { fn } from 'storybook/test';
import * as stories from './Button.stories';

// Reutiliza las stories compartidas como casos de prueba (portable stories).
const { Primary, Disabled, Loading } = composeStories(stories);

jest.useFakeTimers();

describe('Button (native)', () => {
  test('muestra el texto de la story', async () => {
    await render(<Primary />);

    expect(screen.getByRole('button', { name: 'Button' })).toBeOnTheScreen();
  });

  test('llama a onPress al presionar', async () => {
    const user = userEvent.setup();
    const onPress = fn();
    await render(<Primary onPress={onPress} />);

    await user.press(screen.getByRole('button', { name: 'Button' }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  test('no llama a onPress cuando está deshabilitado', async () => {
    const user = userEvent.setup();
    const onPress = fn();
    await render(<Disabled onPress={onPress} />);

    await user.press(screen.getByRole('button', { name: 'Button' }));

    expect(onPress).not.toHaveBeenCalled();
  });

  test('con loading no llama a onPress, pero sigue en el árbol de accesibilidad', async () => {
    const user = userEvent.setup();
    const onPress = fn();
    await render(<Loading onPress={onPress} />);

    const button = screen.getByRole('button', { name: /Guardando/ });
    await user.press(button);

    expect(button).toBeOnTheScreen();
    expect(onPress).not.toHaveBeenCalled();
  });
});
