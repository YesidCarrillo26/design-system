import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { OtpInput } from './OtpInput';

const meta = {
  component: OtpInput,
  args: { label: 'Código de verificación', description: 'Te enviamos un código de 6 dígitos por SMS.', onValueChange: fn(), onComplete: fn() },
  argTypes: { inputMode: { control: 'inline-radio' } },
  parameters: { layout: 'padded', docs: { description: { component: 'Referencias en Mobbin: pantallas de código de Strava, Oportun, Urban Company y eBay.' } } },
} satisfies Meta<typeof OtpInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const FourDigits: Story = { args: { length: 4, description: undefined } };
export const Prefilled: Story = { args: { defaultValue: '123' } };
export const WithError: Story = { args: { defaultValue: '123456', error: 'El código no es correcto.' } };
export const Masked: Story = { args: { defaultValue: '1234', mask: true } };
export const Alphanumeric: Story = { args: { inputMode: 'alphanumeric', label: 'Código de recuperación', description: undefined } };
export const Disabled: Story = { args: { disabled: true, defaultValue: '12' } };
