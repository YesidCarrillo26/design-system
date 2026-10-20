# 0006 — Movimiento de overlays sin Reanimated

- **Estado:** aceptada
- **Fecha:** 2026-10-20

## Contexto

Los overlays aparecían y desaparecían sin transición en web, y en native usaban el `animationType` del
`Modal` de React Native. Ese `slide` arrastra el velo oscuro junto con el panel y `fade` funde todo como un
bloque, y además ninguna de las dos usa las duraciones ni las curvas de los tokens. Faltaba también
animar la salida: el contenido debe seguir montado hasta que termine.

## Decisión

**Web.** Solo clases (`lib/overlayMotion.web.ts`) sobre `data-starting-style` y `data-ending-style`, que
Base UI pone al montar y al cerrar (y espera a que acabe la transición antes de desmontar). Las
duraciones y las curvas son las de los tokens, y el bloque global de `prefers-reduced-motion` las lleva a 1ms.

**Native.** `Modal` pasa a tener el velo y el contenido como capas separadas, animadas con `Animated` de
React Native (`useNativeDriver` salvo en react-native-web): el velo se funde y el contenido se escala
(centrado) o sube desde abajo. Un hook mantiene `mounted` hasta que termina la salida. Con
"Reducir movimiento" la duración es 0. Las duraciones y curvas salen de `duration` y `easing`, que
el build de tokens exporta (las curvas como `[x1, y1, x2, y2]` para `Easing.bezier`).

**No se usa Reanimated.** Ya está en la app de Storybook, pero hacerlo peer de `@chroma-yesid/ui` obligaría a
cada consumidor a añadir el plugin de Babel, worklets y mocks de Jest solo para animaciones de opacidad y
transform de una sola vez, que el driver nativo de `Animated` ya resuelve. Se reevalúa si llega el `Sheet`
con arrastre (`@gorhom/bottom-sheet`).

## Consecuencias

- Los tests native de overlays esperan la salida (`waitFor`). El test de `Modal` sustituye `Animated.timing`
  porque Jest completa las animaciones al instante y no permitiría comprobar que el contenido espera.
- `Animated.View` no admite `className` en Uniwind: el estilo animado va en `style` y el estilo por clases
  en una `View` interior.
- El panel de `Dialog`, `Popover` y `Sheet` sigue siendo un `Pressable` (accesible por defecto) para no
  cambiar cómo lo ven los lectores de pantalla.
- El `Toast` no tiene salida animada: se desmonta al cerrarse.
