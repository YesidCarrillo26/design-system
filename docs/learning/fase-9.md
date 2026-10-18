# Fase 9 — Mejoras continuas (bitácora)

Registro cronológico de lo que se cambia después de la Fase 8. Cada entrada dice **qué**, **por qué** y **cómo verificarlo**. Se actualiza en el mismo cambio que introduce algo; no se reescribe el pasado (si algo se revierte, se agrega una entrada nueva).

## 2026-10-17 — Pipeline en verde y herramientas de calidad

**CI**
- `attw` marcaba `web.css` y `native.css` como "Resolution failed": son CSS y no tienen tipos. Ahora `npx attw --pack . --profile esm-only --exclude-entrypoints web.css native.css`.
- Release fallaba con *GitHub Actions is not permitted to create or approve pull requests*. Es un ajuste del repo (Settings → Actions → General), no del workflow; se activó con `gh api -X PUT repos/<owner>/<repo>/actions/permissions/workflow -F can_approve_pull_request_reviews=true`.
- Chromatic: el token vive solo en el secret `CHROMATIC_PROJECT_TOKEN`. ⚠️ Se detectó un token escrito en un script `chromatic` de `apps/storybook-web/package.json` (sin commit): se quitó. Regla: ni en `package.json` ni en el historial de comandos compartido; si pasa, regenerar el token.
- Dependabot (`.github/dependabot.yml`, semanal y agrupado) mantiene al día los SHA de las GitHub Actions.

**`knip`** (dependencias, exports y archivos sin usar; paso en CI)
- La configuración (`knip.json`) existe porque este monorepo tiene archivos por plataforma: `./Accordion` solo existe como `.web`/`.native`, y knip lo ve como import sin resolver. Se ignoran los relativos (`tsc` ya los valida) y se declaran como entrada `*.{web,native}.tsx`, los tests native y las stories.
- Falsos positivos justificados en el propio `knip.json`: plugins de Expo inferidos por `userInterfaceStyle` (`expo-updates`, `expo-system-ui`), peers de runtime (`react-native-svg`, `@react-native/assets-registry`, `test-renderer`) y `@yesid/ui` como dependencia de resolución en las apps.
- Hallazgo real: dos entradas del catálogo (`@storybook/addon-ondevice-backgrounds` y `-notes`) no las usaba nadie y se eliminaron.

**Storybook web**
- Tema oscuro del panel (`manager.ts` + `theme.ts` con `light` y `dark`, que salen de los tokens). Sigue `prefers-color-scheme`; el manager solo relee el tema al recargar, por eso hay un `reload()` al cambiar la preferencia.
- Guidelines nuevas: accesibilidad, reglas multiplataforma y contribución (con la Definition of Done).
- ⚠️ Lección: al redactar esas páginas se afirmaron tres cosas que el código no respaldaba (una convención `@platform`, el tamaño táctil de `Button sm`, y movimiento reducido "global"). **Contrastar cada regla documentada con el código** antes de publicarla.

**Componentes**
- `Skeleton` (`text | rect | circle`): decorativo (`aria-hidden`; el contenedor lleva `aria-busy`). Web con `animate-pulse motion-reduce:animate-none`; native estático.

## 2026-10-17 — Movimiento reducido global

- **Web:** `packages/tokens/sd/build.ts` agrega a `web.css` un bloque `@media (prefers-reduced-motion: reduce)` que lleva animaciones, transiciones y `--ds-duration-*` a `1ms`. No se usa `0`: con 0 algunos componentes no disparan `transitionend`/`animationend` y se quedan a medias. Cubre también librerías de terceros.
- **Native:** `lib/useReducedMotion.native.ts` (lee `AccessibilityInfo` y escucha `reduceMotionChanged`) y `lib/Modal.native.tsx`, un `Modal` que pasa a `animationType="none"` con la preferencia activa. `Dialog`, `Popover`, `Menu`, `Select` y `Sheet` lo usan.
- **Verificación:** `web-css.test.ts` (tokens) y `Modal.native.test.tsx`. Se comprobó que el test native **falla** si se quita la condición.
- ⚠️ Lección de lint: la excepción de `lib/**` para importar `react-native` cubría `*.native.ts(x)` pero no `*.native.test.tsx`; se amplió en `.oxlintrc.json`.
- Lo que sigue sin cubrir: `Toast` y los `Switch`/`Accordion` de native no animan hoy; si se agregan animaciones con Reanimated hay que respetar `useReducedMotion`.
