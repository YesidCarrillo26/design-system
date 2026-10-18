import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Pagination } from './Pagination';

const meta = {
  component: Pagination,
  args: { pageCount: 10, onPageChange: fn() },
  argTypes: { siblingCount: { control: { type: 'number', min: 0, max: 3 } } },
  parameters: {
    layout: 'centered',
    platforms: { web: 'nav con aria-current="page"', native: 'role navigation; actual como seleccionada; botones md (44)' },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const FewPages: Story = { args: { pageCount: 4 } };
export const MiddlePage: Story = { args: { defaultPage: 5 } };
export const LastPage: Story = { args: { defaultPage: 10 } };
export const SinglePage: Story = { args: { pageCount: 1 } };
