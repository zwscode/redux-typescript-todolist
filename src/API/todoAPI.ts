import {Todo} from '../type/todo';

const baseURL: string = "http://localhost:3000/todos";

export const getTodos = (): Promise<Todo[]> => {
    return fetch(baseURL)
        .then((res) => res.json());
};

export const createTodo = (newTodo: Omit<Todo, 'id'>): Promise<Todo> => {
    return fetch(baseURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
    }).then((res) => res.json());
};

export const updateTodo = (id: string, partialTodo: Partial<Todo>): Promise<Todo> => {
    return fetch(`${baseURL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(partialTodo),
    }).then((res) => res.json());
};

export const deleteTodo = (id: string): Promise<void> => {
    return fetch(`${baseURL}/${id}`, { method: "DELETE" })
        .then((res) => res.json());
};