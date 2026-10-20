import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '../Stack';
import { Heading } from './Heading';

const meta = {
  component: Heading,
  args: { children: 'Un título' },
  argTypes: { size: { control: 'inline-radio' }, level: { control: 'inline-radio', options: [1, 2, 3, 4] }, tone: { control: 'inline-radio' } },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Primary: Story = { args: { level: 1, tone: 'primary' } };

export const Levels: Story = {
  render: () => (
    <Stack gap="sm">
      <Heading level={1}>Nivel 1</Heading>
      <Heading level={2}>Nivel 2</Heading>
      <Heading level={3}>Nivel 3</Heading>
      <Heading level={4}>Nivel 4</Heading>
    </Stack>
  ),
};

/** El tamaño visual es independiente del nivel semántico: un h2 puede verse como `md`. */
export const Sizes: Story = {
  render: () => (
    <Stack gap="sm">
      <Heading level={1} size="display">Display</Heading>
      <Heading level={1} size="xl">Heading xl</Heading>
      <Heading level={2} size="lg">Heading lg</Heading>
      <Heading level={2} size="md">Heading md</Heading>
      <Heading level={3} size="sm">Heading sm</Heading>
    </Stack>
  ),
};
