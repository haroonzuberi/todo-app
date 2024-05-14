// redux/todoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [
    { id: 1, title: 'Learn React',description:"", checkboxDone: false, completed:false},
    { id: 2, title: 'Redux Toolkit',description:"", checkboxDone: false,completed:false },
    { id: 3, title: 'Build Todo App', description: 'A simple todo application built with React and Redux Toolkit.', checkboxDone: false,completed:false },
  ],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.unshift(action.payload);
    },
    toggleCheckTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.checkboxDone = true;
        todo.completed =true;
        state.todos = state.todos.sort((a, b) => (a.checkboxDone === b.checkboxDone ? 0 : a.checkboxDone ? 1 : -1));
      }
    },
    toggleUnCheckTodo: (state, action) => {
      const todoIndex = state.todos.findIndex(todo => todo.id === action.payload);
      if (todoIndex !== -1) {
        const todo = state.todos[todoIndex];
        todo.checkboxDone = false;
        todo.completed = false;
        state.todos.splice(todoIndex, 1); // Remove the todo from its current position
        state.todos.unshift(todo); // Add the todo to the beginning of the array
      }
    },    
    editTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title;
         
      }
    },
    deleteTodo: (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      },
  },
});

export const { addTodo, toggleCheckTodo,toggleUnCheckTodo, editTodo,deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
