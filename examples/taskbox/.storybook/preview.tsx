import type { Preview } from '@storybook/react-vite';
import { mswLoader } from 'msw-storybook-addon/csf3';
import { type ReactNode, useState } from 'react';
import { Provider } from 'react-redux';
import { mocked, sb } from 'storybook/test';
import { now } from '../src/lib/clock';
import { makeStore } from '../src/store/store';
import type { TaskboxState } from '../src/store/taskboxSlice';
import './preview.css';

// Reemplaza el módulo del reloj por un mock automático en todas las stories.
sb.mock(import('../src/lib/clock.ts'));

/** Un store nuevo por story, con el estado inicial que pida `parameters.store.preloadedState`. */
function StoreProvider({ preloadedState, children }: { preloadedState?: { taskbox: TaskboxState }; children: ReactNode }) {
  const [store] = useState(() => makeStore(preloadedState));
  return <Provider store={store}>{children}</Provider>;
}

const preview: Preview = {
  tags: ['autodocs'],
  // MSW intercepta las peticiones (el worker se crea solo; lo que no tenga handler pasa a la red real).
  // Cada story declara sus handlers con `msw.use(...)` en su `beforeEach`; se limpian entre stories.
  loaders: [mswLoader()],
  // Fecha fija: las stories (y los snapshots visuales) no dependen del día en que se ejecutan.
  beforeEach: () => {
    mocked(now).mockReturnValue(new Date('2026-01-15T12:00:00Z'));
  },
  decorators: [
    (Story, { parameters }) => (
      <StoreProvider preloadedState={parameters.store?.preloadedState}>
        <Story />
      </StoreProvider>
    ),
  ],
  parameters: {
    a11y: { test: 'error' },
    layout: 'fullscreen',
  },
};

export default preview;
