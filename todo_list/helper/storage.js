// helpers/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const TODOS_KEY = 'todos';

export async function getTodosFromStorage() {
    try {
        const jsonValue = await AsyncStorage.getItem(TODOS_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error('Failed to load todos from storage', e);
        return [];
    }
}

export async function storeTodosToStorage(todos) {
    try {
        const jsonValue = JSON.stringify(todos);
        await AsyncStorage.setItem(TODOS_KEY, jsonValue);
    } catch (e) {
        console.error('Failed to save todos to storage', e);
    }
}
