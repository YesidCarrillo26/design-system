import { type DocToken, tokensOfType } from './tokens';

/** Familias por sección. Lo que no esté listado cae en "Otros", así un token nuevo nunca desaparece de la página. */
const sections = [
  { title: 'Superficies y texto', families: ['background', 'foreground', 'card', 'popover', 'muted', 'accent', 'secondary'] },
  { title: 'Marca', families: ['primary'] },
  { title: 'Estados', families: ['destructive', 'success', 'warning', 'info'] },
  { title: 'Controles y capas', families: ['border', 'input', 'ring', 'overlay'] },
];

/** `success-subtle-foreground` → `success`, `muted-foreground` → `muted`; `foreground` se queda igual. */
const family = (name: string) => name.replace(/-subtle-foreground$|-foreground$|-subtle$/, '');

/** El token con el que se lee mejor este: su texto si es un relleno, su relleno si es un texto. */
function pairedToken(name: string, names: Set<string>): string {
  if (name === 'foreground') return 'background';
  // `success-foreground` → `success`; `success-subtle-foreground` → `success-subtle`.
  if (name.endsWith('-foreground')) return name.replace(/-foreground$/, '');
  if (names.has(`${name}-foreground`)) return `${name}-foreground`;
  return 'foreground';
}

function Swatch({ token, names }: { token: DocToken; names: Set<string> }) {
  const paired = pairedToken(token.name, names);
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="flex h-16">
        {(['light', 'dark'] as const).map((theme) => (
          <div
            key={theme}
            data-theme={theme}
            className="flex flex-1 items-end p-2 text-caption"
            style={{ background: `var(--ds-${token.name})`, color: `var(--ds-${paired})` }}
          >
            {theme}
          </div>
        ))}
      </div>
      <div className="p-3">
        <p className="font-semibold text-body-sm">{token.name}</p>
        <p className="text-caption text-muted-foreground">{token.description}</p>
        <p className="font-mono text-caption text-muted-foreground">
          {token.values.light} · {token.values.dark}
        </p>
      </div>
    </div>
  );
}

/** Muestra cada color semántico en ambos temas, con su variable CSS y su valor, agrupado por familia. */
export function ColorSwatches() {
  const tokens = tokensOfType('color');
  const names = new Set(tokens.map((t) => t.name));
  const listed = new Set(sections.flatMap((s) => s.families));
  const groups = [
    ...sections.map((s) => ({ title: s.title, tokens: tokens.filter((t) => s.families.includes(family(t.name))) })),
    { title: 'Otros', tokens: tokens.filter((t) => !listed.has(family(t.name))) },
  ].filter((g) => g.tokens.length > 0);

  return (
    <div className="flex flex-col gap-8">
      {groups.map((group) => (
        <section key={group.title}>
          <h3 className="mb-3 font-semibold text-body-md">{group.title}</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {group.tokens.map((token) => (
              <Swatch key={token.name} token={token} names={names} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
