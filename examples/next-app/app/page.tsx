import { Stack, Text } from '@yesid/ui';
import { ThemeToggle } from './theme-toggle';

// Server Component: Stack y Text no usan hooks, así que se renderizan en el servidor.
export default function Page() {
  return (
    <main className="p-6">
      <Stack gap="md">
        <Text variant="title">@yesid/ui en Next.js</Text>
        <Text tone="muted">Componentes web del design system, sin react-native en el bundle.</Text>
        <ThemeToggle />
      </Stack>
    </main>
  );
}
