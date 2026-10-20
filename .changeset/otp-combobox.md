---
'@chroma-yesid/ui': minor
---

Componentes nuevos, en web y native.

- **`OtpInput`:** código de un solo uso en casillas (`length`, `numeric` o `alphanumeric`, `mask`, `onComplete`). En web usa Base UI `OTPField` (pegar, autocompletar del SMS, flechas); en native, un único `TextInput` invisible con `oneTimeCode` / `sms-otp`. Cada casilla web tiene nombre accesible ("Carácter n de N").
- **`Combobox`:** `Select` con búsqueda para listas largas; mismas props que `Select` más `searchPlaceholder` y `emptyText`. Filtra sin distinguir acentos ni mayúsculas (`Bogotá` coincide con `bogota`). En web, Base UI `Combobox` con el campo dentro del popup; en native, una hoja inferior con campo de búsqueda.
