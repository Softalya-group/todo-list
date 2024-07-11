import axios from 'axios';

const BASE_URL = 'http://10.0.0.236:8000/api/todos/';

export async function fetchTodos() {
    const response = await axios.get(BASE_URL);
    return response.data;
}

export async function addTodo(todoData) {
    const response = await axios.post(`${BASE_URL}create/`, todoData);
    return response.data;
}

export async function updateTodoHttp(id, todoData) {
    const response = await axios.put(`${BASE_URL}update/${id}/`, todoData);
    return response.data;
}

export async function deleteTodoHttp(id) {
    const response = await axios.delete(`${BASE_URL}delete/${id}/`);
    return response.data;
}

export async function fetchCompletedTodos() {
    const response = await axios.get(`${BASE_URL}?completed=true`);
    return response.data;
}

export async function fetchNotCompletedTodos() {
    const response = await axios.get(`${BASE_URL}?completed=false`);
    return response.data;
}

export async function searchTodos(query) {
    const response = await axios.get(`${BASE_URL}?search=${query}`);
    return response.data;
}
