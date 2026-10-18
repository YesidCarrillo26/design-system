import { EmptyState, Spinner, Stack } from '@chroma-yesid/ui';
import type { TaskData } from '../store/taskboxSlice';
import { Task } from './Task';

export interface TaskListViewProps {
  tasks: TaskData[];
  loading?: boolean;
  onPinTask: (id: string) => void;
  onArchiveTask: (id: string) => void;
}

/** La lista, sin Redux: carga, vacío o filas. Es lo que se prueba "en aislamiento". */
export function TaskListView({ tasks, loading = false, onPinTask, onArchiveTask }: TaskListViewProps) {
  if (loading) {
    return (
      <Stack align="center" className="py-10">
        <Spinner label="Cargando tareas" />
      </Stack>
    );
  }
  if (tasks.length === 0) {
    return <EmptyState icon="check" title="No tienes tareas" description="Cuando agregues una, aparecerá aquí." />;
  }
  return (
    <div role="list">
      {tasks.map((task) => (
        <div role="listitem" key={task.id}>
          <Task task={task} onPinTask={onPinTask} onArchiveTask={onArchiveTask} />
        </div>
      ))}
    </div>
  );
}
