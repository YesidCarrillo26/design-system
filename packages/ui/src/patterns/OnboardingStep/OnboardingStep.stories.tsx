import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { SelectableCardGroup } from '../../components/SelectableCardGroup';
import { TextField } from '../../components/TextField';
import { OnboardingStep } from './OnboardingStep';

const goals = [
  { value: 'productivity', title: 'Ser más productivo' },
  { value: 'habits', title: 'Crear mejores hábitos' },
  { value: 'learn', title: 'Aprender algo nuevo' },
  { value: 'money', title: 'Ahorrar dinero' },
];

// Referencias de diseño (Mobbin): onboarding de Nibble, pliability, Deepstash y Superpower.
const meta = {
  component: OnboardingStep,
  args: {
    step: 2,
    total: 5,
    title: '¿Qué quieres lograr primero?',
    description: 'Elige hasta 2 para recomendarte lo mejor.',
    primaryAction: { label: 'Continuar', onPress: fn() },
    secondaryAction: { label: 'Omitir por ahora', onPress: fn() },
  },
  parameters: {
    layout: 'fullscreen',
    controls: { exclude: ['children'] },
    docs: { description: { component: 'Referencias en Mobbin: onboarding de Nibble, pliability, Deepstash y Superpower.' } },
  },
} satisfies Meta<typeof OnboardingStep>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithOptions: Story = {
  render: (args) => (
    <OnboardingStep {...args}>
      <SelectableCardGroup label="Objetivos" selectionMode="multiple" maxSelected={2} options={goals} defaultValue={['habits']} />
    </OnboardingStep>
  ),
};

export const WithField: Story = {
  args: { step: 1, title: '¿Cómo te llamas?', description: undefined, secondaryAction: undefined },
  render: (args) => (
    <OnboardingStep {...args}>
      <TextField label="Nombre" placeholder="Tu nombre" />
    </OnboardingStep>
  ),
};

export const ContinueDisabled: Story = {
  args: { primaryAction: { label: 'Continuar', onPress: fn(), disabled: true } },
  render: (args) => (
    <OnboardingStep {...args}>
      <SelectableCardGroup label="Objetivos" options={goals} />
    </OnboardingStep>
  ),
};

export const LastStepLoading: Story = {
  args: { step: 5, primaryAction: { label: 'Terminar', onPress: fn(), loading: true }, secondaryAction: undefined },
  render: (args) => (
    <OnboardingStep {...args}>
      <SelectableCardGroup label="Objetivos" options={goals} defaultValue={['money']} />
    </OnboardingStep>
  ),
};
