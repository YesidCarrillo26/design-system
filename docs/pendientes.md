# Tareas pendientes

Lista para continuar más adelante. Estado al final de la **Fase 8** (2026-10-17). Referencias: plan en `docs/plan/plan-inicial.md`, bitácoras en `docs/learning/`, errores en `docs/learning/errores-y-soluciones.md`.

## 1. Acciones tuyas (bloquean cosas ya preparadas)

- [x] **Chromatic:** proyecto creado y secret `CHROMATIC_PROJECT_TOKEN` guardado (nunca en `package.json`). Falta ver la primera build verde en el pipeline.
- [ ] **Scope npm `@yesid`:** confirmar que es tuyo (o cambiarlo en todos los `package.json`, imports y docs). Hace falta antes del primer `pnpm release`.
- [ ] **Primera publicación a npm:** publicar `0.0.1` a mano (`pnpm --filter @yesid/tokens publish`, luego `@yesid/ui`), y configurar *trusted publishing* para `release.yml` en npmjs.com (o un `NPM_TOKEN` granular como respaldo).
- [ ] **Ver los estilos en un dispositivo/simulador** (aún no se han visto en pantalla):
  `cd apps/storybook-native && npx expo run:ios` (no toca tu Expo Go) o actualizar Expo Go a la versión del SDK 58 con `pnpm storybook:native` y pulsar `i`.
  Comprobar: color del Button, tamaños de texto, cambio claro/oscuro, `Sheet`/`Select`/`Menu` (Modal) y `Toast`.
- [x] **Dependabot** para las GitHub Actions: `.github/dependabot.yml` (semanal, agrupado).

## 2. Publicar los Storybooks (aplazado)

_Decisión: no es necesario por ahora; Chromatic ya publica el Storybook web._

- [ ] Crear `storybook-deploy.yml` (GitHub Pages): `build-storybook` de `apps/storybook-web`, `apps/storybook-native-web` y `examples/taskbox`, y subirlos como artefacto de Pages.
  - Nota: Pages en un repo **privado** requiere plan de pago; alternativa: repo público o Chromatic/Vercel.
- [ ] Definir `DS_STORYBOOK_URL` (Taskbox) y `NATIVE_STORYBOOK_URL` (Storybook web) con las URLs publicadas, para que `refs` funcione fuera de desarrollo.

## 3. Fase 9+ del plan (mejoras futuras, independientes)

- [ ] **Registro estilo shadcn** (`registry.json` + `shadcn build`): los nombres semánticos de los tokens ya son compatibles. Evaluar una vía para native.
- [ ] **Addon propio "Platform Parity"** (`packages/storybook-addon-parity`): panel que lee `parameters.platforms`, enlaza la story equivalente en native y muestra una captura; estados en el sidebar.
- [ ] **Migrar a CSF Next** (`preview.meta`, `meta.story`, `.test()`): primero las stories web-only. Las compartidas siguen en CSF3 hasta comprobar soporte en Storybook native.
- [ ] **i18n y RTL:** globals `locale` y `dir` con un decorador; en React Native `I18nManager` exige recargar; comprobar `rtl:` en Uniwind.
- [ ] **Movimiento:** tokens ya existen; faltan las animaciones de entrada/salida de overlays (CSS en web, Reanimated en native). `prefers-reduced-motion` global ya está hecho (web y native, ver `docs/learning/fase-9.md`); las animaciones nuevas deben respetarlo.
- [ ] **Figma:** `parameters.design` (addon-designs ya instalado) y Code Connect; Figma Variables → DTCG.
- [ ] **Paquete de iconos** (SVGR + `react-native-svg`) en lugar de la lista de paths en `Icon/icons.ts`.
- [ ] **Multi-marca:** `extraThemes` de Uniwind y temas extra en `web.css`.
- [ ] **Spike de `react-strict-dom`** (comparar SSR, tamaño y estilos con el enfoque actual).
- [ ] **Spike de instalación aislada de pnpm** (hoy `nodeLinker: hoisted`, ver ADR 0003).
- [ ] **TypeScript 7:** comprobar que `moduleSuffixes` funciona (es la base del guardián de paridad) antes de subir desde 6.0.

## 4. Mejoras de lo ya construido

- [x] **Tema oscuro del panel de Storybook** (`manager.ts`, sigue la preferencia del sistema).
- [x] **Páginas de Guidelines:** accesibilidad, reglas multiplataforma y contribución (`apps/storybook-web/docs/guidelines`).
- [ ] **Componentes:** `Select` con búsqueda (`Combobox`) y `Popover` posicionado en native; `Sheet` con arrastre (`@gorhom/bottom-sheet`) si hace falta; `Table`, `Pagination` (`Skeleton` ya está).
- [ ] **Validación de formularios** (esquemas y mensajes), fuera de alcance hasta ahora.
- [ ] **Pruebas de overlays native en dispositivo real** (foco, lectores de pantalla): hoy solo hay Jest y el export de Metro.
- [ ] **Taskbox native** reutilizando store y stories de patrones.
- [ ] **Segundo proyecto de Chromatic** para capturas aproximadas del Storybook native en el navegador.
- [x] **`knip`** (paso en CI, config en `knip.json`). Pendiente: `size-limit`.
- [ ] **Probar el flujo MCP con un agente real** (`.mcp.json`, `docs-list`/`docs-show`/`test-run`) y dejarlo en una guía.
- [ ] **Docs versionadas** (`/v1`) cuando haya más de una versión publicada.

## 1b. Arreglos del pipeline (detectados 2026-10-17)

- [x] **CI** fallaba en `attw` por los entrypoints CSS (`web.css`, `native.css`); ahora se excluyen con `--exclude-entrypoints`.
- [ ] **Release** falla con "GitHub Actions is not permitted to create or approve pull requests": activar en Settings → Actions → General → *Allow GitHub Actions to create and approve pull requests*.

## 5. Al retomar

1. `pnpm install && pnpm --filter @yesid/tokens build`
2. `pnpm lint && pnpm turbo run build typecheck test:unit test:storybook test:native` (debe estar todo verde).
3. Leer `docs/learning/errores-y-soluciones.md` y `docs/learning/buenas-practicas.md`.
4. Cada cambio de paquete lleva un changeset; commits con `:emoji: tipo(alcance): descripción`.
