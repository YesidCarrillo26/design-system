import { Pressable, Text, View } from 'react-native';
import { Icon } from '../Icon';
import type { ListItemBaseProps } from './ListItem.types';
import { useInListItemGroup } from './ListItemGroupContext';
import { listItemStyles } from './listItem.variants';

export type ListItemProps = ListItemBaseProps;

/** Fila de lista. Con `onPress` es un botón de ancho completo; sin él, un contenedor estático. */
export function ListItem({ title, description, leading, trailing, value, showChevron = false, destructive = false, onPress, disabled = false, className }: ListItemProps) {
  const grouped = useInListItemGroup();
  const s = listItemStyles({ divider: !grouped, destructive, disabled });
  const content = (
    <>
      {leading}
      <View className={s.body()}>
        <Text className={s.title()}>{title}</Text>
        {description ? <Text className={s.description()}>{description}</Text> : null}
      </View>
      {trailing}
      {value ? <Text className={s.value()}>{value}</Text> : null}
      {showChevron ? <Icon name="chevron-right" size="sm" tone="muted" /> : null}
    </>
  );
  if (onPress === undefined) return <View className={s.root({ className })}>{content}</View>;
  return (
    <Pressable role="button" disabled={disabled} onPress={onPress} className={`${s.root({ className })} active:bg-accent`}>
      {content}
    </Pressable>
  );
}
