import {Todo} from '../../type/todo';
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../../API/todoAPI";
import { RootState, AppThunk } from '../../app/store';

interface TodoState {
    todos: Todo[];
}

const getTodosAsync = createAsyncThunk<Todo[]>(
    "todos/getTodos",
    async () => {
        const response = await getTodos();
        return response;
    }
);

const createTodoAsync = createAsyncThunk<Todo, Omit<Todo, 'id'>>(
    "todos/createTodo",
    async (payload) => {
        const response = await createTodo(payload);
        return response;
    }
);

const updateTodoAsync = createAsyncThunk<Todo, { id: string; content: string }>(
    "todos/updateTodo",
    async (payload) => {
        const response = await updateTodo(payload.id, { content: payload.content });
        return response;
    }
);

const deleteTodoAsync = createAsyncThunk<string, { id: string }>(
    "todos/deleteTodo",
    async (payload) => {
        const id = payload.id;
        await deleteTodo(id);
        return id;
    }
);

const initialState: TodoState = {
    todos: [],
};

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTodosAsync.fulfilled, (state, action: PayloadAction<Todo[]>) => {
                state.todos = action.payload;
            })
            .addCase(createTodoAsync.fulfilled, (state, action: PayloadAction<Todo>) => {
                state.todos.push(action.payload);
            })
            .addCase(updateTodoAsync.fulfilled, (state, action: PayloadAction<Todo>) => {
                const index = state.todos.findIndex(
                    (todo) => todo.id === action.payload.id
                );
                if (index !== -1) {
                    state.todos[index] = action.payload;
                }
            })
            .addCase(deleteTodoAsync.fulfilled, (state, action: PayloadAction<string>) => {
                const index = state.todos.findIndex(
                    (todo) => todo.id === action.payload
                );
                if (index !== -1) {
                    state.todos.splice(index, 1);
                }
            });
    },
});

export { getTodosAsync, createTodoAsync, updateTodoAsync, deleteTodoAsync };

export const selectTodos = (state: RootState) => state.todos.todos;

export default todoSlice.reducer;