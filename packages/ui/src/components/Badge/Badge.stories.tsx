import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { Badge } from './Badge';
import type { BadgeAppearance, BadgeTone } from './Badge.types';

const meta = {
  component: Badge,
  args: { children: 'Nuevo' },
  argTypes: {
    tone: { control: 'select' },
    appearance: { control: 'inline-radio' },
    variant: { control: 'select', table: { disable: true } },
    icon: { control: 'select', options: [undefined, 'circle-check', 'alert', 'info', 'circle-alert', 'star'] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Success: Story = { args: { tone: 'success', appearance: 'subtle', icon: 'circle-check', children: 'Activo' } };
export const Warning: Story = { args: { tone: 'warning', appearance: 'subtle', icon: 'alert', children: 'Pendiente' } };
export const Destructive: Story = { args: { tone: 'destructive', children: 'Error' } };
export const Outline: Story = { args: { tone: 'neutral', appearance: 'outline' } };

const tones: BadgeTone[] = ['neutral', 'primary', 'success', 'warning', 'info', 'destructive'];
const appearances: BadgeAppearance[] = ['solid', 'subtle', 'outline'];

/** Todas las combinaciones de `tone` × `appearance`. El texto de estado usa los tokens `*-subtle-foreground`, que cumplen contraste en ambos temas. */
export const Matrix: Story = {
  render: () => (
    <Stack gap="md">
      {appearances.map((appearance) => (
        <Stack key={appearance} gap="xs">
          <Text variant="overline" tone="muted">{appearance}</Text>
          <Stack direction="row" gap="sm" align="center">
            {tones.map((tone) => (
              <Badge key={tone} tone={tone} appearance={appearance}>{tone}</Badge>
            ))}
          </Stack>
        </Stack>
      ))}
    </Stack>
  ),
};

/** Con `icon`, el color del ícono coincide con el del texto. */
export const WithIcon: Story = {
  render: () => (
    <Stack direction="row" gap="sm" align="center">
      <Badge tone="success" appearance="subtle" icon="circle-check">Pagado</Badge>
      <Badge tone="warning" appearance="subtle" icon="alert">Revisar</Badge>
      <Badge tone="info" appearance="subtle" icon="info">Beta</Badge>
      <Badge tone="destructive" icon="circle-alert">Fallido</Badge>
    </Stack>
  ),
};

/** `variant` sigue funcionando pero está obsoleto: equivale a un `tone` + `appearance`. */
export const LegacyVariants: Story = {
  render: () => (
    <Stack direction="row" gap="sm" align="center">
      <Badge variant="default">default</Badge>
      <Badge variant="secondary">secondary</Badge>
      <Badge variant="destructive">destructive</Badge>
      <Badge variant="outline">outline</Badge>
    </Stack>
  ),
};
