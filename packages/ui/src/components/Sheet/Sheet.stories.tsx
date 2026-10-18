import type { Meta, StoryObj } from '@storybook/react';
import { SheetExample } from './Sheet.example';

const meta = {
  component: SheetExample,
  args: { title: 'Filtros', description: 'Ajusta lo que quieres ver.' },
  parameters: { layout: 'centered', platforms: { web: 'dialog anclado abajo', native: 'Modal inferior' } },
} satisfies Meta<typeof SheetExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
