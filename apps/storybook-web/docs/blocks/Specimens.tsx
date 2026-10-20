import { useState } from 'react';
import { tokensOfType } from './tokens';

// Clases literales: Tailwind escanea el código y no ve nombres armados con plantillas.
const textClass: Record<string, string> = {
  caption: 'text-caption',
  overline: 'text-overline font-medium uppercase',
  'body-sm': 'text-body-sm',
  'body-md': 'text-body-md',
  'body-lg': 'text-body-lg',
  'heading-sm': 'text-heading-sm font-semibold',
  'heading-md': 'text-heading-md font-semibold',
  'heading-lg': 'text-heading-lg font-semibold',
  'heading-xl': 'text-heading-xl font-semibold',
  display: 'text-display font-semibold',
  title: 'text-title font-semibold',
};

export function TypeSpecimens() {
  return (
    <div className="flex flex-col gap-4">
      {tokensOfType('text').map((t) => (
        <div key={t.name} className="flex items-baseline gap-4 border-b border-border pb-3">
          <code className="w-28 shrink-0 text-caption text-muted-foreground">{t.name}</code>
          <span className={textClass[t.name]}>El veloz murciélago hindú comía feliz</span>
          <code className="ml-auto shrink-0 text-caption text-muted-foreground">
            {t.values.all}
            {t.values.letterSpacing ? ` · ${t.values.letterSpacing}` : ''}
          </code>
        </div>
      ))}
    </div>
  );
}

const weightClass: Record<string, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

export function FontWeightSpecimens() {
  return (
    <div className="flex flex-col gap-3">
      {tokensOfType('font-weight').map((t) => (
        <div key={t.name} className="flex items-baseline gap-4 border-b border-border pb-3">
          <code className="w-28 shrink-0 text-caption text-muted-foreground">{t.name}</code>
          <span className={`text-body-lg ${weightClass[t.name]}`}>El veloz murciélago hindú comía feliz</span>
          <code className="ml-auto text-caption text-muted-foreground">{t.values.all}</code>
        </div>
      ))}
    </div>
  );
}

const radiusClass: Record<string, string> = { sm: 'rounded-sm', md: 'rounded-md', lg: 'rounded-lg', xl: 'rounded-xl' };

export function RadiusSpecimens() {
  return (
    <div className="flex flex-wrap gap-6">
      {tokensOfType('radius').map((t) => (
        <div key={t.name} className="flex flex-col items-center gap-2">
          <div className={`size-20 border border-border bg-secondary ${radiusClass[t.name]}`} />
          <code className="text-caption">{t.name} · {t.values.all}</code>
        </div>
      ))}
    </div>
  );
}

const shadowClass: Record<string, string> = { xs: 'shadow-xs', sm: 'shadow-sm', md: 'shadow-md', lg: 'shadow-lg' };

export function ShadowSpecimens() {
  return (
    <div className="flex flex-wrap gap-8 p-4">
      {tokensOfType('shadow').map((t) => (
        <div key={t.name} className="flex flex-col items-center gap-2">
          <div className={`size-24 rounded-lg bg-background ${shadowClass[t.name]}`} />
          <code className="text-caption">{t.name}</code>
          <span className="text-caption text-muted-foreground">{t.description}</span>
        </div>
      ))}
    </div>
  );
}

const spacingScale = [
  { n: '1', cls: 'w-1' }, { n: '2', cls: 'w-2' }, { n: '3', cls: 'w-3' }, { n: '4', cls: 'w-4' },
  { n: '6', cls: 'w-6' }, { n: '8', cls: 'w-8' }, { n: '12', cls: 'w-12' }, { n: '16', cls: 'w-16' },
];

export function SpacingScale() {
  return (
    <div className="flex flex-col gap-2">
      {spacingScale.map(({ n, cls }) => (
        <div key={n} className="flex items-center gap-4">
          <code className="w-20 text-caption text-muted-foreground">{n} · {Number(n) * 4}px</code>
          <div className={`h-4 bg-primary ${cls}`} />
        </div>
      ))}
    </div>
  );
}

/** Demo interactiva: la caja se mueve usando la duración y la curva del token elegido. */
export function MotionDemo() {
  const [moved, setMoved] = useState(false);
  const durations = tokensOfType('duration');
  return (
    <div className="flex flex-col gap-4">
      <button type="button" className="w-fit rounded-md border border-border px-3 py-1 text-body-sm" onClick={() => setMoved((m) => !m)}>
        Mover
      </button>
      {durations.map((d) => (
        <div key={d.name} className="flex items-center gap-4">
          <code className="w-28 text-caption text-muted-foreground">{d.name} · {d.values.all}</code>
          <div className="h-8 flex-1 rounded-md bg-secondary p-1">
            <div
              className="size-6 rounded-sm bg-primary"
              style={{
                transform: moved ? 'translateX(16rem)' : 'none',
                transitionProperty: 'transform',
                transitionDuration: `var(${d.cssVar})`,
                transitionTimingFunction: 'var(--ease-standard)',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
