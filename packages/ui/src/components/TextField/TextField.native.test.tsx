import { composeStories } from '@storybook/react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { fn } from 'storybook/test';
import * as stories from './TextField.stories';

const { Default, WithError } = composeStories(stories);

jest.useFakeTimers();

describe('TextField (native)', () => {
  test('notifica el texto escrito', async () => {
    const user = userEvent.setup();
    const onChangeText = fn();
    await render(<Default onChangeText={onChangeText} />);

    await user.type(screen.getByLabelText('Correo'), 'hola');

    expect(onChangeText).toHaveBeenLastCalledWith('hola');
  });

  test('muestra el error como alerta', async () => {
    await render(<WithError />);

    expect(screen.getByRole('alert')).toHaveTextContent('Ingresa un correo válido.');
  });
});
