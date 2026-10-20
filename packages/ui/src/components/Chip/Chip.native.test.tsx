import { composeStories } from '@storybook/react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { fn } from 'storybook/test';
import * as stories from './Chip.stories';

const { Label, Filter, Removable } = composeStories(stories);

jest.useFakeTimers();

describe('Chip (native)', () => {
  test('alterna y notifica', async () => {
    const user = userEvent.setup();
    const onSelectedChange = fn();
    await render(<Filter onSelectedChange={onSelectedChange} />);

    await user.press(screen.getByRole('button', { name: 'Diseño' }));

    expect(onSelectedChange).toHaveBeenLastCalledWith(true);
    expect(screen.getByRole('button', { name: 'Diseño' })).toBeSelected();
  });

  test('sin estado de selección no es un botón', async () => {
    await render(<Label />);

    expect(screen.getByText('Diseño')).toBeOnTheScreen();
    expect(screen.queryByRole('button')).not.toBeOnTheScreen();
  });

  test('quitar invoca onRemove', async () => {
    const user = userEvent.setup();
    const onRemove = fn();
    await render(<Removable onRemove={onRemove} />);

    await user.press(screen.getByRole('button', { name: 'Quitar Diseño' }));

    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});
