# Fase 6 — Overlays y feedback

## Qué se construyó

`Dialog`, `Sheet`, `Popover`, `Menu`, `Tooltip`, `Tabs`, `Accordion` y `Toast`, web y native. En web usan **Base UI** (`@base-ui/react`, sin estilos); en native, implementaciones propias con `Modal` y `Pressable`. Resultado: 113 stories × 2 temas, 30 tests Jest.

## Decisiones

- **Base UI en web** para lo difícil de hacer bien: foco atrapado, Escape, posicionamiento flotante, navegación con flechas. Los estilos siguen siendo los nuestros (las partes de Base UI no traen CSS).
- **API por props, no compuesta.** Los contratos (`items`, `trigger`, `open`/`onOpenChange`) son iguales en las dos plataformas; Base UI queda como detalle interno de `*.web.tsx`.
- **`Sheet` native con `Modal`, no `@gorhom/bottom-sheet`.** El plan original lo proponía, pero exige `GestureHandlerRootView`, Reanimated y mocks en Jest. Un `Modal` cubre el caso básico y se puede sustituir cuando haga falta arrastrar.
- **Popover/Menu/Tooltip degradan en native** (panel centrado, hoja de acciones, `accessibilityHint`). Está tabulado en *Guidelines/Platform differences*.

## Conceptos de Storybook

- **Overlays en portales:** el contenido sale del canvas; en las play functions se consulta con `screen` (de `storybook/test`), no con `canvas`.
- **Stories con estado externo:** componentes controlados (`Dialog`, `Sheet`) se muestran con un `XExample` que guarda el `useState`. Es más claro que `render` con hooks y se comparte entre la story compartida y la web-only.
- **`parameters.a11y.config.rules`:** permite desactivar una regla de axe de forma acotada (solo en una story) y con comentario.
- **Stories compartidas con args JSX:** el `Default.args` de una story no es el `args` del `meta`; para reutilizar datos entre archivos de stories se usan *fixtures* (`tabs.fixtures.tsx`).
- **`play` con teclado:** `userEvent.tab()`, `{ArrowRight}`, `{Escape}` verifican flechas, cierre y devolución del foco.

## Lecciones

- ⚠️ **axe marca los "focus guards" de Base UI** (`span aria-hidden` con `tabindex=0`) mientras el menú está abierto (`aria-hidden-focus`). Es parte de cómo atrapa el foco; se desactiva esa regla solo en la story del Menú, con la explicación en el código. Dialog y Popover no lo disparan porque su test termina con el overlay cerrado.
- ⚠️ **En native, `role="alert"` en una `View` no la hace consultable**: RNTL (y los lectores de pantalla) solo ven elementos *accesibles*. Poner `accessible` en el contenedor agruparía el botón de cerrar y lo ocultaría a VoiceOver, así que el rol va en el `Text` del mensaje.
- Los timers de `Toast` en Jest requieren `act(async () => jest.advanceTimersByTimeAsync(...))`; si no, hay avisos de actualización fuera de `act`.
- `titlePrefix` + archivos `*.web.stories.tsx` con `title: 'Dialog'` agrupan bajo `Components/Dialog` (como en las fases anteriores).
- `"use client"` sigue conservándose en `dist/web` para todos los overlays (verificado), así que el barril se importa desde Server Components.

## Pendiente

- Foco/teclado de los overlays native en dispositivo real (no hay simulador en el flujo).
- `Select` con búsqueda (`Combobox`) y `Popover` posicionado en native: decisión futura.
- Animaciones de entrada/salida (hoy no hay) y `prefers-reduced-motion` para ellas.
