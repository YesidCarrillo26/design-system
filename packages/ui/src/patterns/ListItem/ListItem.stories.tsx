import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Avatar } from '../../components/Avatar';
import { Badge } from '../../components/Badge';
import { IconButton } from '../../components/IconButton';
import { ListItem } from './ListItem';

const meta = {
  component: ListItem,
  args: { title: 'Ada Lovelace', description: 'Matemática' },
  parameters: { controls: { exclude: ['leading', 'trailing'] } },
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithLeadingAndTrailing: Story = {
  args: {
    leading: <Avatar name="Ada Lovelace" />,
    trailing: <IconButton icon="chevron-right" label="Ver perfil" onPress={fn()} />,
  },
};
export const WithBadge: Story = { args: { trailing: <Badge variant="secondary">Admin</Badge> } };
