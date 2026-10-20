# Tareas pendientes

Lista para continuar más adelante. Estado al 2026-10-18, tras publicar `0.1.2` y montar los agentes remotos (ADR 0004). Referencias: plan en `docs/plan/plan-inicial.md`, bitácoras en `docs/learning/`, errores en `docs/learning/errores-y-soluciones.md`.

## 1. Acciones tuyas (bloquean cosas ya preparadas)

- [x] **Chromatic:** proyecto creado y secret `CHROMATIC_PROJECT_TOKEN` guardado (nunca en `package.json`). Falta ver la primera build verde en el pipeline.
- [x] **Scope npm:** decidido `@chroma-yesid` (antes `@yesid`; ver `docs/learning/fase-9.md`). Organización `chroma-yesid` creada en npm.
- [x] **Primera publicación a npm:** `@chroma-yesid/tokens@0.1.0` y `@chroma-yesid/ui@0.1.0` publicados el 2026-10-18 (ver `docs/learning/fase-9.md`). La `0.1.0` de `ui` tiene peers exactos: corregido en `0.1.1`.
- [x] **Trusted Publisher** configurado para `tokens` y `ui`; `0.1.1` publicada por `release.yml` con firma de procedencia (ver `docs/learning/fase-9.md`).
- [ ] **Marcar `@chroma-yesid/ui@0.1.0` como obsoleta:** `npm deprecate @chroma-yesid/ui@0.1.0 "peerDependencies exactos; usa >=0.1.1"` (requiere 2FA, lo ejecuta la persona).
- [~] **Ver los estilos en un dispositivo/simulador:** revisado en iPhone 17 (iOS 26.5) con `expo run:ios`: Button, Accordion, Table, Pagination, Skeleton y TextField se ven bien (ver `docs/learning/fase-9.md`). Tema oscuro, `Sheet` y `Dialog` también revisados. **Falta comprobar:** `Select`, `Menu`, `Popover` y `Toast` (se abren con un toque) y un dispositivo Android.
- [x] **Dependabot** para las GitHub Actions: `.github/dependabot.yml` (semanal, agrupado).

- [x] **Release fallaba en cada push a `main`** (2026-10-18): el scope `@chroma-yesid` no existía y faltaba el trusted publisher. Resuelto: scope creado, `0.1.0` publicada a mano y trusted publishing configurado; `release.yml` publicó `0.1.1` y `0.1.2` (ver `docs/learning/fase-9.md`).

## 2. Publicar los Storybooks (aplazado)

_Decisión: no es necesario por ahora; Chromatic ya publica el Storybook web._

- [ ] Crear `storybook-deploy.yml` (GitHub Pages): `build-storybook` de `apps/storybook-web`, `apps/storybook-native-web` y `examples/taskbox`, y subirlos como artefacto de Pages.
  - Nota: Pages en un repo **privado** requiere plan de pago; alternativa: repo público o Chromatic/Vercel.
- [ ] Definir `DS_STORYBOOK_URL` (Taskbox) y `NATIVE_STORYBOOK_URL` (Storybook web) con las URLs publicadas, para que `refs` funcione fuera de desarrollo.

## 2b. Fase 10 — siguiente nivel visual (en curso, ver `docs/learning/fase-10.md`)

Un PR por fase; cada merge lo aprueba la persona.

- [x] **PR 1** fusionado.
- [x] **PR 2** fusionado (superficies y tipografía aplicadas).
- [x] **PR 3 fusionado — mejoras a componentes existentes:** `Button`, `Badge`, `Toast`, `TextField`, `Card`, `Tabs`, `Icon`, `Spinner` (sin `interactive` en `Card`, ver `fase-10.md`).
- [x] **PR 4 fusionado — movimiento de overlays** (web con `data-starting-style`; native con `Animated`, sin Reanimated; ADR 0006). Falta probarlo a mano en el simulador.
- [x] **PR 5 fusionado — `Alert`, `Progress`, `Chip`, `SegmentedControl`, `Kbd`.**
- [x] **PR 6 fusionado — `OtpInput` y `Combobox`** (sin agrupación en `Combobox` por ahora).
- [x] **PR 7 fusionado — `Table` con orden y selección de filas.**
- [~] **PR 8 — patrones:** `SettingsGroup`, `OnboardingStep`, `StatCard`, `SelectableCardGroup`; `ListItem` pasa a componente.
- [ ] **PR 9 — `CommandPalette` y cierre** (guidelines, README, skill `chroma-design-system`).

## 3. Fase 9+ del plan (mejoras futuras, independientes)

