import tokensJson from '@yesid/tokens/tokens.json';

export interface DocToken {
  name: string;
  type: 'color' | 'radius' | 'text' | 'shadow' | 'duration' | 'ease' | 'breakpoint' | 'font';
  cssVar: string;
  values: Record<string, string | undefined>;
  description?: string;
}

const all = tokensJson as DocToken[];

export const tokensOfType = (type: DocToken['type']) => all.filter((t) => t.type === type);
