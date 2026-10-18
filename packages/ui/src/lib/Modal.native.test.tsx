import { act, render, screen } from '@testing-library/react-native';
import { AccessibilityInfo, Text } from 'react-native';
import { Modal } from './Modal.native';

function mockReduceMotion(enabled: boolean) {
  jest.spyOn(AccessibilityInfo, 'isReduceMotionEnabled').mockResolvedValue(enabled);
  jest.spyOn(AccessibilityInfo, 'addEventListener').mockReturnValue({ remove: jest.fn() });
}

const animationOf = () => screen.root?.props.animationType;

describe('Modal (native, movimiento reducido)', () => {
  afterEach(() => jest.restoreAllMocks());

  test('conserva la animación pedida por defecto', async () => {
    mockReduceMotion(false);
    await act(async () => {
      render(<Modal visible animationType="slide"><Text>hola</Text></Modal>);
    });

    expect(animationOf()).toBe('slide');
  });

  test('la desactiva con "Reducir movimiento"', async () => {
    mockReduceMotion(true);
    await act(async () => {
      render(<Modal visible animationType="slide"><Text>hola</Text></Modal>);
    });

    expect(animationOf()).toBe('none');
  });
});
