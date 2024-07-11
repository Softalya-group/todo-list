// screens/TodoScreen.js
import React, { useContext, useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import SearchBar from "../components/SearchBar";

import TodoItem from '../components/TodoItem'; // doğru dosya yolunu kullanın

import { TodoContext } from "../store/TodoContext";
import TodoForm from "./TodoForm";

export default function TodoScreen() {
    const { todos, loadAllTodos, loadCompletedTodos, loadNotCompletedTodos } = useContext(TodoContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [filter, setFilter] = useState(null);

    useEffect(() => {
        if (filter === 'completed') {
            loadCompletedTodos();
        } else if (filter === 'notCompleted') {
            loadNotCompletedTodos();
        } else {
            loadAllTodos();
        }
    }, [filter]);

    const handleAddPress = () => {
        setSelectedItem(null);
        setModalVisible(true);
    };

    const handleItemPress = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const handleModalCancel = () => {
        setModalVisible(false);
        setSelectedItem(null);
    };

    const showAllTodos = () => setFilter(null);
    const showCompletedTodos = () => setFilter('completed');
    const showIncompleteTodos = () => setFilter('notCompleted');

    return (
        <View style={styles.container}>
            <SearchBar />
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={showAllTodos} style={styles.button}>
                    <Text style={styles.buttonText}>Hepsi</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={showCompletedTodos} style={styles.button}>
                    <Text style={styles.buttonText}>Yapılanlar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={showIncompleteTodos} style={styles.button}>
                    <Text style={styles.buttonText}>Yapılmayanlar</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={todos}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TodoItem item={item} onPress={() => handleItemPress(item)} />
                )}
                contentContainerStyle={styles.list}
            />
            <TodoForm
                visible={modalVisible}
                onCancel={handleModalCancel}
                item={selectedItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#191919',
        paddingTop: 50
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#282424',
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    list: {
        paddingHorizontal: 20
    },
});
