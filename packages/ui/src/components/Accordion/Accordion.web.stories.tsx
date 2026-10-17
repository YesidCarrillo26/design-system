import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Accordion } from './Accordion';
import { accordionItems } from './accordion.fixtures';

const meta = {
  title: 'Accordion',
  component: Accordion,
  tags: ['!autodocs', 'web-only'],
  args: { items: accordionItems },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExpandsWithKeyboard: Story = {
  play: async ({ canvas, userEvent }) => {
    const header = canvas.getByRole('button', { name: '¿Cómo es el envío?' });
    await expect(header).toHaveAttribute('aria-expanded', 'false');
    await userEvent.tab();
    await userEvent.keyboard('{Enter}');
    await expect(header).toHaveAttribute('aria-expanded', 'true');
  },
};

export const OnlyOneOpenWhenNotMultiple: Story = {
  play: async ({ canvas, userEvent }) => {
    const first = canvas.getByRole('button', { name: '¿Cómo es el envío?' });
    const second = canvas.getByRole('button', { name: '¿Puedo hacer cambios?' });
    await userEvent.click(first);
    await userEvent.click(second);
    await expect(first).toHaveAttribute('aria-expanded', 'false');
    await expect(second).toHaveAttribute('aria-expanded', 'true');
  },
};
