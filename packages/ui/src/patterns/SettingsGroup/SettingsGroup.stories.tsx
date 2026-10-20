import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Badge } from '../../components/Badge';
import { Icon } from '../../components/Icon';
import { ListItem } from '../../components/ListItem';
import { Stack } from '../../components/Stack';
import { Switch } from '../../components/Switch';
import { SettingsGroup } from './SettingsGroup';

// Referencias de diseño (Mobbin): pantallas de ajustes de Meetup, Gentler Streak, Meta AI y Google TV.
const meta = {
  component: SettingsGroup,
  args: { title: 'Preferencias' },
  parameters: {
    layout: 'padded',
    controls: { exclude: ['children'] },
    docs: { description: { component: 'Referencias en Mobbin: ajustes de Meetup, Gentler Streak, Meta AI y Google TV.' } },
  },
} satisfies Meta<typeof SettingsGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <SettingsGroup {...args}>
      <ListItem title="Notificaciones push" value="Activadas" showChevron onPress={fn()} leading={<Icon name="bell" tone="muted" />} />
      <ListItem title="Correo" value="Activado" showChevron onPress={fn()} leading={<Icon name="mail" tone="muted" />} />
      <ListItem title="Sincronizar calendario" trailing={<Switch label="Sincronizar calendario" hideLabel onCheckedChange={fn()} />} />
    </SettingsGroup>
  ),
};

export const WithFooter: Story = {
  args: { title: 'Apariencia', footer: 'El modo automático sigue el ajuste del sistema.' },
  render: (args) => (
    <SettingsGroup {...args}>
      <ListItem title="Modo oscuro" value="Automático" showChevron onPress={fn()} />
      <ListItem title="Ícono de la app" value="Clásico" showChevron onPress={fn()} />
    </SettingsGroup>
  ),
};

export const WithoutTitle: Story = {
  args: { title: undefined },
  render: (args) => (
    <SettingsGroup {...args}>
      <ListItem title="Ayuda" showChevron onPress={fn()} />
      <ListItem title="Enviar comentarios" showChevron onPress={fn()} />
    </SettingsGroup>
  ),
};

export const WithDestructiveRow: Story = {
  args: { title: 'Cuenta' },
  render: (args) => (
    <SettingsGroup {...args}>
      <ListItem title="Suscripción" trailing={<Badge tone="success" appearance="subtle">Pro</Badge>} showChevron onPress={fn()} />
      <ListItem title="Cerrar sesión" destructive onPress={fn()} />
    </SettingsGroup>
  ),
};

/** Varios grupos apilados, como una pantalla de ajustes. */
export const Screen: Story = {
  render: () => (
    <Stack gap="lg">
      <SettingsGroup title="Preferencias">
        <ListItem title="Notificaciones push" value="Activadas" showChevron onPress={fn()} />
        <ListItem title="Idioma" value="Español" showChevron onPress={fn()} />
      </SettingsGroup>
      <SettingsGroup title="Soporte" footer="Respondemos en menos de 24 horas.">
        <ListItem title="Centro de ayuda" showChevron onPress={fn()} />
        <ListItem title="Enviar comentarios" showChevron onPress={fn()} />
      </SettingsGroup>
    </Stack>
  ),
};
