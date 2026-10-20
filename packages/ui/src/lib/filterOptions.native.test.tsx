import { filterOptions, matchesQuery, normalizeText } from './filterOptions';

describe('filterOptions', () => {
  test('ignora acentos y mayúsculas', () => {
    expect(normalizeText('  Bogotá ')).toBe('bogota');
    expect(matchesQuery('Medellín', 'MEDELLIN')).toBe(true);
    expect(matchesQuery('Cúcuta', 'cuc')).toBe(true);
  });

  test('una consulta vacía devuelve todas las opciones', () => {
    const options = [{ label: 'A' }, { label: 'B' }];

    expect(filterOptions(options, '')).toEqual(options);
    expect(filterOptions(options, '   ')).toEqual(options);
  });

  test('devuelve solo las que coinciden, conservando el orden', () => {
    const options = [{ label: 'Cali' }, { label: 'Cartagena' }, { label: 'Bogotá' }];

    expect(filterOptions(options, 'ca')).toEqual([{ label: 'Cali' }, { label: 'Cartagena' }]);
    expect(filterOptions(options, 'xyz')).toEqual([]);
  });
});
