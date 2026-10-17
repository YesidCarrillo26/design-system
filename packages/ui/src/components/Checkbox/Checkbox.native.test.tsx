import { composeStories } from '@storybook/react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { fn } from 'storybook/test';
import * as stories from './Checkbox.stories';

const { Unchecked, Disabled } = composeStories(stories);

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
});
