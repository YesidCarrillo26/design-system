import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from '../IconButton';
import { Tooltip } from './Tooltip';

const meta = {
  component: Tooltip,
  args: { content: 'Agregar elemento', children: <IconButton icon="plus" label="Agregar" variant="outline" /> },
  parameters: { layout: 'centered', controls: { exclude: ['children'] }, platforms: { web: 'tooltip flotante', native: 'solo pista de accesibilidad' } },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
