import { now } from '../lib/clock';
import { sortTasks, useAppDispatch, useAppSelector } from '../store/store';
import { updateTaskState } from '../store/taskboxSlice';
import { TaskListView } from './TaskListView';

/** La lista conectada a Redux: lee las tareas y traduce las acciones de la UI a acciones del store. */
export function TaskList() {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.taskbox.tasks);
  const loading = useAppSelector((state) => state.taskbox.status === 'loading');

  return (
    <TaskListView
      tasks={sortTasks(tasks)}
      loading={loading}
      onPinTask={(id) => {
        const task = tasks.find((t) => t.id === id);
        const pinned = task?.state === 'TASK_PINNED';
        dispatch(updateTaskState({ id, newState: pinned ? 'TASK_INBOX' : 'TASK_PINNED', at: now().toISOString() }));
      }}
      onArchiveTask={(id) => {
        const task = tasks.find((t) => t.id === id);
        dispatch(updateTaskState({ id, newState: task?.state === 'TASK_ARCHIVED' ? 'TASK_INBOX' : 'TASK_ARCHIVED' }));
      }}
    />
  );
}
