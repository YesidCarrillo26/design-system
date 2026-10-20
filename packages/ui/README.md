# @chroma-yesid/ui

Componentes de un design system multiplataforma: **un mismo contrato de props** con implementación para web (React DOM + Tailwind v4) y para mobile (React Native + Uniwind). Los estilos salen de los tokens de [`@chroma-yesid/tokens`](https://www.npmjs.com/package/@chroma-yesid/tokens).

El bundler elige la implementación sola: `react-native` resuelve a la versión native y el resto a la web.

## Instalación

```sh
npm i @chroma-yesid/ui
```

Requiere `react` `>=19 <20`. En mobile también `react-native` `>=0.88 <1` y `react-native-svg` `>=15 <16` (ambos opcionales: la versión web no los necesita).

## Web (Tailwind v4)

```css
/* index.css */
@import 'tailwindcss';
@import '@chroma-yesid/ui/web.css';
```

```tsx
import { Button, Heading, Stack } from '@chroma-yesid/ui';

export function App() {
  return (
    <Stack gap="md">
      <Heading level={1}>Hola</Heading>
      <Button onPress={() => console.log('clic')}>Continuar</Button>
    </Stack>
  );
}
```

`web.css` importa los tokens y le indica a Tailwind que escanee las clases del paquete.

## React Native (Uniwind)

```css
/* global.css */
@import 'tailwindcss';
@import 'uniwind';
@import '@chroma-yesid/tokens/native.css';
@import '@chroma-yesid/ui/native.css';
```

Los tokens se importan en tu propio CSS porque Uniwind no descubre los temas a través de imports anidados. El código de los componentes es el mismo que en web.

## Componentes

- **Base:** Avatar, Badge, Box, Button, Card, Chip, Divider, Heading, Icon, IconButton, Kbd, Link, ListItem, Skeleton, Spinner, Stack, Text
- **Formularios:** Checkbox, Combobox, Field, OtpInput, RadioGroup, SegmentedControl, SelectableCardGroup, Select, Switch, TextArea, TextField
- **Datos y estado:** Alert, Pagination, Progress, Table (con orden y selección de filas), Toast
- **Superposiciones y navegación:** Accordion, CommandPalette, Dialog, Menu, Popover, Sheet, Tabs, Tooltip
- **Patrones:** EmptyState, OnboardingStep, PageHeader, SettingsGroup, StatCard

Las props de cada componente, sus variantes y ejemplos están en el Storybook del repositorio. Los eventos se llaman igual en ambas plataformas (`onPress`; en web se conecta a `onClick`).

## Personalización

Todos aceptan `className`, que se fusiona con las clases del componente (gana la última). Usa clases semánticas de los tokens (`bg-primary`, `text-foreground`) en vez de la paleta por defecto de Tailwind, que no está incluida.

## Más información

- Código, Storybook y decisiones de diseño: [github.com/YesidCarrillo26/design-system](https://github.com/YesidCarrillo26/design-system)
- Licencia: MIT
