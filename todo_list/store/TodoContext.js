import React, { createContext, useReducer, useEffect } from 'react';
import { fetchTodos, addTodo, updateTodoHttp, deleteTodoHttp, fetchCompletedTodos, fetchNotCompletedTodos, searchTodos as searchTodosApi } from "../helper/http";

export const TodoContext = createContext();

const todoReducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            return action.payload;
        case 'ADD':
            return [action.payload, ...state];
        case 'UPDATE':
            return state.map(todo => todo.id === action.payload.id ? action.payload : todo);
        case 'DELETE':
            return state.filter(todo => todo.id !== action.payload);
        default:
            return state;
    }
};

export const TodoContextProvider = ({ children }) => {
    const [todos, dispatch] = useReducer(todoReducer, []);

    useEffect(() => {
        async function loadTodos() {
            try {
                const todosData = await fetchTodos();
                dispatch({ type: 'SET', payload: todosData });
            } catch (error) {
                console.error('Failed to load todos:', error);
            }
        }
        loadTodos();
    }, []);

    const addTodoItem = async (todoData) => {
        try {
            const newTodo = await addTodo(todoData);
            dispatch({ type: 'ADD', payload: newTodo });
        } catch (error) {
            console.error('Failed to add todo:', error);
        }
    };

    const updateTodoItem = async (id, todoData) => {
        try {
            const updatedTodo = await updateTodoHttp(id, todoData);
            dispatch({ type: 'UPDATE', payload: updatedTodo });
        } catch (error) {
            console.error('Failed to update todo:', error);
        }
    };

    const deleteTodoItem = async (id) => {
        try {
            await deleteTodoHttp(id);
            dispatch({ type: 'DELETE', payload: id });
        } catch (error) {
            console.error('Failed to delete todo:', error);
        }
    };

    const loadCompletedTodos = async () => {
        try {
            const completedTodos = await fetchCompletedTodos();
            dispatch({ type: 'SET', payload: completedTodos });
        } catch (error) {
            console.error('Failed to load completed todos:', error);
        }
    };

    const loadNotCompletedTodos = async () => {
        try {
            const notCompletedTodos = await fetchNotCompletedTodos();
            dispatch({ type: 'SET', payload: notCompletedTodos });
        } catch (error) {
            console.error('Failed to load not completed todos:', error);
        }
    };
    async function loadAllTodos() {
        try {
            const todosData = await fetchTodos();
            dispatch({ type: 'SET', payload: todosData });
        } catch (error) {
            console.error('Failed to load todos:', error);
        }
    }
    const searchTodos = async (query) => {
        try {
            const searchResults = await searchTodosApi(query);
            dispatch({ type: 'SET', payload: searchResults });
        } catch (error) {
            console.error('Failed to search todos:', error);
        }
    };

    const value = {
        todos,
        addTodo: addTodoItem,
        updateTodo: updateTodoItem,
        deleteTodo: deleteTodoItem,
        loadCompletedTodos,
        loadNotCompletedTodos,
        loadAllTodos,
        searchTodos,
    };

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    );
};
