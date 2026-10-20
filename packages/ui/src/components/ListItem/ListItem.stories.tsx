import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { IconButton } from '../IconButton';
import { Switch } from '../Switch';
import { ListItem } from './ListItem';

const meta = {
  component: ListItem,
  args: { title: 'Ada Lovelace', description: 'Matemática' },
  parameters: { controls: { exclude: ['leading', 'trailing'] }, docs: { description: { component: 'Referencias en Mobbin: filas de ajustes de Meetup, Gentler Streak, Character AI y Google TV.' } } },
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
export const WithBadge: Story = { args: { trailing: <Badge tone="neutral">Admin</Badge> } };

/** Con `onPress` toda la fila es un botón. El valor y el chevron indican que lleva a otra pantalla. */
export const Pressable: Story = { args: { title: 'Modo oscuro', description: undefined, value: 'Automático', showChevron: true, onPress: fn() } };
export const Destructive: Story = { args: { title: 'Cerrar sesión', description: undefined, destructive: true, onPress: fn() } };
export const Disabled: Story = { args: { title: 'Restaurar compra', description: undefined, onPress: fn(), disabled: true } };
export const WithSwitch: Story = {
  args: { title: 'Notificaciones push', description: undefined, trailing: <Switch label="Notificaciones push" hideLabel defaultChecked onCheckedChange={fn()} /> },
};
