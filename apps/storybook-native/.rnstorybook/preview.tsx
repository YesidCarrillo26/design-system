import type { Preview } from '@storybook/react-native';
import { View } from 'react-native';

const preview: Preview = {
  decorators: [
    // El tema (claro/oscuro) lo decide Uniwind según la apariencia del sistema.
    (Story) => (
      <View className="flex-1 items-center justify-center bg-background p-4">
        <Story />
      </View>
    ),
  ],
  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
  },
};

export default preview;
