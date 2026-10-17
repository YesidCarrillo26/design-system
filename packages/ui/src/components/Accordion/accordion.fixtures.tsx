import { Text } from '../Text';
import type { AccordionItem } from './Accordion.types';

export const accordionItems: AccordionItem[] = [
  { value: 'envio', title: '¿Cómo es el envío?', content: <Text tone="muted">Entre 3 y 5 días hábiles.</Text> },
  { value: 'cambios', title: '¿Puedo hacer cambios?', content: <Text tone="muted">Sí, durante 30 días.</Text> },
  { value: 'pagos', title: '¿Qué pagos aceptan?', content: <Text tone="muted">Tarjeta y transferencia.</Text> },
];
