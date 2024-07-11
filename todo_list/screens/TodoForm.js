import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { TodoContext } from "../store/TodoContext";

export default function TodoForm({
                                     visible = false,
                                     onCancel = () => {},
                                     item = null,
                                     onUpdateTask
                                 }) {
    const { addTodo, updateTodo } = useContext(TodoContext);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const [inputs, setInputs] = useState({
        title: { value: '', isValid: true },
        description: { value: '', isValid: true },
        date: { value: null, isValid: true },
        time: { value: null, isValid: true },
    });

    useEffect(() => {
        if (item && visible) {
            setInputs({
                title: { value: item.title, isValid: true },
                description: { value: item.description, isValid: true },
                date: { value: new Date(item.date), isValid: true },
                time: { value: new Date(item.date), isValid: true },
            });
        } else if (!visible) {
            // Modal kapandığında inputları sıfırla
            setInputs({
                title: { value: '', isValid: true },
                description: { value: '', isValid: true },
                date: { value: null, isValid: true },
                time: { value: null, isValid: true },
            });
        }
    }, [item, visible]);

    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);
    const showTimePicker = () => setTimePickerVisibility(true);
    const hideTimePicker = () => setTimePickerVisibility(false);

    const handleConfirmDate = (date) => {
        setInputs(prevInputs => ({
            ...prevInputs,
            date: { value: date, isValid: true }
        }));
        hideDatePicker();
    };

    const handleConfirmTime = (time) => {
        setInputs(prevInputs => ({
            ...prevInputs,
            time: { value: time, isValid: true }
        }));
        hideTimePicker();
    };

    const handleSave = () => {
        const task = {
            id: item ? item.id : Date.now().toString(),
            title: inputs.title.value,
            description: inputs.description.value,
            date: inputs.date.value instanceof Date ? inputs.date.value.toISOString() : null,
            isCompleted: item ? item.isCompleted : false,
        };

        const titleIsValid = task.title.trim().length > 0;
        const descriptionIsValid = task.description.trim().length > 0;
        const dateIsValid = task.date !== null && !isNaN(new Date(task.date));

        if (!titleIsValid || !descriptionIsValid || !dateIsValid) {
            Alert.alert('Invalid input', 'Please check your input values.');
            return;
        }

        if (item) {
            onUpdateTask(task);
        } else {
            addTodo(task);
        }
        onCancel();
    };

    const inputChangeHandler = (inputIdentifier, enteredValue) => {
        setInputs(prevInputs => ({
            ...prevInputs,
            [inputIdentifier]: { ...prevInputs[inputIdentifier], value: enteredValue, isValid: true }
        }));
    };

    return (
        <Modal animationType="slide" visible={visible} transparent={true}>
            <View style={styles.modalBackground}>
                <View style={styles.formContainer}>
                    <TextInput
                        style={[styles.formInput, !inputs.title.isValid && styles.invalidInput]}
                        placeholder="Task Name"
                        placeholderTextColor="#5a5a5a"
                        value={inputs.title.value}
                        onChangeText={(text) => inputChangeHandler('title', text)}
                        autoFocus={true}
                    />
                    <TextInput
                        style={[styles.formInput, styles.descriptionInput, !inputs.description.isValid && styles.invalidInput]}
                        placeholder="Description"
                        placeholderTextColor="#5a5a5a"
                        multiline
                        value={inputs.description.value}
                        onChangeText={(text) => inputChangeHandler('description', text)}
                    />
                    <TouchableOpacity onPress={showDatePicker}>
                        <TextInput
                            style={[styles.formInput, !inputs.date.isValid && styles.invalidInput]}
                            placeholder="mm/dd/yyyy"
                            placeholderTextColor="#5a5a5a"
                            value={inputs.date.value ? inputs.date.value.toLocaleDateString() : ''}
                            editable={false}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={showTimePicker}>
                        <TextInput
                            style={[styles.formInput, !inputs.time.isValid && styles.invalidInput]}
                            placeholder="hh:mm"
                            placeholderTextColor="#5a5a5a"
                            value={inputs.time.value ? inputs.time.value.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                            editable={false}
                        />
                    </TouchableOpacity>
                    <View style={styles.updateAndCancelButtons}>
                        <TouchableOpacity style={styles.createTaskButton} onPress={handleSave}>
                            <Text style={styles.createTaskButtonText}>
                                {item ? 'Update Task' : 'Create Task'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelTaskButton} onPress={onCancel}>
                            <Text style={styles.cancelTaskButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirmDate}
                        onCancel={hideDatePicker}
                    />
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={handleConfirmTime}
                        onCancel={hideTimePicker}
                    />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    formContainer: {
        backgroundColor: '#282424',
        padding: 20,
        borderRadius: 15,
        width: '90%',
    },
    formInput: {
        backgroundColor: '#383838',
        color: 'white',
        padding: 10,
        borderRadius: 10,
        height: 50,
        marginBottom: 10,
        fontSize: 16,
    },
    descriptionInput: {
        height: 150,
        textAlignVertical: 'top',
    },
    invalidInput: {
        borderColor: 'red',
        borderWidth: 1,
    },
    updateAndCancelButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    createTaskButton: {
        backgroundColor: '#7274fd',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        flex: 1,
        marginRight: 5,
    },
    cancelTaskButton: {
        backgroundColor: 'red',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        flex: 1,
        marginLeft: 5,
    },
    createTaskButtonText: {
        color: '#e2e2f3',
        fontSize: 18,
    },
    cancelTaskButtonText: {
        color: '#e2e2f3',
        fontSize: 18,
    },
});
