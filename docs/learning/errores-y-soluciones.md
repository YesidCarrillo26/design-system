# Errores frecuentes y cómo actuar

Guía viva: cada vez que un error inesperado cueste tiempo, se agrega aquí con su causa y la acción correcta. Léela antes de depurar.

## Método general

1. **Lee el error completo** antes de cambiar nada (`grep` solo para localizar, no para decidir).
2. **No asumas una API: compruébala** con una prueba mínima o con la documentación (`npx ctx7@latest docs …`). Tres suposiciones erradas hasta ahora: `titlePrefix` solo en títulos automáticos, `Default.args` como datos reutilizables, y que `native.css` anidado descubre temas.
3. **Provoca el fallo a propósito** para comprobar que una verificación detecta lo que dice detectar (tipos de paridad, reglas de oxlint, tests, a11y, tema oscuro).
4. **Sospecha de la caché** si un número no cambia cuando debería (tests, tipos, builds).
5. **Corrige la causa, no el síntoma**: un contraste insuficiente se arregla en el token, no en cada componente.
6. **Si el arreglo toca algo fuera del repo** (apps instaladas, simuladores, cuentas, secretos), pregunta antes.
7. Documenta el aprendizaje aquí y en la bitácora de la fase.

## Catálogo

| Síntoma | Causa | Qué hacer |
|---|---|---|
| Un test/tipo "pasa" pero no cuenta lo nuevo (20 tests con 30 componentes más) | Turbo no hashea el código de un paquete del workspace si la tarea no depende de él | `dependsOn: ["^build"]` en toda tarea que consuma `@yesid/ui` o `@yesid/tokens` |
| `Components/Components/Button` | `titlePrefix` del specifier también se antepone a títulos explícitos | En archivos con `title` explícito usar solo `'Button'` |
| `Cannot read properties of undefined` al reutilizar `Default.args` | Los args suelen vivir en el `meta`, no en cada story | Extraer datos a `*.fixtures.tsx` y usarlos en ambos archivos de stories |
| Uniwind: `Cannot use @variant with unknown variant: light` | Uniwind no descubre temas a través de `@import` anidados | La app importa `@yesid/tokens/native.css` directamente |
| `ERR_PNPM_IGNORED_BUILDS` | pnpm 12 trata los postinstall sin aprobar como error | Decidir en `allowBuilds` (`true`/`false`) en `pnpm-workspace.yaml` |
| `Edit` falla: "file modified since read" | pnpm reescribe `pnpm-workspace.yaml` | Releer el archivo y reintentar |
| Peer sin cumplir con React 19.3.1 | Expo SDK fija React 19.3.0 | Fijar al exacto del SDK (`pnpm peers check`) |
| `.next/**` o `dist/**` en errores de oxlint | Lint escaneando salida de build | Añadir a `ignorePatterns` |
| axe: contraste < 4.5:1 | Combinación de tokens insuficiente | Corregir el token (ambos temas) y volver a correr la suite en claro y oscuro |
| axe `aria-hidden-focus` con Base UI abierto | "Focus guards" de la librería | Desactivar solo esa regla en la story, con comentario |
| RNTL: `Unable to find an element with role` | En native solo se consultan elementos `accessible` | `accessible` en elementos sin hijos interactivos; si tiene hijos interactivos, el rol va en el texto |
| `jest.fn()` no encaja con el tipo de `args` | Las stories usan `fn()` de `storybook/test` (otro tipo) | Usar `fn()` de `storybook/test` también en los tests |
| `An update … was not wrapped in act(...)` con timers | Avanzar timers fuera de `act` | `await act(async () => { await jest.advanceTimersByTimeAsync(ms) })` |
| `timeout: command not found` | macOS no lo trae | Usar el timeout de la herramienta, no el comando |
| `expo start --ios` quiere reemplazar Expo Go | CLI actualiza Expo Go al del SDK | No ejecutarlo sin preguntar; alternativa `expo run:ios` |
| `changeset status` falla | `main` sin commits | Hacer el primer commit |
| Push rechazado por `workflow` scope | Token de `gh` sin ese permiso | `gh auth refresh -h github.com -s workflow` (lo hace la persona) |
| `does not provide an export named 'initialize'` (msw-storybook-addon) | La **versión mayor cambió la API** (v3: addon en `main.ts`, `mswLoader()` desde `/csf3`, handlers con `msw.use()` en `beforeEach`) | Con una versión mayor nueva, leer el `README.md` del paquete **instalado** (`node_modules/<pkg>/README.md`) antes de usar ejemplos de memoria |
| Vitest: `Vite unexpectedly reloaded a test` / `failed to find the current suite` en la primera ejecución | Vite descubre dependencias en frío y reoptimiza a mitad de la corrida | Repetir una vez con la caché caliente; si persiste, `optimizeDeps.include` |
| axe `heading-order` en un patrón | Nivel de título fijo que no encaja tras otro encabezado | Exponer `headingLevel` en el patrón (por defecto 2) y no fijar el nivel |
| Un test pasa en claro y falla en oscuro (o al revés) | Combinación de tokens o color fijo | `VITE_SB_THEME=dark` en la suite; corregir el token |
| Build: `Rolldown failed to resolve import "@react-native/assets-registry/registry"` | React Native 0.88 ya no depende de ese paquete, pero `react-native-svg` (web) lo importa | Dependencia directa `@react-native/assets-registry` con la versión de RN en la app que lo necesite |
| En react-native-web, `flex-1` deja el fondo en blanco bajo el contenido | La raíz no tiene altura | `html, body, #storybook-root { height: 100% }` y raíz `display: flex` |
| No se sabe si un Storybook cargó la implementación web o la native | react-native-web pinta `role="button"` como `<button>` | Buscar cadenas exclusivas de cada implementación en el bundle (`check:bundle`) |
| CI: `attw` → `"@yesid/ui/web.css": Resolution failed` | attw busca tipos y los entrypoints CSS no tienen | `attw --pack . --profile esm-only --exclude-entrypoints web.css native.css` |
| Release: `GitHub Actions is not permitted to create or approve pull requests` | Ajuste del repo desactivado, no es un error del workflow | Settings → Actions → General → *Allow GitHub Actions to create and approve pull requests* (o `gh api -X PUT …/actions/permissions/workflow -F can_approve_pull_request_reviews=true`) |
| `npx chromatic` falla desde la raíz del monorepo | No encuentra `build-storybook`; el Storybook está en `apps/storybook-web` | Ejecutarlo en `apps/storybook-web` con `--build-script-name=build-storybook` y el token en una variable de entorno, **nunca** en un script de `package.json` |
| knip: cientos de `Unresolved imports` (`./Accordion`) | Los componentes solo existen como `.web`/`.native` | `ignoreUnresolved: ["^\\./"]` y declarar como `entry` `*.{web,native}.{ts,tsx}`, tests native y stories |
| knip reporta `expo-updates`/`expo-system-ui` sin listar | Su plugin de Expo los infiere de `userInterfaceStyle`; no están en `app.json` | `ignoreDependencies` con el motivo |
| oxlint: `'react-native' import is restricted` en `lib/*.native.test.tsx` | La excepción de `lib/**` no cubría los tests native | Añadir `lib/**/*.native.test.tsx` al override de `.oxlintrc.json` |
| RNTL: `Property 'UNSAFE_getByType' does not exist on type 'Screen'` | La API async de esta versión no lo expone | Consultar con `screen.root` o con roles/textos |
| `git push` a `main`: `push declined due to repository rule violations` / `Required status check "verify" is expected` | `main` ahora está protegida: exige PR y el check `verify` | Rama + PR; esperar `verify` y Chromatic; `gh pr merge <n> --rebase` |
| `gh pr merge --merge`: `Merge commits are not allowed on this repository` | El repo solo admite rebase o squash | `--rebase` (conserva cada commit); después `git reset --mixed origin/main` en `main` local si los hashes cambiaron |
| Native: `Text strings must be rendered within a <Text> component` con una celda/slot personalizado | Un `render` que devuelve `string`/`number` queda dentro de un `View` (en web no pasa) | Envolver los primitivos en `Text` en el componente native (ver `Table.native.tsx`) |
| RNTL: `getByRole('table'/'row')` no encuentra un `View` con `role` | Un `View` con `role` no es elemento de accesibilidad si no es `accessible` | No marcar `accessible` en contenedores (se vuelven una sola parada para el lector); probar la estructura recorriendo `screen.toJSON()` |
| Story web compartida: `Cannot read properties of undefined (reading 'map')` | Se importó `Default.args` (vacío); los datos están en el `meta` | Sacar los datos a `X.fixtures.ts` y usarlos en ambas stories |
| TS4023 `... cannot be named` al reutilizar un `meta` genérico entre stories | Tipos locales no exportados | Exportar los tipos desde un `*.fixtures.ts` |
| Metro: `Metro is running in CI mode, reloads are disabled`; mis cambios no aparecen en el simulador | Se arrancó con `CI=1` | Arrancar `npx expo start --dev-client` sin `CI` |
| Dev client: `No script URL provided ... unsanitizedScriptURLString = (null)` | La app se lanzó sin la URL de Metro (`simctl launch`) | `xcrun simctl openurl booted "<scheme>://expo-development-client/?url=http%3A%2F%2Flocalhost%3A8081"` |
| Native: línea gris que sobresale bajo un contenedor con `rounded` + `border` | El `border-b` de la última fila queda fuera del recorte; en native no hay `last:` ni `overflow` implícito | `overflow-hidden` en el contenedor y `border-b-0` a la última fila (por índice) |
| Native: una fila de botones queda cortada en pantallas estrechas | `flex-row` sin `flex-wrap` | `flex-wrap` (y `justify-center`) |
