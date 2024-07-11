import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Ionicons, EvilIcons } from '@expo/vector-icons';
import TodoForm from "../screens/TodoForm";
import { TodoContext } from "../store/TodoContext"; // Import the TodoContext

export default function TodoItem({ item }) {
    const { deleteTodo, updateTodo } = useContext(TodoContext);
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleItemPress = () => {
        toggleModal();
    };

    const handleDelete = () => {
        deleteTodo(item.id);
    };

    const updateTask = (updatedItem) => {
        updateTodo(updatedItem.id, updatedItem);
        toggleModal();
    };

    const updateIsComplete = () => {
        const updatedItem = { ...item, completed: !item.completed };
        console.log('Sending Updated Item:', updatedItem); // Log the item being sent
        updateTodo(updatedItem.id, updatedItem);
    };

    useEffect(() => {
        console.log('Todo Item Updated:', item);
    }, [item.completed]);

    return (
        <View>
            <View style={styles.itemContainer}>
                <TouchableOpacity style={styles.completeButton} onPress={updateIsComplete}>
                    <Ionicons
                        name={item.completed ? "checkmark-circle" : "ellipse-outline"}
                        size={24}
                        color="#9a8b3f"
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleItemPress}>
                    <View style={styles.textContainer}>
                        <Text style={[styles.title,item.completed && styles.completedTitle]}>{item.title}</Text>
                        <Text
                            style={[
                                styles.description,
                                item.completed && styles.completedDescription
                            ]}
                        >
                            {item.description}
                        </Text>
                        <Text style={styles.date}>{new Date(item.created_at).toLocaleString()}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                    <EvilIcons name="trash" size={35} color="#e2e2f3" />
                </TouchableOpacity>
            </View>

            <Modal animationType="slide" visible={isModalVisible} transparent={true}>
                <TodoForm
                    visible={isModalVisible}
                    onCancel={toggleModal}
                    item={item}
                    onUpdateTask={updateTask}
                />
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#282424',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        marginBottom: 10,
    },
    textContainer: {
        flex: 1,
        paddingHorizontal: 10, // Add padding to the text container
        width : '90%',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5, // Add margin to separate title from description
    },
    completedTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textDecorationLine: 'line-through',
        color: 'gray'
    },
    description: {
        fontSize: 16,
        color: 'white',
        marginBottom: 5, // Add margin to separate description from date
    },
    completedDescription: {
        textDecorationLine: 'line-through',
        color: 'gray'
    },
    date: {
        fontSize: 14,
        color: 'gray',
    },
    deleteButton: {
        marginLeft: 'auto',
    },
    completeButton: {
        marginRight: 10
    }
});
