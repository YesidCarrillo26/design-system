import { composeStories } from '@storybook/react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { fn } from 'storybook/test';
import * as stories from './SelectableCardGroup.stories';

const { Single, Multiple, MultipleWithLimit, Disabled } = composeStories(stories);

jest.useFakeTimers();

describe('SelectableCardGroup (native)', () => {
  test('single reemplaza la selección', async () => {
    const user = userEvent.setup();
    const onValueChange = fn();
    await render(<Single onValueChange={onValueChange} />);

    await user.press(screen.getByRole('radio', { name: 'Ahorrar dinero' }));
    await user.press(screen.getByRole('radio', { name: 'Crear mejores hábitos' }));

    expect(onValueChange).toHaveBeenLastCalledWith(['habits']);
    expect(screen.getByRole('radio', { name: 'Ahorrar dinero' })).not.toBeChecked();
  });

  test('multiple suma y quita, en el orden de las opciones', async () => {
    const user = userEvent.setup();
    const onValueChange = fn();
    await render(<Multiple defaultValue={[]} onValueChange={onValueChange} />);

    await user.press(screen.getByRole('checkbox', { name: 'Ahorrar dinero' }));
    await user.press(screen.getByRole('checkbox', { name: 'Ser más productivo' }));
    expect(onValueChange).toHaveBeenLastCalledWith(['productivity', 'money']);

    await user.press(screen.getByRole('checkbox', { name: 'Ahorrar dinero' }));
    expect(onValueChange).toHaveBeenLastCalledWith(['productivity']);
  });

  test('al llegar al límite no se pueden elegir más', async () => {
    const user = userEvent.setup();
    const onValueChange = fn();
    await render(<MultipleWithLimit onValueChange={onValueChange} />);

    await user.press(screen.getByRole('checkbox', { name: 'Aprender algo nuevo' }));

    expect(onValueChange).not.toHaveBeenCalled();
  });

  test('deshabilitado no responde', async () => {
    const user = userEvent.setup();
    const onValueChange = fn();
    await render(<Disabled onValueChange={onValueChange} />);

    await user.press(screen.getByRole('radio', { name: 'Ahorrar dinero' }));

    expect(onValueChange).not.toHaveBeenCalled();
  });
});
