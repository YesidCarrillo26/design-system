import { Button, Stack, Text } from '@yesid/ui';
import { createRoot } from 'react-dom/client';
import './index.css';

function toggleTheme() {
  const root = document.documentElement;
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
}

createRoot(document.getElementById('root')!).render(
  <main className="p-6">
    <Stack>
      <Text variant="title">@yesid/ui en Vite</Text>
      <Text tone="muted">La misma librería, sin Next.js.</Text>
      <div><Button onPress={toggleTheme}>Cambiar tema</Button></div>
    </Stack>
  </main>,
);
