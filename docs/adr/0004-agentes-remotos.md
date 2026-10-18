# 0004 — Agentes remotos a demanda desde issues de GitHub

- **Estado:** aceptada
- **Fecha:** 2026-10-18

## Contexto

Quiero seguir avanzando los pendientes del repo sin estar delante de mi equipo: desde el móvil
creo o etiqueto un issue, un agente trabaja en la nube, abre un PR y yo lo reviso y lo fusiono.

Restricciones del repo:

- `main` está protegida (ruleset `protect-main`): exige PR y el check `verify`, estricto (la rama
  debe estar al día), historial lineal y sin bypass.
- Un PR o un push hecho con `GITHUB_TOKEN` **no ejecuta CI**: el PR queda `BLOCKED` sin `verify`
  (ver `docs/learning/errores-y-soluciones.md`). Cualquier agente necesita una identidad distinta.
- El repo es público (Actions no tiene costo) y `release.yml` publica con trusted publishing.

## Decisión

Una **base común** que sirve a cualquier agente, y un **adaptador** por agente. Hoy solo existe el
de Claude.

**Base común**

- `AGENTS.md`, sección *Modo remoto*: las reglas para trabajar sin una persona delante (checks antes
  de empujar, commits, changeset, docs, formato del PR, límites). Codex lee `AGENTS.md` de forma
  nativa y Claude lo lee a través de `CLAUDE.md`.
- `.github/actions/preparar-entorno`: acción compuesta (Node, pnpm, `pnpm install`, build de tokens,
  Chromium de Playwright). `ci.yml` no la usa todavía, para no tocar el check obligatorio.
- `.github/ISSUE_TEMPLATE/tarea-agente.yml`: formulario de tarea. No activa a ningún agente.
- Etiquetas: una por agente (`claude`) y `needs-human` para lo que exige cuentas, 2FA o dispositivo.
- Regla fija: **el agente abre el PR, nunca lo fusiona.** Fusionar sigue siendo mío.

**Adaptador de Claude** (`.github/workflows/claude.yml`)

- `anthropics/claude-code-action` fijada por SHA (`v1.0.252`). Se dispara con la etiqueta `claude`
  en un issue o con `@claude` en un comentario de issue o PR.
- Credencial: suscripción Pro/Max (`CLAUDE_CODE_OAUTH_TOKEN`, generado con `claude setup-token`).
- **No se pasa `github_token`.** La Action usa el token de la Claude GitHub App (por OIDC), limpia
  las credenciales de `actions/checkout` y deja `GH_TOKEN` con el token de la App. Los push y los PR
  salen como `claude[bot]` y **sí** disparan `verify`.
- Rama `claude/issue-N-descripcion`; un solo Claude a la vez por issue o PR (concurrencia a nivel de
  job, para que un evento descartado por el `if` no desplace a un `@claude` que espera).

**Por qué la Action y no otra vía.** Las *routines* de Claude Code solo se disparan con eventos de
pull request o release (además de horario y API), no con issues. La Action responde a etiquetas y
menciones en issues y PRs, que es el flujo que busco.

### Límites y seguridad

| Riesgo | Control |
| --- | --- |
| Que cualquiera lo dispare | Etiquetar exige permiso de triage. Los comentarios solo cuentan si quien escribe es `OWNER`, `MEMBER` o `COLLABORATOR`, y la Action además comprueba permiso de escritura. |
| Que procese texto de un externo (inyección de instrucciones) | Quien **escribió** el issue o el PR también debe ser `OWNER`, `MEMBER` o `COLLABORATOR` (o `claude[bot]`, para poder pedirle ajustes en sus propios PR). Un issue o un PR de un externo no se procesa aunque lo etiquetes: si vale la pena, cópialo a un issue propio. |
| Que ejecute comandos arbitrarios | `git` se permite por subcomando (sin `git config` ni `git -c`) y `pnpm dlx`/`pnpm create` están vetados. Ver el límite de `pnpm` más abajo. |
| Que cambie los workflows | `--disallowedTools` sobre `.github/workflows/**` (el control real). Además, el prompt de la Action le indica a Claude que no puede modificarlos; no me apoyo en eso, porque la documentación de la App lista el permiso `workflows` entre los que pide. |
| Que publique en npm | `--disallowedTools` de `publish`/`release`. El trusted publisher de npm está atado a `release.yml`, así que un token OIDC emitido desde `claude.yml` no sirve. |
| Que fusione | `gh pr merge` denegado. El ruleset exige PR y `verify` de todos modos. |
| Que corra para siempre | `timeout-minutes: 60` y `--max-turns 100`. |

