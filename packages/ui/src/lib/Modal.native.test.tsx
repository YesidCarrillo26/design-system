import { act, render, screen } from '@testing-library/react-native';
import { AccessibilityInfo, Animated, Text } from 'react-native';
import { Modal } from './Modal.native';

function mockReduceMotion(enabled: boolean) {
  jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(enabled);
  jest.spyOn(AccessibilityInfo, 'addEventListener').mockReturnValue({ remove: jest.fn() });
}

type Finish = (result: { finished: boolean }) => void;

/**
 * Sustituye `Animated.timing` para controlar cuándo termina cada animación: Jest las completa al
 * instante y así no se podría comprobar que el contenido espera a la salida.
 */
function captureAnimations() {
  const runs: { duration: number; toValue: number; finish: Finish }[] = [];
  jest.spyOn(Animated, 'timing').mockImplementation((_value, config) => ({
    start: (callback?: Finish) => {
      runs.push({ duration: config.duration ?? 0, toValue: config.toValue as number, finish: callback ?? (() => {}) });
    },
    stop: jest.fn(),
    reset: jest.fn(),
  }));
  return runs;
}

const ui = (visible: boolean) => (
  <Modal visible={visible} onRequestClose={() => {}}>
    <Text>hola</Text>
  </Modal>
);
const content = () => screen.queryByText('hola');

describe('Modal (native)', () => {
  afterEach(() => jest.restoreAllMocks());

  test('muestra el contenido al abrir y anima hacia 1 con la duración de los tokens', async () => {
    mockReduceMotion(false);
    const runs = captureAnimations();

    await render(ui(true));

    expect(content()).toBeOnTheScreen();
    expect(runs.at(-1)).toMatchObject({ toValue: 1, duration: 200 });
  });

  test('al cerrar mantiene el contenido hasta que termina la animación de salida', async () => {
    mockReduceMotion(false);
    const runs = captureAnimations();
    const view = await render(ui(true));

    await view.rerender(ui(false));
    const exit = runs.at(-1);
    expect(exit).toMatchObject({ toValue: 0, duration: 150 });
    expect(content()).toBeOnTheScreen();

    await act(async () => exit?.finish({ finished: true }));
    expect(content()).toBeNull();
  });

  test('si la salida se interrumpe (se reabre), el contenido no se desmonta', async () => {
    mockReduceMotion(false);
    const runs = captureAnimations();
    const view = await render(ui(true));
    await view.rerender(ui(false));
    const exit = runs.at(-1);

    await view.rerender(ui(true));
    await act(async () => exit?.finish({ finished: false }));

    expect(content()).toBeOnTheScreen();
  });

  test('con "Reducir movimiento" las animaciones duran 0', async () => {
    mockReduceMotion(true);
    const runs = captureAnimations();

    const view = await render(ui(true));
    await view.rerender(ui(false));

    // La preferencia llega de forma asíncrona: las últimas animaciones ya la respetan.
    expect(runs.at(-1)).toMatchObject({ toValue: 0, duration: 0 });
  });
});
