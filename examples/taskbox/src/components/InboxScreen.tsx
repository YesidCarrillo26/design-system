import { Button, EmptyState, PageHeader } from '@chroma-yesid/ui';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchTasks } from '../store/taskboxSlice';
import { TaskList } from './TaskList';

/** Pantalla: pide las tareas al montar y muestra el error con una forma de reintentar. */
export function InboxScreen() {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.taskbox.error);

  useEffect(() => {
    void dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <main>
      <PageHeader title="Bandeja de entrada" description="Tus tareas pendientes." />
      {error ? (
        <EmptyState icon="alert" title="Algo salió mal" description={error}>
          <Button variant="outline" onPress={() => void dispatch(fetchTasks())}>
            Reintentar
          </Button>
        </EmptyState>
      ) : (
        <TaskList />
      )}
    </main>
  );
}
