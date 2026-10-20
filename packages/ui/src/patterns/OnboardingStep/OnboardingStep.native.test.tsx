import { composeStories } from '@storybook/react';
import { render, screen, userEvent } from '@testing-library/react-native';
import { fn } from 'storybook/test';
import * as stories from './OnboardingStep.stories';

const { WithOptions, ContinueDisabled } = composeStories(stories);

jest.useFakeTimers();

describe('OnboardingStep (native)', () => {
  test('muestra el título y el progreso con su valor', async () => {
    await render(<WithOptions />);

    expect(screen.getByRole('heading', { name: '¿Qué quieres lograr primero?' })).toBeOnTheScreen();
    const progress = screen.getByRole('progressbar', { name: 'Paso 2 de 5' });
    // ARIA: el valor es el paso (2) dentro de su rango (máximo 5), no un porcentaje.
    expect(progress).toHaveProp('aria-valuenow', 2);
    expect(progress).toHaveProp('aria-valuemax', 5);
  });

  test('las acciones se pueden operar', async () => {
    const user = userEvent.setup();
    const primary = fn();
    const secondary = fn();
    await render(<WithOptions primaryAction={{ label: 'Continuar', onPress: primary }} secondaryAction={{ label: 'Omitir por ahora', onPress: secondary }} />);

    await user.press(screen.getByRole('button', { name: 'Continuar' }));
    await user.press(screen.getByRole('button', { name: 'Omitir por ahora' }));

    expect(primary).toHaveBeenCalledTimes(1);
    expect(secondary).toHaveBeenCalledTimes(1);
  });

  test('con la acción principal deshabilitada no avanza', async () => {
    const user = userEvent.setup();
    const onPress = fn();
    await render(<ContinueDisabled primaryAction={{ label: 'Continuar', onPress, disabled: true }} />);

    await user.press(screen.getByRole('button', { name: 'Continuar' }));

    expect(onPress).not.toHaveBeenCalled();
  });

  test('el contenido del paso es operable', async () => {
    const user = userEvent.setup();
    await render(<WithOptions />);

    await user.press(screen.getByRole('checkbox', { name: 'Ahorrar dinero' }));

    expect(screen.getByRole('checkbox', { name: 'Ahorrar dinero' })).toBeChecked();
  });
});
