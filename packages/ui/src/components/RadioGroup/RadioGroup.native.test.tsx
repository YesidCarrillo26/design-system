import { composeStories } from '@storybook/react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { fn } from 'storybook/test';
import * as stories from './RadioGroup.stories';

const { Default, OneOptionDisabled } = composeStories(stories);

jest.useFakeTimers();

describe('RadioGroup (native)', () => {
  test('elige otra opción y notifica', async () => {
    const user = userEvent.setup();
    const onValueChange = fn();
    await render(<Default onValueChange={onValueChange} />);

    expect(screen.getByRole('radio', { name: 'Gratis' })).toBeChecked();
    await user.press(screen.getByRole('radio', { name: 'Pro' }));

    expect(screen.getByRole('radio', { name: 'Pro' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Gratis' })).not.toBeChecked();
    expect(onValueChange).toHaveBeenLastCalledWith('pro');
  });

  test('una opción deshabilitada no se puede elegir', async () => {
    const user = userEvent.setup();
    const onValueChange = fn();
    await render(<OneOptionDisabled onValueChange={onValueChange} />);

    await user.press(screen.getByRole('radio', { name: 'Pro' }));

    expect(onValueChange).not.toHaveBeenCalled();
  });
});
