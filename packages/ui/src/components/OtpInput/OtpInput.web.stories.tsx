import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { OtpInput } from './OtpInput';

const meta = {
  title: 'OtpInput',
  component: OtpInput,
  tags: ['!autodocs', 'web-only'],
  args: { label: 'Código de verificación', onValueChange: fn(), onComplete: fn() },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof OtpInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TypesAcrossSlotsAndCompletes: Story = {
  play: async ({ canvas, args, userEvent }) => {
    await userEvent.click(canvas.getByRole('textbox', { name: 'Código de verificación' }));
    await userEvent.keyboard('123456');
    await expect(args.onValueChange).toHaveBeenLastCalledWith('123456');
    await expect(args.onComplete).toHaveBeenCalledWith('123456');
  },
};

export const PastesAWholeCode: Story = {
  play: async ({ canvas, args, userEvent }) => {
    await userEvent.click(canvas.getByRole('textbox', { name: 'Código de verificación' }));
    await userEvent.paste('987654');
    await expect(args.onComplete).toHaveBeenCalledWith('987654');
  },
};

export const RejectsLettersWhenNumeric: Story = {
  play: async ({ canvas, args, userEvent }) => {
    await userEvent.click(canvas.getByRole('textbox', { name: 'Código de verificación' }));
    await userEvent.keyboard('ab12');
    await expect(args.onValueChange).toHaveBeenLastCalledWith('12');
  },
};

export const EverySlotHasAnAccessibleName: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('Carácter 2 de 6')).toBeInTheDocument();
    await expect(canvas.getByLabelText('Carácter 6 de 6')).toBeInTheDocument();
  },
};

export const UppercasesAlphanumericCodes: Story = {
  args: { inputMode: 'alphanumeric' },
  play: async ({ canvas, args, userEvent }) => {
    await userEvent.click(canvas.getByRole('textbox', { name: 'Código de verificación' }));
    await userEvent.keyboard('ab1');
    await expect(args.onValueChange).toHaveBeenLastCalledWith('AB1');
  },
};
