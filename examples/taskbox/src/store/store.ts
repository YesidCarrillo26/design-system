import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { taskboxReducer, type TaskData, type TaskboxState } from './taskboxSlice';

/**
 * Fábrica del store. Crear uno por prueba/story (en lugar de un singleton) evita que el estado
 * se filtre entre stories, y `preloadedState` reemplaza al "mock store" duplicado del curso.
 */
export function makeStore(preloadedState?: { taskbox: TaskboxState }) {
  return configureStore({ reducer: { taskbox: taskboxReducer }, preloadedState });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

/** Fijadas primero; archivadas al final. */
export function sortTasks(tasks: TaskData[]): TaskData[] {
  const rank = { TASK_PINNED: 0, TASK_INBOX: 1, TASK_ARCHIVED: 2 } as const;
  return [...tasks].sort((a, b) => rank[a.state] - rank[b.state]);
}
