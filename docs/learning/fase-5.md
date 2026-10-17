# Fase 5 — Formularios

## Qué se construyó

`Field`, `TextField`, `TextArea`, `Checkbox`, `RadioGroup`, `Switch` y `Select`, web y native, hechos a mano (sin librerías headless). Más `lib/useControllableState.ts`, un hook compartido para el patrón controlado/no controlado (`value` o `defaultValue`).

Pruebas: 86 stories × 2 temas en navegador (con a11y como error), 16 tests Jest native.

## Decisión: a mano o librería headless

Se hizo a mano porque el contrato común es pequeño y las dos plataformas necesitan implementaciones distintas de todos modos:
- **Web** usa elementos nativos del DOM: `<input type="checkbox|radio">` (ocultos con `sr-only`, estilizados con `peer-*`), `<select>`, `<fieldset>/<legend>`. El teclado y los lectores de pantalla funcionan sin código extra (flechas en radios, Espacio en checkbox).
- **Native** usa `Pressable` con `role` + `aria-checked`; `Select` abre una hoja con `Modal`.
- Una librería (Base UI, Radix, `@rn-primitives`) sería lo correcto para `Select` con búsqueda, `Combobox` o `Popover` posicionado; se evaluará en la Fase 6.

## Conceptos de Storybook

- **Stories con estado real:** al usar `useControllableState`, las stories no necesitan `useArgs`: el componente mantiene su estado en modo no controlado y `fn()` registra los cambios.
- **Play functions de formularios:** `userEvent.type`, `selectOptions`, `tab`/`keyboard`, y matchers de jest-dom (`toBeInvalid`, `toHaveAccessibleDescription`, `toBeChecked`) para verificar accesibilidad y no solo eventos.
- **Stories compartidas, comportamiento por plataforma:** el catálogo de estados (error, disabled, requerido) vive en `X.stories.tsx`; el teclado y el DOM, en `X.web.stories.tsx`.

## Lecciones

- Las **variantes de estado se comparten por completo** (`checked`, `selected`, `invalid`): los dos componentes solo difieren en el elemento y en lo interactivo (`peer-focus-visible` en web, `active:` en native).
- Para anunciar un error en web se usa `role="alert"`; en native, `role="alert"` + `accessibilityLiveRegion="polite"`.
- Los componentes web con hooks llevan `'use client'`; `tsdown` con `unbundle` lo conserva en la primera línea de cada archivo de `dist/web` (verificado), así que el barril se puede importar desde Server Components.
- El `Field` web recibe `htmlFor`/`descriptionId`/`errorId` (props solo web); la versión native no los necesita. El contrato compartido (`FieldBaseProps`) no los incluye.

## Pendiente

- Validación de formularios (esquemas, mensajes) fuera de alcance por ahora.
- `Select` native usa `Modal` básico: sin búsqueda ni teclado de escritorio.
