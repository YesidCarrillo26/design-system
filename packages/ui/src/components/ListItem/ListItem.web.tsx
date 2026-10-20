import { tv } from '../../lib/tv';
import { Icon } from '../Icon';
import type { ListItemBaseProps } from './ListItem.types';
import { useInListItemGroup } from './ListItemGroupContext';
import { listItemStyles } from './listItem.variants';

const listItemWebStyles = tv({
  extend: listItemStyles,
  variants: {
    interactive: {
      true: {
        root: [
          'w-full cursor-pointer text-left transition-colors hover:bg-accent',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
          'disabled:pointer-events-none',
        ],
      },
      false: {},
    },
  },
});

export type ListItemProps = ListItemBaseProps;

/** Fila de lista. Con `onPress` es un `<button>` de ancho completo; sin él, un contenedor estático. */
export function ListItem({ title, description, leading, trailing, value, showChevron = false, destructive = false, onPress, disabled = false, className }: ListItemProps) {
  const grouped = useInListItemGroup();
  const interactive = onPress !== undefined;
  const s = listItemWebStyles({ divider: !grouped, destructive, disabled, interactive });
  const content = (
    <>
      {leading}
      <span className={`flex ${s.body()}`}>
        <span className={s.title()}>{title}</span>
        {description ? <span className={s.description()}>{description}</span> : null}
      </span>
      {trailing}
      {value ? <span className={s.value()}>{value}</span> : null}
      {showChevron ? <Icon name="chevron-right" size="sm" tone="muted" /> : null}
    </>
  );
  if (!interactive) return <div className={`flex ${s.root({ className })}`}>{content}</div>;
  return (
    <button type="button" disabled={disabled} onClick={onPress} className={`flex ${s.root({ className })}`}>
      {content}
    </button>
  );
}
