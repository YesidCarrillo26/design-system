---
'@chroma-yesid/ui': minor
---

Patrones de producto y `ListItem` como componente.

- **`ListItem`** pasa de patrón a componente (la importación desde `@chroma-yesid/ui` no cambia) para poder ser pulsable: `onPress` (toda la fila es un botón), `value`, `showChevron`, `destructive` y `disabled`. Sin `onPress` se comporta como antes.
- **`SelectableCardGroup`:** tarjetas grandes elegibles, `single` (radios) o `multiple` (casillas) con `maxSelected`; `value` es siempre una lista, en el orden de `options`.
- **`SettingsGroup`** (patrón): título, tarjeta con filas separadas y nota al pie; los `ListItem` de dentro omiten su borde.
- **`OnboardingStep`** (patrón): progreso, título, contenido y acciones principal y secundaria.
- **`StatCard`** (patrón): indicador con cifra, variación (signo visible, `sentiment` independiente de la dirección), comparación y estado de carga.
