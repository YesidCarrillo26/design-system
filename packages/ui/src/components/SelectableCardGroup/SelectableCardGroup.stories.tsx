import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { SelectableCardGroup } from './SelectableCardGroup';

const options = [
  { value: 'productivity', title: 'Ser más productivo', description: 'Organiza tus tareas del día.', icon: 'check' as const },
  { value: 'habits', title: 'Crear mejores hábitos', icon: 'star' as const },
  { value: 'learn', title: 'Aprender algo nuevo', icon: 'info' as const },
  { value: 'money', title: 'Ahorrar dinero', icon: 'bell' as const },
];

const meta = {
  component: SelectableCardGroup,
  args: { label: '¿Cuáles son tus objetivos?', options, onValueChange: fn() },
  argTypes: { selectionMode: { control: 'inline-radio' } },
  parameters: { layout: 'padded', docs: { description: { component: 'Referencias en Mobbin: opciones de onboarding de Nibble, pliability, Deepstash y Lifesum.' } } },
} satisfies Meta<typeof SelectableCardGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {};
export const SingleWithValue: Story = { args: { defaultValue: ['habits'] } };
export const Multiple: Story = { args: { selectionMode: 'multiple', defaultValue: ['productivity', 'money'] } };
/** "Elige hasta 2": al llegar al límite, las demás se deshabilitan. */
export const MultipleWithLimit: Story = { args: { selectionMode: 'multiple', maxSelected: 2, defaultValue: ['productivity', 'money'] } };
export const OneOptionDisabled: Story = { args: { options: options.map((o) => (o.value === 'learn' ? { ...o, disabled: true } : o)) } };
export const Disabled: Story = { args: { disabled: true, defaultValue: ['habits'] } };
