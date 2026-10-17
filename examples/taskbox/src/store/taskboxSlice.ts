import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type TaskState = 'TASK_INBOX' | 'TASK_PINNED' | 'TASK_ARCHIVED';

export interface TaskData {
  id: string;
  title: string;
  state: TaskState;
  /** Cuándo se fijó (ISO). Lo calcula quien despacha, para que el reducer sea puro. */
  pinnedAt?: string;
}

export interface TaskboxState {
  tasks: TaskData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TaskboxState = { tasks: [], status: 'idle', error: null };

export const TASKS_URL = 'https://jsonplaceholder.typicode.com/todos';

interface RemoteTodo {
  id: number;
  title: string;
  completed: boolean;
}

export const fetchTasks = createAsyncThunk('taskbox/fetchTasks', async (): Promise<TaskData[]> => {
  const response = await fetch(`${TASKS_URL}?userId=1&_limit=5`);
  if (!response.ok) throw new Error(`No se pudieron cargar las tareas (error ${response.status}).`);
  const todos = (await response.json()) as RemoteTodo[];
  return todos.map((todo) => ({
    id: String(todo.id),
    title: todo.title,
    state: todo.completed ? 'TASK_ARCHIVED' : 'TASK_INBOX',
  }));
});

const slice = createSlice({
  name: 'taskbox',
  initialState,
  reducers: {
    updateTaskState: (state, action: PayloadAction<{ id: string; newState: TaskState; at?: string }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (!task) return;
      task.state = action.payload.newState;
      task.pinnedAt = action.payload.newState === 'TASK_PINNED' ? action.payload.at : undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Error desconocido.';
      });
  },
});

export const { updateTaskState } = slice.actions;
export const taskboxReducer = slice.reducer;
