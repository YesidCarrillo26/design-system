import { composeStories } from '@storybook/react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { fn } from 'storybook/test';
import * as stories from './ListItem.stories';

const { Default, WithLeadingAndTrailing, Pressable, Disabled } = composeStories(stories);

jest.useFakeTimers();

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

  test('estática no es un botón', async () => {
    await render(<Default />);

    expect(screen.queryByRole('button')).not.toBeOnTheScreen();
  });

  test('con onPress es un botón que muestra el valor y se activa', async () => {
    const user = userEvent.setup();
    const onPress = fn();
    await render(<Pressable onPress={onPress} />);

    expect(screen.getByText('Automático')).toBeOnTheScreen();
    await user.press(screen.getByRole('button', { name: /Modo oscuro/ }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  test('deshabilitada no se activa', async () => {
    const user = userEvent.setup();
    const onPress = fn();
    await render(<Disabled onPress={onPress} />);

    await user.press(screen.getByRole('button', { name: /Restaurar compra/ }));

    expect(onPress).not.toHaveBeenCalled();
  });
});
