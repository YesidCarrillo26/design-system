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

export const Disabled: Story = {
  args: { disabled: true },
};

/** Las tres variantes lado a lado, útil para comparar temas y plataformas. */
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
