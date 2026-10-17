import type { Preview } from '@storybook/react-native-web-vite';
import { useEffect } from 'react';
import { View } from 'react-native';
import { Uniwind } from 'uniwind';
import '../src/global.css';

const preview: Preview = {
  tags: ['autodocs'],
  globalTypes: {
    theme: {
      description: 'Tema (Uniwind)',
      toolbar: { icon: 'circlehollow', items: ['light', 'dark'], dynamicTitle: true },
    },
  },
  initialGlobals: { theme: 'light' },
  decorators: [
    (Story, { globals }) => {
      // Uniwind cambia de tema con setTheme (en native llama a Appearance.setColorScheme).
      useEffect(() => {
        Uniwind.setTheme(globals.theme === 'dark' ? 'dark' : 'light');
      }, [globals.theme]);
      return (
        <View className="flex-1 items-center justify-center bg-background p-4">
          <Story />
        </View>
      );
    },
  ],
  parameters: {
    // El DOM que genera react-native-web es aproximado: la a11y se mide en el Storybook web.
    a11y: { test: 'todo' },
    layout: 'fullscreen',
  },
};

export default preview;
