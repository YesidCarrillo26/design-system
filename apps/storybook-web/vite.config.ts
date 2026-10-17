import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Lo usan Storybook y Vitest. `.web.*` va primero para que `import './Button'` en una story
// compartida resuelva a Button.web.tsx. Se evita un Button.tsx sin sufijo junto a ellos.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.web.js', '.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
  },
});
