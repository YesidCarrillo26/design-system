# Design system (`@yesid/*`)

Componentes para **web** (React DOM + Tailwind v4) y **mobile** (React Native + Uniwind) con los
mismos tokens, contratos de props y stories. Documentado y probado con Storybook 10.

> **¿Primera vez aquí?** Lee la [guía paso a paso](./docs/guia-paso-a-paso.md): cómo se construyó, con qué tecnologías y comandos.

## Empezar

```sh
pnpm install
pnpm --filter @yesid/tokens build   # genera los CSS y constantes de tokens
pnpm storybook                      # Storybook web → http://localhost:6006
pnpm storybook:native               # Storybook on-device (Expo)
```

## Verificación

```sh
pnpm lint                                              # oxlint + fronteras entre plataformas
pnpm turbo run typecheck                               # packages/ui se compila 2 veces (web y native)
pnpm turbo run test:unit test:storybook test:native    # tokens, stories en navegador, Jest native
```

## Estructura

| Ruta | Qué es |
|---|---|
| `packages/tokens` | Tokens DTCG y sus salidas (`web.css`, `native.css`, TS, `tw-merge`) |
| `packages/ui` | Componentes: `X.web.tsx`, `X.native.tsx`, contrato, variantes y stories compartidas |
| `apps/storybook-web` | Storybook principal: docs, tests de interacción y a11y |
| `apps/storybook-native` | App Expo con Storybook on-device y tests Jest |
| `tooling/typescript` | tsconfig compartidos |
| `docs/guia-paso-a-paso.md` | Cómo se construyó todo, con tecnologías y comandos |
| `docs/adr` | Decisiones de arquitectura |
| `docs/plan` | El plan inicial y su estado por fase |
| `docs/learning` | Bitácora por fase, buenas prácticas y catálogo de errores |

Las reglas del proyecto están en [`AGENTS.md`](./AGENTS.md).
