import { composeStories } from '@storybook/react';
import { render, screen, userEvent } from '@testing-library/react-native';
import * as stories from './Accordion.stories';

const { Default, Multiple } = composeStories(stories);
jest.useFakeTimers();

describe('Accordion (native)', () => {
  test('expande una sección y cierra la anterior', async () => {
    const user = userEvent.setup();
    await render(<Default />);
    const first = screen.getByRole('button', { name: '¿Cómo es el envío?' });
    const second = screen.getByRole('button', { name: '¿Puedo hacer cambios?' });

    await user.press(first);
    expect(first).toBeExpanded();
    expect(screen.getByText('Entre 3 y 5 días hábiles.')).toBeOnTheScreen();

    await user.press(second);
    expect(first).toBeCollapsed();
    expect(second).toBeExpanded();
  });

  test('con multiple deja varias abiertas', async () => {
    await render(<Multiple />);

    expect(screen.getByRole('button', { name: '¿Cómo es el envío?' })).toBeExpanded();
    expect(screen.getByRole('button', { name: '¿Qué pagos aceptan?' })).toBeExpanded();
  });
});