Lo que **no** se bloquea, y por qué:

- `Bash(pnpm:*)` permite ejecutar cualquier script del repo. Es inevitable para correr los tests, y
  una lista de scripts permitidos no sería una frontera real: el agente puede editar `package.json` y
  ejecutar el script. Por eso las fronteras que sí cuentan son quién puede disparar al agente, qué
  puede hacer su token (el ruleset exige PR y `verify`, y no hay bypass) y qué secretos hay en el job.
- El secret `CLAUDE_CODE_OAUTH_TOKEN` está en el entorno del job; es el único secret que ve (no
  se referencian el de Chromatic ni ningún token de npm). Si se filtrara, regenerarlo con
  `claude setup-token` y actualizar el secret.
- Los comentarios de terceros dentro de un issue **propio** sí llegan al contexto del agente. Antes de
  poner `claude` en un issue con comentarios ajenos, léelos.

## Consecuencias

- Cada ejecución consume de los límites de la suscripción (modelo `claude-opus-5-5`, hasta 100
  turnos y 60 minutos). Si pesa demasiado, bajar el modelo en `claude_args`.
- Claude no puede arreglar CI ni los workflows: esos issues los hace una persona (`needs-human`).
- El prompt integrado de la Action le dice a Claude que deje un enlace "Create a PR" y que no puede
  rebasar. `--append-system-prompt` lo corrige; si una versión nueva de la Action cambia ese
  comportamiento, hay que revisarlo con un issue piloto.
- Los SHA de las acciones están repetidos en `ci.yml`, `release.yml`, `chromatic.yml` y
  `preparar-entorno`. Dependabot cubre los cuatro (`.github/dependabot.yml`). Migrar `ci.yml` a la
  acción compuesta queda como mejora opcional.
- La concurrencia a nivel de job asume que el `if` se evalúa antes de entrar al grupo. Se comprueba
  en el piloto (un comentario sin `@claude` debe aparecer como *skipped*).
- Poder pedir ajustes en los PR del agente asume que `issue.user.login` de esos PR es `claude[bot]`.
  Se comprueba en el piloto; si `@claude` queda *skipped* en un PR del agente, esa es la causa.
- Los PR de Dependabot y los de forks quedan fuera: `@claude` ahí se descarta a propósito.

## Cómo sumar Codex (evaluado, no implementado)

1. **Integración nativa `@codex`** en comentarios de PR: el entorno se configura en chatgpt.com/codex
   (con `pnpm install --frozen-lockfile && pnpm --filter @chroma-yesid/tokens build` como script de
   preparación) y usa el plan de ChatGPT. No hay workflow. Falta comprobar con qué identidad se abre
   el PR y si esa identidad dispara `verify`.
2. **`openai/codex-action`**: ejecuta Codex en el runner con `OPENAI_API_KEY`. La rama, el commit, el
   `gh pr create` y los comentarios los programamos nosotros en un `codex.yml`, con una App propia o
   un PAT para que el PR dispare CI (con `GITHUB_TOKEN` quedaría `BLOCKED`).

El checklist para añadir un agente está en `docs/guia-paso-a-paso.md` (sección 10b).
