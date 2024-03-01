import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export interface Todo {
  id: string;
  title: string;
  description: string;
  isComplete: boolean;
}

export interface EditTask {
  title: string;
  description: string;
  id: string;
  isComplete: boolean
}

export interface TodosState {
  editTask: EditTask;
  isEdit: boolean;
  todos: Todo[];
}

const initialState: TodosState = {
  editTask: {
    id: '',
    title: '',
    description: '',
    isComplete: false
  },
  isEdit: false,
  todos: [],
};

export const fetchTodosAsync = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data: Todo[] = await response.json();
  return data;
});


const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ title: string; description: string }>) => {
      const newTask: Todo = {
        id: Date.now().toString(),
        title: action.payload.title,
        description: action.payload.description,
        isComplete: false,
      };
      state.todos.push(newTask);
      state.isEdit = false;
    },
    completeTask: (state, action: PayloadAction<string>) => {
      const updatedTodos: Todo[] = state.todos.map((task) => {
        if (task.id === action.payload) {
          return {
            ...task,
            isComplete: !task.isComplete
          }
        }
        return task
      })
      state.todos = updatedTodos
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((task) => task.id !== action.payload);
    },
    edit: (state, action: PayloadAction<{ id: string; title: string; description: string }>) => {
      const task = state.todos.find((t) => t.id === action.payload.id);
      if (task) {
        state.editTask.title = action.payload.title;
        state.editTask.description = action.payload.description;
        state.editTask.id = action.payload.id;
        state.isEdit = true;
      }
    },
    editTask: (state, action: PayloadAction<{ title: string; description: string }>) => {
      const { title, description } = action.payload;
      const taskIndex = state.todos.findIndex((task) => task.id === state.editTask.id);
      if (taskIndex !== -1) {
        state.todos[taskIndex].title = title;
        state.todos[taskIndex].description = description;
        state.isEdit = false;
        state.editTask = { id: '', title: '', description: '', isComplete: false };
      }
    },
    cancelEdit: (state) => {
      state.editTask = {
        id: '',
        title: '',
        description: '',
        isComplete: false
      };
      state.isEdit = false;
    },
    clear: (state) => {
      const newArray = state.todos.filter(task => !task.isComplete);
      state.todos = newArray
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodosAsync.fulfilled, (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    });
  },
});

export const { addTask, completeTask, deleteTask, edit, cancelEdit, editTask, clear } = todosSlice.actions;

export const selectTodos = (state: { todos: TodosState }) => state.todos.todos;
export const selectIsEdit = (state: { todos: TodosState }) => state.todos.isEdit;

export default todosSlice.reducer;
