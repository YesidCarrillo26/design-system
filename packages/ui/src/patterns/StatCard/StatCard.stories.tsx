import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '../../components/Stack';
import { StatCard } from './StatCard';

// Referencias de diseño (Mobbin): tarjetas de indicadores de Klaviyo, Later y Navattic.
const meta = {
  component: StatCard,
  args: { label: 'Suscriptores', value: '26', trend: { value: '+420 %', direction: 'up' }, comparison: 'vs. período anterior' },
  parameters: { layout: 'padded', docs: { description: { component: 'Referencias en Mobbin: tarjetas de indicadores de Klaviyo, Later y Navattic.' } } },
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Positive: Story = {};
export const Negative: Story = { args: { label: 'Tasa de interacción', value: '6,95 %', trend: { value: '-11 %', direction: 'down' } } };
export const Flat: Story = { args: { label: 'Exclusiones', value: '0', trend: { value: '0 %', direction: 'flat' } } };

/** Subir no siempre es bueno: más errores es una subida con sentido negativo (color rojo, flecha hacia arriba). */
export const UpIsBad: Story = { args: { label: 'Errores', value: '14', trend: { value: '+27 %', direction: 'up', sentiment: 'negative' } } };

export const WithIcon: Story = { args: { icon: 'user' } };
export const ValueOnly: Story = { args: { trend: undefined, comparison: undefined } };
export const Loading: Story = { args: { loading: true } };

export const Dashboard: Story = {
  render: () => (
    <Stack gap="md">
      <StatCard label="Publicaciones" value="15" icon="star" trend={{ value: '-25 %', direction: 'down' }} comparison="desde 20" />
      <StatCard label="Crecimiento de interacción" value="2.891" icon="user" trend={{ value: '+32 %', direction: 'up' }} comparison="desde 2.110" />
      <StatCard label="Errores" value="14" icon="alert" trend={{ value: '+27 %', direction: 'up', sentiment: 'negative' }} comparison="desde 11" />
    </Stack>
  ),
};
