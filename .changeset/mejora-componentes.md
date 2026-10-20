---
'@chroma-yesid/ui': minor
---

Mejoras a componentes existentes, con los tokens de estado y las superficies nuevas.

- **`Button`:** variantes `ghost` y `destructive`; props `loading` (spinner, `aria-busy` + `aria-disabled`, mantiene el foco y bloquea `onPress`), `leadingIcon`, `trailingIcon` y `fullWidth`. `outline` pasa a `bg-card` con borde `input`.
- **`Badge`:** `tone` (`neutral|primary|success|warning|info|destructive`) × `appearance` (`solid|subtle|outline`) e `icon`. `variant` sigue funcionando pero está obsoleto.
- **`Toast`:** variantes `success`, `warning` e `info` con su ícono de estado; `title` y `action`. Corrige el color del ícono de cerrar sobre `destructive`.
- **`TextField`:** `leadingIcon`, `trailingIcon`, `prefix` y `suffix`. **Cambio:** `className` ahora va al contenedor con borde, no al `<input>`.
- **`Card`:** `variant` (`default|muted|outline`) y padding `sm`.
- **`Tabs`:** `variant="pill"` (control segmentado) además del subrayado.
- **`Icon`:** 20 íconos nuevos (search, chevrons, flechas, minus, circle-check/alert/x, eye, eye-off, settings, bell, user, mail, lock) y tonos `success`, `warning`, `info`, `on-destructive`, `on-success`, `on-warning`, `on-info`.
- **`Spinner`:** prop `tone` (incluye `on-*` para usarlo sobre un relleno).
