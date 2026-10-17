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
