import { tokensOfType } from './tokens';

/** Muestra cada color semántico en ambos temas, con su variable CSS y su valor. */
export function ColorSwatches() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {tokensOfType('color').map((token) => (
        <div key={token.name} className="overflow-hidden rounded-lg border border-border">
          <div className="flex h-16">
            {(['light', 'dark'] as const).map((theme) => (
              <div
                key={theme}
                data-theme={theme}
                className="flex flex-1 items-end p-2 text-caption"
                style={{
                  background: `var(--ds-${token.name})`,
                  color: `var(--ds-${token.name.includes('foreground') ? 'background' : 'foreground'})`,
                }}
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
      ))}
    </div>
  );
}
