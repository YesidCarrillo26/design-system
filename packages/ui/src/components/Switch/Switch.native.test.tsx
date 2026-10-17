import { composeStories } from '@storybook/react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { fn } from 'storybook/test';
import * as stories from './Switch.stories';

const { Off } = composeStories(stories);

jest.useFakeTimers();

describe('Switch (native)', () => {
  test('cambia de estado y lo anuncia', async () => {
    const user = userEvent.setup();
    const onCheckedChange = fn();
    await render(<Off onCheckedChange={onCheckedChange} />);
    const control = screen.getByRole('switch', { name: 'Notificaciones' });

    expect(control).not.toBeChecked();
    await user.press(control);

    expect(control).toBeChecked();
    expect(onCheckedChange).toHaveBeenLastCalledWith(true);
  });
});
