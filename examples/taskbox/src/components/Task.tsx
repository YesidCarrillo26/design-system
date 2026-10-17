import { IconButton, ListItem } from '@yesid/ui';
import type { TaskData } from '../store/taskboxSlice';

export interface TaskProps {
  task: TaskData;
  onPinTask: (id: string) => void;
  onArchiveTask: (id: string) => void;
}

const dateFormat = new Intl.DateTimeFormat('es', { dateStyle: 'medium', timeZone: 'UTC' });

/** Una tarea. Presentacional: no conoce Redux, solo recibe datos y callbacks. */
export function Task({ task, onPinTask, onArchiveTask }: TaskProps) {
  const archived = task.state === 'TASK_ARCHIVED';
  const pinned = task.state === 'TASK_PINNED';
  return (
    <ListItem
      title={task.title}
      description={pinned && task.pinnedAt ? `Fijada el ${dateFormat.format(new Date(task.pinnedAt))}` : undefined}
      leading={
        <IconButton
          icon="check"
          variant={archived ? 'primary' : 'outline'}
          label={`${archived ? 'Restaurar' : 'Archivar'}: ${task.title}`}
          onPress={() => onArchiveTask(task.id)}
        />
      }
      trailing={
        <IconButton
          icon="star"
          variant={pinned ? 'primary' : 'ghost'}
          label={`${pinned ? 'Quitar fijado' : 'Fijar'}: ${task.title}`}
          disabled={archived}
          onPress={() => onPinTask(task.id)}
        />
      }
    />
  );
}
