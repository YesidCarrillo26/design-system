/** Minúsculas y sin acentos: "Bogotá" coincide con "bogota" y "BOGOTA". */
export function normalizeText(text: string): string {
  return text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim();
}

/** `true` si `label` contiene `query` (ignorando acentos y mayúsculas). Una consulta vacía coincide con todo. */
export function matchesQuery(label: string, query: string): boolean {
  const needle = normalizeText(query);
  return needle === '' || normalizeText(label).includes(needle);
}

/** Opciones cuyo `label` coincide con `query`. La comparten el Combobox web y el native. */
export function filterOptions<T extends { label: string }>(options: T[], query: string): T[] {
  return options.filter((option) => matchesQuery(option.label, query));
}
