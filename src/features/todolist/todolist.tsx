import "./todolist.css"

import React, { useState, useEffect } from "react";
import "./todolist.css";
import {
    getTodosAsync,
    createTodoAsync,
    updateTodoAsync,
    deleteTodoAsync,
	selectTodos,
} from "./todoSlice";

import { selectUser } from "../user/userSlice";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { RootState } from "../../app/store"; // Assuming you have a RootState type defined

import {Todo} from "../../type/todo";
import { Route, Navigate } from 'react-router-dom';

const Todolist: React.FC = () => {
    const dispatch = useAppDispatch();
    const todos = useAppSelector(selectTodos);
    const userInfo = useAppSelector(selectUser);
    const [newTodo, setNewTodo] = useState<string>("");
    const [editId, setEditId] = useState<string | null>(null);
    const [editInput, setEditInput] = useState<string>("");

    useEffect(() => {
        dispatch(getTodosAsync({token: userInfo.token, userid: userInfo.userid}));
    }, [dispatch]);

    const handleCreateTodo = () => {
        dispatch(createTodoAsync({token: userInfo.token, payload: { content: newTodo }}));
        setNewTodo("");
    };

    const handleEdit = (id: string) => {
        if (editId === id) {
            setEditInput("");
            setEditId(null);
            dispatch(updateTodoAsync({token: userInfo.token, payload: { id: id, content: editInput }}));
        } else {
            setEditId(id);
            const todo = todos.find((todo) => todo.id === id);
            if (todo) {
                setEditInput(todo.content);
            }
        }
    };

    const handleDelete = (id: string) => {
        dispatch(deleteTodoAsync({ token: userInfo.token, id: id }));
    };

	return (
        <div className="todo-container">
            <div className="form-container">
                <input
                    value={newTodo}
                    onChange={(event) => {
                        setNewTodo(event.target.value);
                    }}
                />
                <button onClick={handleCreateTodo}>submit</button>
            </div>

            <div className="list-container">
                <ul>
                    {todos.map((item) => {
                        const isEdit = item.id === editId;
                        return (
                            <li key={item.id}>
                                {/* conditional rendering */}
                                {isEdit ? (
                                    <input
                                        value={editInput}
                                        onChange={(e) =>
                                            setEditInput(e.target.value)
                                        }
                                    />
                                ) : (
                                    <span>{item.content}</span>
                                )}

                                {/* replace span */}
                                <div className="todo-action">
                                    <button onClick={() => handleEdit(item.id!)}>
                                        {editId === item.id ? "save" : "edit"}
                                    </button>
                                    <button onClick={() => {
                                                handleDelete(item.id!);
                                            }}
                                    >
                                        delete
                                    </button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default Todolist;