---
'@chroma-yesid/ui': minor
---

Los overlays tienen animación de entrada y salida, con las duraciones y curvas de los tokens y respetando "Reducir movimiento".

- **Web:** `Dialog`, `Sheet`, `Popover`, `Menu` y `Tooltip` se funden (con escala leve, o subiendo desde abajo en `Sheet`); el velo se funde aparte. El `Toast` entra con una transición corta.
- **Native:** `Dialog`, `Popover`, `Menu`, `Select` y `Sheet` dejan de usar el `animationType` del `Modal` de React Native: el velo y el panel se animan por separado con `Animated` (sin Reanimated) y el contenido espera a que termine la salida antes de desmontarse. El velo ya no sube junto con la hoja.
