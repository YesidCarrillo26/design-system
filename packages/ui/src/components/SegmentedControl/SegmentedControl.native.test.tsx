import { composeStories } from '@storybook/react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { fn } from 'storybook/test';
import * as stories from './SegmentedControl.stories';

const { Default, OneSegmentDisabled } = composeStories(stories);

jest.useFakeTimers();

describe('SegmentedControl (native)', () => {
  test('arranca en el primer segmento y cambia al presionar otro', async () => {
    const user = userEvent.setup();
    const onValueChange = fn();
    await render(<Default onValueChange={onValueChange} />);

    expect(screen.getByRole('radio', { name: 'Día' })).toBeChecked();
    await user.press(screen.getByRole('radio', { name: 'Semana' }));

    expect(screen.getByRole('radio', { name: 'Semana' })).toBeChecked();
    expect(onValueChange).toHaveBeenLastCalledWith('week');
  });

  test('un segmento deshabilitado no se puede elegir', async () => {
    const user = userEvent.setup();
    const onValueChange = fn();
    await render(<OneSegmentDisabled onValueChange={onValueChange} />);

    await user.press(screen.getByRole('radio', { name: 'Mes' }));

    expect(onValueChange).not.toHaveBeenCalled();
  });
});
