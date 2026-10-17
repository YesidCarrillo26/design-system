import { type DocToken, tokensOfType } from './tokens';

/** Tabla genérica de tokens: nombre, variable CSS y valor(es). */
export function TokenTable({ type }: { type: DocToken['type'] }) {
  const rows = tokensOfType(type);
  return (
    <table className="w-full border-collapse text-left text-body-sm">
      <thead>
        <tr className="border-b border-border text-muted-foreground">
          <th className="py-2 pr-4 font-medium">Token</th>
          <th className="py-2 pr-4 font-medium">Variable</th>
          <th className="py-2 font-medium">Valor</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.name} className="border-b border-border align-top">
            <td className="py-2 pr-4 font-semibold">{row.name}</td>
            <td className="py-2 pr-4 font-mono text-caption">{row.cssVar}</td>
            <td className="py-2 font-mono text-caption">
              {Object.entries(row.values).map(([k, v]) => (
                <div key={k}>{k === 'all' ? v : `${k}: ${v}`}</div>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
