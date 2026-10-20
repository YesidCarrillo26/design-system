import { composeStories } from '@storybook/react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { fn } from 'storybook/test';
import * as stories from './Checkbox.stories';

const { Unchecked, Disabled, Indeterminate, HiddenLabel } = composeStories(stories);

jest.useFakeTimers();

describe('Checkbox (native)', () => {
  test('alterna y notifica el nuevo estado', async () => {
    const user = userEvent.setup();
    const onCheckedChange = fn();
    await render(<Unchecked onCheckedChange={onCheckedChange} />);
    const box = screen.getByRole('checkbox', { name: 'Acepto los términos' });

    expect(box).not.toBeChecked();
    await user.press(box);

    expect(box).toBeChecked();
    expect(onCheckedChange).toHaveBeenLastCalledWith(true);
  });

  test('deshabilitado no cambia', async () => {
    const user = userEvent.setup();
    const onCheckedChange = fn();
    await render(<Disabled onCheckedChange={onCheckedChange} />);

    await user.press(screen.getByRole('checkbox'));

    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  test('indeterminate se anuncia como mixto y al presionar pasa a marcado', async () => {
    const user = userEvent.setup();
    const onCheckedChange = fn();
    await render(<Indeterminate onCheckedChange={onCheckedChange} />);

    expect(screen.getByRole('checkbox', { name: 'Seleccionar todas' })).toBePartiallyChecked();
    await user.press(screen.getByRole('checkbox', { name: 'Seleccionar todas' }));

    expect(onCheckedChange).toHaveBeenLastCalledWith(true);
  });

  test('hideLabel conserva el nombre accesible sin mostrar el texto', async () => {
    await render(<HiddenLabel />);

    expect(screen.getByRole('checkbox', { name: 'Seleccionar fila 1' })).toBeOnTheScreen();
    expect(screen.queryByText('Seleccionar fila 1')).not.toBeOnTheScreen();
  });
});
