import { Button, Stack, Text } from '@chroma-yesid/ui';
import { View } from 'react-native';

export function App() {
  return (
    <View className="flex-1 justify-center bg-background p-6">
      <Stack>
        <Text variant="title">@chroma-yesid/ui en Expo</Text>
        <Text tone="muted">Implementación native, publicada en dist/native.</Text>
        <Button onPress={() => {}}>Botón</Button>
      </Stack>
    </View>
  );
}
