import { Text } from '../Text';
import type { TabItem } from './Tabs.types';

export const tabItems: TabItem[] = [
  { value: 'resumen', label: 'Resumen', content: <Text>Resumen del proyecto.</Text> },
  { value: 'actividad', label: 'Actividad', content: <Text>Actividad reciente.</Text> },
  { value: 'ajustes', label: 'Ajustes', content: <Text>Ajustes del proyecto.</Text> },
];
