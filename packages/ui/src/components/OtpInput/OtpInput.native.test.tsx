import { composeStories } from '@storybook/react';
import { fireEvent, render, screen, userEvent } from '@testing-library/react-native';
import { fn } from 'storybook/test';
import * as stories from './OtpInput.stories';

const { Default, Prefilled, Alphanumeric, Masked } = composeStories(stories);

jest.useFakeTimers();

// Las casillas son decorativas y están ocultas a la accesibilidad (el campo real es el TextInput).
const hidden = { includeHiddenElements: true };
const input = () => screen.getByLabelText(/Código/);

describe('OtpInput (native)', () => {
  test('al escribir el código completo notifica una sola vez', async () => {
    const user = userEvent.setup();
    const onComplete = fn();
    await render(<Default onComplete={onComplete} />);

    await user.type(input(), '123456');

    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(onComplete).toHaveBeenCalledWith('123456');
  });

  test('un código pegado con separadores se limpia', async () => {
    const onComplete = fn();
    await render(<Default onComplete={onComplete} />);

    await fireEvent.changeText(input(), '12 34-56');

    expect(onComplete).toHaveBeenCalledWith('123456');
    expect(screen.getByText('6', hidden)).toBeOnTheScreen();
  });

  test('numérico rechaza letras', async () => {
    const onValueChange = fn();
    await render(<Default onValueChange={onValueChange} />);

    await fireEvent.changeText(input(), 'ab12');

    expect(onValueChange).toHaveBeenLastCalledWith('12');
  });

  test('alfanumérico admite letras en mayúsculas', async () => {
    const onValueChange = fn();
    await render(<Alphanumeric onValueChange={onValueChange} />);

    await fireEvent.changeText(screen.getByLabelText('Código de recuperación'), 'ab1');

    expect(onValueChange).toHaveBeenLastCalledWith('AB1');
  });

  test('muestra el valor inicial en las casillas', async () => {
    await render(<Prefilled />);

    expect(screen.getByText('1', hidden)).toBeOnTheScreen();
    expect(screen.getByText('3', hidden)).toBeOnTheScreen();
  });

  test('con máscara no muestra los caracteres', async () => {
    await render(<Masked />);

    expect(screen.queryByText('1', hidden)).not.toBeOnTheScreen();
    expect(screen.getAllByText('•', hidden)).toHaveLength(4);
  });
});
