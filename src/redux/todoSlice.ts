import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../types/todo";

interface TodoState {
  todos: Todo[];
  history: {
    past: Todo[][];
    future: Todo[][];
  };
  darkMode: boolean;
}

const initialState: TodoState = {
  todos: [],
  history: {
    past: [],
    future: [],
  },
  darkMode: false,
};

// Helper function to save current state to history
const saveToHistory = (state: TodoState) => {
  state.history.past.push(JSON.parse(JSON.stringify(state.todos)));
  state.history.future = [];
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setInitialTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      // Save current state to history
      saveToHistory(state);

      // Add new todo
      state.todos.push(action.payload);
    },
    toggleComplete: (state, action: PayloadAction<string>) => {
      // Save current state to history
      saveToHistory(state);

      // Toggle todo completion
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      // This is just an alias for toggleComplete
      // Save current state to history
      saveToHistory(state);

      // Toggle todo completion
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      // Save current state to history
      saveToHistory(state);

      // Filter out the deleted todo
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (
      state,
      action: PayloadAction<Partial<Todo> & { id: string }>
    ) => {
      // Save current state to history
      saveToHistory(state);

      // Update todo
      const { id, ...todoProperties } = action.payload;
      const todoIndex = state.todos.findIndex((todo) => todo.id === id);
      if (todoIndex !== -1) {
        state.todos[todoIndex] = {
          ...state.todos[todoIndex],
          ...todoProperties,
        };
      }
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    undo: (state) => {
      if (state.history.past.length > 0) {
        // Get the last state from past
        const previous = state.history.past.pop();

        // Save current state to future
        state.history.future.push(JSON.parse(JSON.stringify(state.todos)));

        // Set todos to previous state
        if (previous) {
          state.todos = previous;
        }
      }
    },
    redo: (state) => {
      if (state.history.future.length > 0) {
        // Get the next state from future
        const next = state.history.future.pop();

        // Save current state to past
        state.history.past.push(JSON.parse(JSON.stringify(state.todos)));

        // Set todos to next state
        if (next) {
          state.todos = next;
        }
      }
    },
  },
});

export const {
  setInitialTodos,
  addTodo,
  toggleComplete,
  toggleTodo,
  deleteTodo,
  updateTodo,
  setDarkMode,
  undo,
  redo,
} = todoSlice.actions;

export default todoSlice.reducer;
