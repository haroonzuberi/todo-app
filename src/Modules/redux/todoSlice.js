// redux/todoSlice.js
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  todos: [
    { id: 1, title: 'Learn React',description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.", checkboxDone: false, completed:false},
    { id: 2, title: 'Redux Toolkit',description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.", checkboxDone: false,completed:false },
    { id: 3, title: 'Build Todo App', description: 'A simple todo application built with React and Redux Toolkit.', checkboxDone: false,completed:false },
  ],
};

/**
 * Redux slice for managing todo state.
 *
 * This slice defines reducers for adding, toggling check/uncheck, editing, and deleting todo items.
 * 
 * @constant {Object} todoSlice
 * @memberof ReduxSlices
 * @property {string} name - The name of the slice.
 * @property {Object} initialState - The initial state of the slice.
 * @property {Function} reducers.addTodo - Reducer function for adding a new todo item.
 * @property {Function} reducers.toggleCheckTodo - Reducer function for toggling a todo item's completion status to checked.
 * @property {Function} reducers.toggleUnCheckTodo - Reducer function for toggling a todo item's completion status to unchecked.
 * @property {Function} reducers.editTodo - Reducer function for editing a todo item.
 * @property {Function} reducers.deleteTodo - Reducer function for deleting a todo item.
 * @example
 * // Usage:
 * import { createSlice } from '@reduxjs/toolkit';
 * 
 * const initialState = {
 *   todos: []
 * };
 * 
 * const todoSlice = createSlice({
 *   name: 'todo',
 *   initialState,
 *   reducers: {
 *     addTodo: (state, action) => {
 *       state.todos.unshift(action.payload);
 *     },
 *     // Other reducer functions...
 *   },
 * });
 * 
 * export const { addTodo, toggleCheckTodo, toggleUnCheckTodo, editTodo, deleteTodo } = todoSlice.actions;
 * export default todoSlice.reducer;
 */
const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.unshift(action.payload);
    },
    toggleCheckTodo: (state, action) => {
      // Reducer function to toggle a todo item's completion status to checked
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.checkboxDone = true;
        todo.completed = true;
        state.todos = state.todos.sort((a, b) => (a.checkboxDone === b.checkboxDone ? 0 : a.checkboxDone ? 1 : -1));
      }
    },
    toggleUnCheckTodo: (state, action) => {
      // Reducer function to toggle a todo item's completion status to unchecked
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
      // Reducer function for editing a todo item
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title;
        todo.description = action.payload.description;
      }
    },
    deleteTodo: (state, action) => {
      // Reducer function for deleting a todo item
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, toggleCheckTodo,toggleUnCheckTodo, editTodo,deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
