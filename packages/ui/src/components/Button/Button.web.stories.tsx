import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { Button } from './Button';

// Stories SOLO WEB: comportamiento del DOM (clic, teclado, foco) con play functions.
// Comparte título con Button.stories.tsx para que aparezcan bajo el mismo componente, y se
// excluye de autodocs para no duplicar la página de documentación.
// OJO: el `titlePrefix` del specifier ('Components') también se antepone a los títulos
// explícitos, así que aquí va solo 'Button' (si no, saldría 'Components/Components/Button').
const meta = {
  title: 'Button',
  component: Button,
  tags: ['!autodocs', 'web-only'],
  args: {
    children: 'Button',
    onPress: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CallsOnPressWhenClicked: Story = {
  play: async ({ canvas, args, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Button' }));
    await expect(args.onPress).toHaveBeenCalledTimes(1);
  },
};

export const ActivatesWithKeyboard: Story = {
  play: async ({ canvas, args, userEvent }) => {
    const button = canvas.getByRole('button', { name: 'Button' });

    await userEvent.tab();
    await expect(button).toHaveFocus();

    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');
    await expect(args.onPress).toHaveBeenCalledTimes(2);
  },
};

export const IgnoresPressWhenDisabled: Story = {
  args: { disabled: true },
  play: async ({ canvas, args }) => {
    const button = canvas.getByRole('button', { name: 'Button' });

    await expect(button).toBeDisabled();
    // `click()` del DOM no despacha eventos en un botón deshabilitado.
    button.click();
    await expect(args.onPress).not.toHaveBeenCalled();
  },
};

/** Estados forzados con storybook-addon-pseudo-states, para capturarlos en Chromatic sin interacción. */
export const Hovered: Story = {
  parameters: { pseudo: { hover: true } },
};

export const FocusVisible: Story = {
  parameters: { pseudo: { focusVisible: true } },
};

export const IgnoresPressWhileLoading: Story = {
  args: { loading: true },
  play: async ({ canvas, args, userEvent }) => {
    const button = canvas.getByRole('button', { name: /Button/ });

    await expect(button).toHaveAttribute('aria-busy', 'true');
    await expect(button).toHaveAttribute('aria-disabled', 'true');
    // Sigue enfocable: se bloquea la acción, no el foco.
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await userEvent.click(button);
    await userEvent.keyboard('{Enter}');
    await expect(args.onPress).not.toHaveBeenCalled();
  },
};
