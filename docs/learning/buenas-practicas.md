# Buenas prácticas de arquitectura

Decisiones que ya se tomaron (y por qué), en formato **"si pasa X, hazlo así"**. Complementa a los ADRs (`docs/adr`) y al catálogo de errores (`errores-y-soluciones.md`).

## Componentes

**Si agregas un componente nuevo**
- Empieza por el contrato (`X.types.ts` con JSDoc: es lo que lee el autodocs) y las variantes (`x.variants.ts`, solo clases válidas en las dos plataformas). Después las dos implementaciones.
- Nómbralo igual en ambas plataformas y mantén **las mismas props**: el typecheck doble (`tsc -b`) te avisa si divergen.
- Cumple la Definition of Done (contrato, variantes, stories compartidas, test web, test native, a11y en ambos temas, docs, changeset).

**Si el componente solo compone otros** (EmptyState, PageHeader, ListItem)
- Es un *patrón*: un solo archivo `X.tsx` en `patterns/`, sin `.web`/`.native`. Las primitivas resuelven la plataforma.

**Si una plataforma no puede hacer lo mismo** (hover, popover anclado, tooltip)
- No lo simules. Ofrece la alternativa equivalente (hoja inferior, `accessibilityHint`), documéntala en `parameters.platforms` y en *Guidelines/Platform differences*.

**Si necesitas lógica que se repite en web y native**
- Va en un `useX.ts` compartido (sin importar `react-native` ni `react-dom`). Lo único que cambia es el elemento que renderiza.

**Si el componente usa hooks o estado en web**
- Añade `'use client'` en el archivo `.web.tsx` (no en el barril): así se puede importar desde Server Components de Next.

**Si necesitas controlado y no controlado**
- Usa `useControllableState` (`value` / `defaultValue` / `onChange`), igual que los inputs nativos.

## Estilos y tokens

**Si necesitas un color, tamaño o sombra nuevo**
- No lo pongas en el componente: agrégalo como token (`packages/tokens/tokens`), reconstruye y úsalo por su nombre semántico (`bg-primary`).
- Nombra por **rol**, no por tono (`destructive`, no `red`). Define siempre el valor claro **y** oscuro.

**Si necesitas una clase dinámica**
- No construyas nombres (`bg-${x}`): Tailwind y Uniwind escanean texto literal. Usa un mapa de clases completas o una variante.

**Si un elemento no lee `className` en native** (SVG, `ActivityIndicator`)
- Usa `useTokenColor(token)` (`lib/useTokenColor.native.ts`) para obtener el valor del tema actual.

**Si un estilo es interactivo**
- Va en la extensión de cada plataforma: `hover:`/`focus-visible:` en web, `active:` en native. Las variantes compartidas no los llevan.

## Accesibilidad

**Si es un control sin texto visible** (botón de ícono)
- Exige `label` en el tipo: es el único nombre accesible.

**Si un componente native tiene `role`**
- La `View` debe ser `accessible`, salvo que contenga hijos interactivos: entonces el rol va en el `Text` y los hijos siguen alcanzables.

**Si un overlay abre contenido**
- En web usa Base UI (foco atrapado, Escape, devuelve el foco). En play functions consulta el portal con `screen`, no con `canvas`.

**Si axe falla**
- Corrige en el token o el componente. Solo desactiva una regla en una story concreta, con comentario que explique por qué y cuál es la causa de la librería.

## Stories y pruebas

**Si escribes una story**
- Estados (error, disabled, vacío) en `X.stories.tsx` compartida, con solo `fn` de `storybook/test`. Teclado y DOM en `X.web.stories.tsx` con `play`.
- Datos de ejemplo reutilizables en `*.fixtures.tsx`; no leas `Default.args` desde otro archivo.
- Para un componente controlado desde fuera (Dialog, Sheet, Toast) crea un `X.example.tsx` con el estado (solo para stories: `tsdown` lo excluye del paquete publicado).

