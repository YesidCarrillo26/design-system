import type { Meta, StoryObj } from '@storybook/react';
import { ToastExample } from './ToastExample';

const meta = {
  component: ToastExample,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ToastExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
/** `duration: 0` deja el aviso hasta que se cierre (útil para revisarlo). */
export const Persistent: Story = { args: { duration: 0 } };
