import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';
import { accordionItems } from './accordion.fixtures';

const meta = {
  component: Accordion,
  args: {
    items: accordionItems,
  },
  parameters: { layout: 'padded', controls: { exclude: ['items'] } },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const OpenByDefault: Story = { args: { defaultValue: ['envio'] } };
export const Multiple: Story = { args: { multiple: true, defaultValue: ['envio', 'pagos'] } };
