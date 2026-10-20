import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Stack } from '../Stack';
import { Button } from './Button';

// Stories COMPARTIDAS: las cargan el Storybook web y el native. Sin `title`: el título sale
// de la carpeta (`Components/Button`), así que coincide en las dos plataformas.
const meta = {
  component: Button,
  args: {
    children: 'Button',
    onPress: fn(),
  },
  argTypes: {
    variant: { control: 'select' },
    size: { control: 'inline-radio' },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: 'primary' },
};

export const Secondary: Story = {
  args: { variant: 'secondary' },
};

export const Outline: Story = {
  args: { variant: 'outline' },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const Ghost: Story = {
  args: { variant: 'ghost' },
};

export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Eliminar' },
};

/** `loading` muestra un spinner y bloquea la acción, pero el botón conserva el foco. */
export const Loading: Story = {
  args: { loading: true, children: 'Guardando' },
};

export const WithIcons: Story = {
  args: { leadingIcon: 'plus', children: 'Nuevo proyecto' },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
  parameters: { layout: 'padded' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

/** Las cinco variantes lado a lado, útil para comparar temas y plataformas. */
export const Variants: Story = {
  render: (args) => (
    <Stack direction="row" gap="md" align="center">
      <Button {...args} variant="primary">
        Primary
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="outline">
        Outline
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="destructive">
        Destructive
      </Button>
    </Stack>
  ),
};

/** Los tres tamaños. */
export const Sizes: Story = {
  render: (args) => (
    <Stack direction="row" gap="md" align="center">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </Stack>
  ),
};

/** Íconos delante y detrás del texto, y estado de carga, en todas las variantes. */
export const IconsAndLoading: Story = {
  render: (args) => (
    <Stack gap="md">
      {(['primary', 'secondary', 'outline', 'ghost', 'destructive'] as const).map((variant) => (
        <Stack key={variant} direction="row" gap="md" align="center">
          <Button {...args} variant={variant} leadingIcon="plus">Nuevo</Button>
          <Button {...args} variant={variant} trailingIcon="arrow-up-right">Abrir</Button>
          <Button {...args} variant={variant} loading>Guardando</Button>
        </Stack>
      ))}
    </Stack>
  ),
};
