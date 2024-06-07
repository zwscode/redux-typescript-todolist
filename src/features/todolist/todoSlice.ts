import {Todo} from '../../type/todo';
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../../API/todoAPI";
import { RootState, AppThunk } from '../../app/store';
import { selectUser } from '../login/loginSlice';
import { useAppSelector } from '../../app/hooks';

interface TodoState {
    todos: Todo[];
}



const getTodosAsync = createAsyncThunk<Todo[], {token:string, userid:string}>(
    "todos/getTodos",
    async ({token, userid}) => {
        const response = await getTodos(token, userid);
        return response;
    }
);

const createTodoAsync = createAsyncThunk<Todo, {token: string, payload: Omit<Todo, 'id'>}>(
    "todos/createTodo",
    async (param) => {
        const response = await createTodo(param.token, param.payload);
        return response;
    }
);

const updateTodoAsync = createAsyncThunk<Todo, {token: string, payload: { id: string; content: string }}>(
    "todos/updateTodo",
    async (param) => {
        const response = await updateTodo(param.token, param.payload.id, { content: param.payload.content });
        return response;
    }
);

const deleteTodoAsync = createAsyncThunk<string, { token: string, id: string }>(
    "todos/deleteTodo",
    async ({token, id}) => {
        await deleteTodo(token, id);
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