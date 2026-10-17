'use client';

import { Button } from '@yesid/ui';
import { useTheme } from 'next-themes';

// Isla cliente: Button recibe un handler, así que vive en un Client Component.
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <div>
      <Button variant="outline" onPress={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
        Cambiar tema
      </Button>
    </div>
  );
}
