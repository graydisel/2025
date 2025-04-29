import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Filter, Todo, TodoState} from "./types.ts"

const initialState: TodoState = {
    todos: [],
    filter: 'all'
}

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action : PayloadAction<string>) => {
            const newTodo: Todo = {
                id: Date.now(),
                text: action.payload,
                completed: false,
            };
            state.todos.push(newTodo);
        },
        toggleTodo: (state, action: PayloadAction<number>) => {
            const todoItem = state.todos.find(todo => todo.id === action.payload);
            if (todoItem) {
                todoItem.completed = !todoItem.completed;
            }
        },
        deleteTodo: (state, action : PayloadAction<number>) => {
            state.todos = state.todos.filter((todo : Todo) => todo.id !== action.payload);
        },
        setFilter: (state, action: PayloadAction<Filter>) => {
            state.filter = action.payload;
        }
    }
})

export const { addTodo, toggleTodo, deleteTodo, setFilter } = todoSlice.actions;
export default todoSlice.reducer;