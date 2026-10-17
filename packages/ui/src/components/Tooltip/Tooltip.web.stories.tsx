import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, screen } from 'storybook/test';
import { IconButton } from '../IconButton';
import { Tooltip } from './Tooltip';

const meta = {
  title: 'Tooltip',
  component: Tooltip,
  tags: ['!autodocs', 'web-only'],
  args: { content: 'Agregar elemento', children: <IconButton icon="plus" label="Agregar" variant="outline" /> },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AppearsOnKeyboardFocus: Story = {
  play: async ({ userEvent }) => {
    await userEvent.tab();
    await expect(await screen.findByText('Agregar elemento')).toBeInTheDocument();
  },
};
