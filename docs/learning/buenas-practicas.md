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
- Para un componente controlado desde fuera (Dialog, Sheet, Toast) crea un `XExample.tsx` con el estado.

**Si necesitas datos de red en una story**
- MSW (`parameters.msw.handlers`), con un handler por escenario (éxito, error, vacío, carga infinita). Estado de Redux: `makeStore(preloadedState)` por story, nunca un singleton.

**Si necesitas fechas o IDs deterministas**
- Aísla el reloj/ID en su propio módulo y simúlalo con `sb.mock` + `mocked(...)` en `beforeEach`.

**Si agregas o cambias algo**
- Corre claro **y** oscuro (`pnpm --filter @yesid/storybook-web test:storybook`) y los tests native.
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
