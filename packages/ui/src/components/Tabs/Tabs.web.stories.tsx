import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Tabs } from './Tabs';
import { tabItems } from './tabs.fixtures';

const meta = {
  title: 'Tabs',
  component: Tabs,
  tags: ['!autodocs', 'web-only'],
  args: { items: tabItems },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ArrowKeysMoveBetweenTabs: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    await expect(canvas.getByRole('tab', { name: 'Resumen' })).toHaveAttribute('aria-selected', 'true');
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByRole('tab', { name: 'Actividad' })).toHaveFocus();
    await expect(canvas.getByRole('tabpanel')).toBeInTheDocument();
  },
};

export const ClickShowsItsPanel: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('tab', { name: 'Ajustes' }));
    await expect(canvas.getByText('Ajustes del proyecto.')).toBeVisible();
  },
};
