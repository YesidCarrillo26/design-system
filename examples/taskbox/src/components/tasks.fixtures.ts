import type { TaskData, TaskboxState } from '../store/taskboxSlice';

export const tasks: TaskData[] = [
  { id: '1', title: 'Escribir la guía', state: 'TASK_INBOX' },
  { id: '2', title: 'Revisar el PR', state: 'TASK_INBOX' },
  { id: '3', title: 'Publicar la versión', state: 'TASK_INBOX' },
];

export const withPinned: TaskData[] = [{ ...tasks[0]!, state: 'TASK_PINNED', pinnedAt: '2026-01-10T12:00:00Z' }, ...tasks.slice(1)];

/** Estado inicial del store para `parameters.store.preloadedState`. */
export const storeWith = (list: TaskData[], status: TaskboxState['status'] = 'succeeded') => ({
  taskbox: { tasks: list, status, error: null },
});

/** Respuesta de la API remota (formato de jsonplaceholder) equivalente a `tasks`. */
export const remoteTodos = tasks.map((task) => ({ id: Number(task.id), title: task.title, completed: false }));
