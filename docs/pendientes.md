# Tareas pendientes

Lista para continuar más adelante. Estado al final de la **Fase 8** (2026-10-17). Referencias: plan en `docs/plan/plan-inicial.md`, bitácoras en `docs/learning/`, errores en `docs/learning/errores-y-soluciones.md`.

## 1. Acciones tuyas (bloquean cosas ya preparadas)

- [x] **Chromatic:** proyecto creado y secret `CHROMATIC_PROJECT_TOKEN` guardado (nunca en `package.json`). Falta ver la primera build verde en el pipeline.
- [x] **Scope npm:** decidido `@chroma-yesid` (antes `@yesid`; ver `docs/learning/fase-9.md`). Falta crearlo en npm como organización.
- [ ] **Primera publicación a npm:** publicar `0.1.0` a mano (con `--access public`, ya configurado en `publishConfig`) (`pnpm --filter @chroma-yesid/tokens publish`, luego `@chroma-yesid/ui`), y configurar *trusted publishing* para `release.yml` en npmjs.com (o un `NPM_TOKEN` granular como respaldo).
- [~] **Ver los estilos en un dispositivo/simulador:** revisado en iPhone 17 (iOS 26.5) con `expo run:ios`: Button, Accordion, Table, Pagination, Skeleton y TextField se ven bien (ver `docs/learning/fase-9.md`). **Falta comprobar:** cambio claro/oscuro en el dispositivo, `Sheet`/`Select`/`Menu` (Modal), `Toast` y un dispositivo Android.
- [x] **Dependabot** para las GitHub Actions: `.github/dependabot.yml` (semanal, agrupado).

- [ ] **Release falla en cada push a `main` hasta configurar npm** (2026-10-18): tras fusionar "Version Packages" (`0.1.0`), `changeset publish` responde `404 Not Found` al publicar `@chroma-yesid/tokens@0.1.0` porque el scope `@chroma-yesid` no existe/no es tuyo en npm y falta el trusted publisher. No se publicó nada. Para resolverlo: crear/confirmar el scope en npmjs.com, publicar `0.1.0` a mano y configurar *trusted publishing* para `release.yml` (ver sección 1). Si se decide aplazar, considerar desactivar el paso de publicación para que el pipeline no quede en rojo.

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
- [ ] **Componentes:** `Select` con búsqueda (`Combobox`) y `Popover` posicionado en native; `Sheet` con arrastre (`@gorhom/bottom-sheet`) si hace falta. Hechos: `Skeleton`, `Pagination`, `Table` (solo lectura; faltan orden y selección de filas).
- [ ] **Validación de formularios** (esquemas y mensajes), fuera de alcance hasta ahora.
- [ ] **Pruebas de overlays native en dispositivo real** (foco, lectores de pantalla): hoy solo hay Jest y el export de Metro.
- [ ] **Taskbox native** reutilizando store y stories de patrones.
- [ ] **Segundo proyecto de Chromatic** para capturas aproximadas del Storybook native en el navegador.
- [x] **`knip`** (paso en CI, config en `knip.json`). Pendiente: `size-limit`.
- [ ] **Probar el flujo MCP con un agente real** (`.mcp.json`, `docs-list`/`docs-show`/`test-run`) y dejarlo en una guía.
- [ ] **Docs versionadas** (`/v1`) cuando haya más de una versión publicada.

## 1b. Arreglos del pipeline (detectados 2026-10-17)

- [x] **CI** fallaba en `attw` por los entrypoints CSS (`web.css`, `native.css`); ahora se excluyen con `--exclude-entrypoints`.
- [x] **Release** ya puede abrir el PR "Version Packages" (permiso de Actions activado).

## 5. Al retomar

1. `pnpm install && pnpm --filter @chroma-yesid/tokens build`
2. `pnpm lint && pnpm turbo run build typecheck test:unit test:storybook test:native` (debe estar todo verde).
3. Leer `docs/learning/errores-y-soluciones.md` y `docs/learning/buenas-practicas.md`.
4. Cada cambio de paquete lleva un changeset; commits con `:emoji: tipo(alcance): descripción`.
