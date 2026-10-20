import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Button } from '../Button';
import { Stack } from '../Stack';
import { Alert } from './Alert';
import type { AlertTone } from './Alert.types';

// Referencias de diseño (Mobbin): Gusto, GoFundMe, Workable y Basecamp.
const meta = {
  component: Alert,
  args: { title: 'Revisa tu plan', children: 'Tu período de prueba termina en 3 días.' },
  argTypes: { tone: { control: 'select' }, layout: { control: 'inline-radio' }, icon: { control: 'select', options: [undefined, null, 'star', 'bell'] } },
  parameters: { layout: 'padded', docs: { description: { component: 'Referencias en Mobbin: Gusto, GoFundMe, Workable, Basecamp.' } } },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {};
export const Success: Story = { args: { tone: 'success', title: 'Cambios guardados', children: 'Se actualizó tu perfil.' } };
export const Warning: Story = { args: { tone: 'warning', title: 'Te quedan 3 días', children: 'Pasa a un plan de pago para no perder tus datos.' } };
export const Destructive: Story = { args: { tone: 'destructive', title: 'No se pudo enviar', children: 'Revisa tu conexión e inténtalo de nuevo.' } };
export const Neutral: Story = { args: { tone: 'neutral', title: 'Nota', children: 'Solo tú puedes ver esto.' } };
export const TitleOnly: Story = { args: { children: undefined, tone: 'success', title: 'Pago recibido' } };

export const Dismissible: Story = { args: { onDismiss: fn() } };

export const WithAction: Story = {
  args: { tone: 'warning', action: <Button size="sm" variant="outline" onPress={() => {}}>Actualizar</Button> },
};

/** A todo el ancho, para el borde superior de una página o un formulario. */
export const Banner: Story = { args: { layout: 'banner', tone: 'info' } };

const tones: AlertTone[] = ['neutral', 'info', 'success', 'warning', 'destructive'];

export const Tones: Story = {
  render: (args) => (
    <Stack gap="sm">
      {tones.map((tone) => (
        <Alert key={tone} {...args} tone={tone} title={tone} />
      ))}
    </Stack>
  ),
};