**Si necesitas datos de red en una story**
- MSW (`parameters.msw.handlers`), con un handler por escenario (éxito, error, vacío, carga infinita). Estado de Redux: `makeStore(preloadedState)` por story, nunca un singleton.

**Si necesitas fechas o IDs deterministas**
- Aísla el reloj/ID en su propio módulo y simúlalo con `sb.mock` + `mocked(...)` en `beforeEach`.

**Si agregas o cambias algo**
- Corre claro **y** oscuro (`pnpm --filter @chroma-yesid/storybook-web test:storybook`) y los tests native.
- Valida que tu verificación detecta el fallo: rómpelo a propósito una vez.

## Monorepo, build y publicación

**Si una tarea de Turbo consume otro paquete del workspace**
- `dependsOn: ["^build"]` (o los inputs necesarios); si no, la caché puede dar resultados viejos.

**Si cambias `exports` o el build**
- Corre `publint` y `attw --pack`, y comprueba que Next no trae `react-native` (`grep` por imports) y que `"use client"` sigue en `dist/web`.

**Si agregas una dependencia**
- Las compartidas van en `catalog:` (`pnpm-workspace.yaml`). React/RN/Expo se alinean con el SDK de Expo, no con el último de npm. Revisa `pnpm peers check`.

**Si publicas o tocas CI**
- Acciones de terceros fijadas por SHA; secretos solo en GitHub secrets; cada cambio de paquete lleva un changeset.

**Si ejecutas algo con efectos fuera del repo** (instalar apps, tocar el simulador, cuentas)
- Pregunta antes. Si es reversible y mínimo, déjalo como estaba y avisa.

**Si documentas una regla o una convención**
- Contrástala con el código antes de publicarla (`grep`). Una guía que describe lo que "debería" pasar y no lo que pasa es peor que no tener guía.

**Si añades una animación o transición**
- Web: usa `motion-reduce:` o confía en el bloque global de `web.css` (lleva las duraciones a `1ms`, no a `0`). Native: usa `useReducedMotion` / el `Modal` de `lib`, no `Modal` de `react-native` directamente.

**Si añades una herramienta de calidad al CI** (knip, lint…)
- Primero llévala a cero hallazgos en local, justificando cada falso positivo en su configuración; una herramienta que falla siempre se acaba ignorando.

**Si guardas un token o secreto**
- Solo en GitHub secrets o variables de entorno; nunca en `package.json`, scripts ni docs. Si se escribió en un archivo, regenerarlo aunque no se haya hecho commit.

**Si un componente acepta contenido personalizado (`render`, `children`)**
- En native, los textos deben ir en `Text`: envuelve `string`/`number` y deja pasar los elementos. Escribe una story con un `render` que devuelva texto plano, porque en web no revela el problema.

**Si necesitas semántica que React Native no ofrece** (tablas, `aria-current`)
- Usa el `role`/`accessibilityState` más cercano, documenta la limitación en *Diferencias entre plataformas* y no fuerces `accessible` en contenedores.

**Si `main` está protegida**
- Rama → PR → esperar `verify` y Chromatic → `gh pr merge --rebase`. No intentes saltarte la regla.


**Si publicas un paquete**
- Prueba el tarball **como consumidor** (proyecto vacío, otra versión de React) antes de publicar: `pnpm pack`, `npm install ./x.tgz` y renderiza algo. Los linters de paquete no ven problemas de peers ni de instalación.
- Los `peerDependencies` son rangos; el catálogo (`catalog:`) fija versiones exactas solo para desarrollo.
- Antes de publicar a mano: `turbo run build --force` y `pnpm publish --dry-run`. Cada versión publicada es definitiva (el número no se reutiliza).

## Diseño visual (Fase 10)

**Si añades un color o un estado**
- Ponlo como token en **ambos** temas y pasa el test de contraste (`sd/contrast.test.ts`). Texto o icono de estado: `X-subtle-foreground`; `X` solo como relleno; `warning` nunca como texto (2.15:1 sobre blanco).
- Tinte de un color: el modificador de opacidad (`border-success-subtle-foreground/20`), no un valor suelto.