- [ ] **Registro estilo shadcn** (`registry.json` + `shadcn build`): los nombres semánticos de los tokens ya son compatibles. Evaluar una vía para native.
- [ ] **Addon propio "Platform Parity"** (`packages/storybook-addon-parity`): panel que lee `parameters.platforms`, enlaza la story equivalente en native y muestra una captura; estados en el sidebar.
- [ ] **Migrar a CSF Next** (`preview.meta`, `meta.story`, `.test()`): primero las stories web-only. Las compartidas siguen en CSF3 hasta comprobar soporte en Storybook native.
- [ ] **i18n y RTL:** globals `locale` y `dir` con un decorador; en React Native `I18nManager` exige recargar; comprobar `rtl:` en Uniwind.
- [~] **Movimiento:** animaciones de entrada/salida de overlays hechas en el PR 4 de la Fase 10 (CSS en web, `Animated` en native, sin Reanimated). `prefers-reduced-motion` global ya está hecho (web y native, ver `docs/learning/fase-9.md`); las animaciones nuevas deben respetarlo.
- [ ] **Figma:** `parameters.design` (addon-designs ya instalado) y Code Connect; Figma Variables → DTCG.
- [ ] **Paquete de iconos** (SVGR + `react-native-svg`) en lugar de la lista de paths en `Icon/icons.ts`.
- [ ] **Multi-marca:** `extraThemes` de Uniwind y temas extra en `web.css`.
- [ ] **Spike de `react-strict-dom`** (comparar SSR, tamaño y estilos con el enfoque actual).
- [ ] **Spike de instalación aislada de pnpm** (hoy `nodeLinker: hoisted`, ver ADR 0003).
- [ ] **TypeScript 7:** comprobar que `moduleSuffixes` funciona (es la base del guardián de paridad) antes de subir desde 6.0.

## 4. Mejoras de lo ya construido

- [x] **Tema oscuro del panel de Storybook** (`manager.ts`, sigue la preferencia del sistema).
- [x] **Páginas de Guidelines:** accesibilidad, reglas multiplataforma y contribución (`apps/storybook-web/docs/guidelines`).
- [ ] **Componentes:** `Popover` posicionado en native (el `Select` con búsqueda ya existe como `Combobox`); `Sheet` con arrastre (`@gorhom/bottom-sheet`) si hace falta. Hechos: `Skeleton`, `Pagination`, `Table` (con orden y selección).
- [ ] **Validación de formularios** (esquemas y mensajes), fuera de alcance hasta ahora.
- [ ] **Pruebas de overlays native en dispositivo real** (foco, lectores de pantalla): hoy solo hay Jest y el export de Metro.
- [ ] **Taskbox native** reutilizando store y stories de patrones (ahora también `SettingsGroup`, `OnboardingStep`, `StatCard`).
- [ ] **Segundo proyecto de Chromatic** para capturas aproximadas del Storybook native en el navegador.
- [x] **`knip`** (paso en CI, config en `knip.json`). Pendiente: `size-limit`.
- [ ] **Probar el flujo MCP con un agente real** (`.mcp.json`, `docs-list`/`docs-show`/`test-run`) y dejarlo en una guía.
- [ ] **Docs versionadas** (`/v1`) cuando haya más de una versión publicada.

## 4b. Delegar a agentes (issues → PR)

Montado en `.github/workflows/claude.yml` (decisión en `docs/adr/0004-agentes-remotos.md`, uso en `docs/guia-paso-a-paso.md` §10b). Para que funcione falta lo que solo puede hacer una persona:

- [ ] **Configuración única (tuya):** instalar la Claude GitHub App en el repo, guardar `CLAUDE_CODE_OAUTH_TOKEN` (`claude setup-token` + `gh secret set`), crear las etiquetas `claude` y `needs-human`, y tener el scope `workflow` de `gh` para empujar workflows.
- [ ] **Piloto de documentación:** un issue mínimo con la etiqueta `claude`. Comprobar: comentario de progreso de `claude[bot]`, rama `claude/issue-…`, PR abierto por el agente con `verify` corriendo solo (no `BLOCKED`), commits con gitmoji y una entrada en `fase-9.md`.
- [ ] **Comprobar en el piloto** que el agente abre el PR (no deja solo un enlace), que `@claude` en el PR agrega un commit a la misma rama (si queda *skipped*, revisar la condición de autor `claude[bot]` del `if`), y que un comentario sin `@claude` queda como *skipped*.
- [ ] **Piloto de código:** un issue pequeño real (p. ej. `size-limit`) para ejercitar `preparar-entorno`, Playwright y todos los checks; anotar duración y consumo de la suscripción.
- [ ] **Sembrar el backlog:** un issue por cada pendiente automatizable de este archivo, sin etiqueta de agente; los que exigen una persona (`npm deprecate`, dispositivos, Figma, segundo proyecto de Chromatic) con `needs-human`.
- [ ] **Adaptador de Codex** (integración nativa `@codex` u `openai/codex-action`): evaluado en el ADR 0004, sin implementar.
- [ ] _Opcional:_ migrar `ci.yml` a `./.github/actions/preparar-entorno` y activar *Automatically delete head branches* para que no se acumulen las ramas `claude/`.

## 1b. Arreglos del pipeline (detectados 2026-10-17)

- [x] **CI** fallaba en `attw` por los entrypoints CSS (`web.css`, `native.css`); ahora se excluyen con `--exclude-entrypoints`.
- [x] **Release** ya puede abrir el PR "Version Packages" (permiso de Actions activado).

## 5. Al retomar

1. `pnpm install && pnpm --filter @chroma-yesid/tokens build`
2. `pnpm lint && pnpm turbo run build typecheck test:unit test:storybook test:native` (debe estar todo verde).
3. Leer `docs/learning/errores-y-soluciones.md` y `docs/learning/buenas-practicas.md`.
4. Cada cambio de paquete lleva un changeset; commits con `:emoji: tipo(alcance): descripción`.
