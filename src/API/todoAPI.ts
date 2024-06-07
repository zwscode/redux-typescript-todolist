import {Todo} from '../type/todo';
import { SERVER_PORT } from '../type/defines';

const baseURL: string = "http://localhost:" + SERVER_PORT +  "/post";

export const getTodos = (token: string, userid: string): Promise<Todo[]> => {
    return fetch(baseURL + "/user/" + userid, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
    }).then((res) => res.json());
};

export const createTodo = (token: string, newTodo: Omit<Todo, 'id'>): Promise<Todo> => {
    return fetch(baseURL + "/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
        body: JSON.stringify(newTodo),
    }).then((res) => res.json());
};

export const updateTodo = (token: string, id: string, partialTodo: Partial<Todo>): Promise<Todo> => {
    return fetch(`${baseURL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
        },
        body: JSON.stringify(partialTodo),
    }).then((res) => res.json());
};

export const deleteTodo = (token: string, id: string): Promise<void> => {
    return fetch(`${baseURL}/${id}`, 
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
        })
        .then((res) => res.json());
};