**Si cambias un token o un nombre de clase**
- Busca también en `scripts/` y en los tests: `check-bundle.mjs` busca clases literales (`active:opacity-pressed`) para saber qué implementación cargó cada Storybook.
- Antes de decir "hecho" reproduce **todos** los pasos de `ci.yml` en local, no solo `turbo`.

**Si una utilidad nueva "no hace nada"**
- Comprueba que existe: compila los candidatos con `@tailwindcss/node` (web) y exporta la app native (`expo export --platform ios --no-bytecode`), buscando la clase en el bundle. Uniwind solo emite lo que aparece en el código.
- `em` en native se resuelve contra 16px: entrega el espaciado entre letras ya calculado en px.

**Si animas un overlay**
- Web: transiciones sobre `data-starting-style` / `data-ending-style`, sin `useState`. Native: `Animated` con el driver nativo, el contenido montado hasta que acabe la salida y duración 0 con "Reducir movimiento". No hace falta Reanimated (ADR 0006).
- Con la animación de salida el popup sigue montado cuando corre axe: un `listbox` sin nombre accesible o un foco mal gestionado aparecen entonces.

**Si un componente es interactivo**
- Un patrón solo compone primitivas: si necesita un `<button>`/`Pressable` propio o una librería, es un componente (`ListItem`, `SelectableCardGroup`, `CommandPalette`).
- Un contenedor que quieres localizar con `getByRole` en native debe ser accesible: usa `Pressable`, no un `View` con `role`.
- No dejes un elemento con hover pero sin rol ni foco: engaña a la accesibilidad.

**Si escribes pruebas native con Testing Library**
- `render` y `fireEvent` son asíncronos: haz `await`. Los elementos con `aria-hidden` no salen en `getByText` (usa `includeHiddenElements` solo con decorativos).
- Jest completa las animaciones al instante: para probar el orden (animar y luego desmontar) espía `Animated.timing`.
- `aria-valuenow` es el valor dentro del rango (`aria-valuemax`), no un porcentaje.

**Si `test:storybook` falla en frío**
- "iframe did not become ready" o "Failed to fetch dynamically imported module": repite con `--force` antes de buscar un error de código.
- Si turbo falla en una tarea, cancela las demás: un fallo en otra tarea puede ser solo la cancelación.

**Si trabajas con git en macOS**
- No restaures con `git checkout --` un archivo con cambios sin commitear: borra el trabajo. Haz copia antes. `sed -i` pide `-i ''`.

## Agentes remotos

**Si escribes un issue para un agente** (plantilla *Tarea para un agente*)
- Una tarea por issue, con un objetivo que se pueda comprobar. Un issue que mezcla dos cosas produce un PR difícil de revisar.
- Los criterios de aceptación son comprobables (un test, una story, una página de docs, un comando), no deseos ("que se vea bien").
- Nombra los archivos o ADR de partida y di qué queda fuera de alcance.
- Si necesita una cuenta, 2FA o un dispositivo, no es para un agente: etiqueta `needs-human`.
- El issue es un borrador hasta que le pones la etiqueta del agente. Esa etiqueta es el botón de arranque.
- El agente lee todo el texto del issue, incluidos los comentarios de terceros. No etiquetes un issue escrito por un externo (el workflow lo descarta): cópialo a uno propio y revisa lo que pegas.

**Si añades un workflow que usa un agente o su token**
- Que el agente actúe con una identidad que dispare CI (App o PAT), no con `GITHUB_TOKEN`.
- Que no pueda fusionar, publicar ni editar `.github/workflows/`: restríngelo con `--disallowedTools`, no solo con el prompt.
- Valida el workflow en local antes del PR (`actionlint`; sin él, `npx @action-validator/cli <archivo>`, de uno en uno) y haz un piloto con un issue mínimo antes de confiarle trabajo real.
