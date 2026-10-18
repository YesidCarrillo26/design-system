import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { Pagination } from './Pagination';

// Stories SOLO WEB: teclado y DOM con play functions (ver Button.web.stories.tsx).
const meta = {
  title: 'Pagination',
  component: Pagination,
  tags: ['!autodocs', 'web-only'],
  args: { pageCount: 10, onPageChange: fn() },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NavigatesAndMarksCurrent: Story = {
  play: async ({ canvas, args, userEvent }) => {
    const nav = canvas.getByRole('navigation', { name: 'Paginación' });
    await expect(canvas.getByRole('button', { name: 'Página 1' })).toHaveAttribute('aria-current', 'page');
    await expect(canvas.getByRole('button', { name: 'Anterior' })).toBeDisabled();

    await userEvent.click(canvas.getByRole('button', { name: 'Siguiente' }));

    await expect(args.onPageChange).toHaveBeenLastCalledWith(2);
    await expect(canvas.getByRole('button', { name: 'Página 2' })).toHaveAttribute('aria-current', 'page');
    await expect(nav).toBeVisible();
  },
};

export const WorksWithKeyboard: Story = {
  play: async ({ canvas, args, userEvent }) => {
    canvas.getByRole('button', { name: 'Página 3' }).focus();
    await userEvent.keyboard('{Enter}');

    await expect(args.onPageChange).toHaveBeenLastCalledWith(3);
  },
};

export const LastPageDisablesNext: Story = {
  args: { defaultPage: 10 },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: 'Siguiente' })).toBeDisabled();
  },
};
