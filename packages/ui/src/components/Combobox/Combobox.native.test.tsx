import { composeStories } from '@storybook/react';
import { fireEvent, render, screen, userEvent } from '@testing-library/react-native';
import { fn } from 'storybook/test';
import * as stories from './Combobox.stories';

const { Default, OneOptionDisabled } = composeStories(stories);

jest.useFakeTimers();

describe('Combobox (native)', () => {
  test('abre la hoja, filtra sin acentos y elige', async () => {
    const user = userEvent.setup();
    const onValueChange = fn();
    await render(<Default onValueChange={onValueChange} />);

    await user.press(screen.getByRole('combobox', { name: 'Ciudad' }));
    await fireEvent.changeText(screen.getByLabelText('Buscar en Ciudad'), 'bogota');

    expect(screen.queryByRole('radio', { name: 'Medellín' })).not.toBeOnTheScreen();
    await user.press(screen.getByRole('radio', { name: 'Bogotá' }));

    expect(onValueChange).toHaveBeenLastCalledWith('bog');
    expect(screen.getByRole('combobox', { name: 'Ciudad' })).toHaveTextContent('Bogotá');
  });

  test('sin coincidencias muestra el mensaje', async () => {
    const user = userEvent.setup();
    await render(<Default emptyText="Sin coincidencias" />);

    await user.press(screen.getByRole('combobox', { name: 'Ciudad' }));
    await fireEvent.changeText(screen.getByLabelText('Buscar en Ciudad'), 'zzz');

    expect(screen.getByText('Sin coincidencias')).toBeOnTheScreen();
  });

  test('una opción deshabilitada no se puede elegir', async () => {
    const user = userEvent.setup();
    const onValueChange = fn();
    await render(<OneOptionDisabled onValueChange={onValueChange} />);

    await user.press(screen.getByRole('combobox', { name: 'Ciudad' }));
    await user.press(screen.getByRole('radio', { name: 'Cali' }));

    expect(onValueChange).not.toHaveBeenCalled();
  });
});
