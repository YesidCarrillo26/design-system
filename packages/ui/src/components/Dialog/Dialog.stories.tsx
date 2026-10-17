import type { Meta, StoryObj } from '@storybook/react';
import { DialogExample } from './DialogExample';

const meta = {
  component: DialogExample,
  args: { title: 'Eliminar proyecto', description: 'Esta acción no se puede deshacer.' },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof DialogExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithoutDescription: Story = { args: { description: undefined } };
