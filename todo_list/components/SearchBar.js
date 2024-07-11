import { TextInput, View, StyleSheet, Text, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useState, useContext } from "react";
import TodoForm from "../screens/TodoForm";
import { TodoContext } from "../store/TodoContext";

export default function SearchBar({ navigation }) {
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { searchTodos } = useContext(TodoContext);

    const startModal = () => {
        setModalIsVisible(true);
    };

    const endModal = () => {
        setModalIsVisible(false);
    };

    const handleSearchChange = async (query) => {
        setSearchQuery(query);
        if (query.length > 0) {
            try {
                await searchTodos(query);
            } catch (error) {
                console.error('Failed to search todos:', error);
            }
        }
    };

    navigation = useNavigation();

    function addButtonPress() {
        startModal();
    }

    return (
        <View style={styles.searchContainer}>
            <View style={styles.searchBarStyle}>
                <TextInput
                    style={styles.inputStyle}
                    placeholderTextColor="#5a5a5a"
                    placeholder='ara'
                    autoCapitalize="none"
                    value={searchQuery}
                    onChangeText={handleSearchChange}
                />
            </View>
            <View style={styles.addButtonStyle}>
                <Pressable
                    style={styles.press}
                    onPress={addButtonPress}
                >
                    <Text style={styles.addButtonTextStyle}>Ekle</Text>
                    <Ionicons name="add-circle-outline" size={24} color="#e2e2f3" />
                </Pressable>
                <TodoForm visible={modalIsVisible} onCancel={endModal} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        marginLeft: 20,
        width: '85%',
        padding: 10,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchBarStyle: {
        backgroundColor: "#282424",
        flexDirection: "row",
        borderWidth: 0,
        borderRadius: 15,
        width: '80%',
        padding: 5,
        margin: 10,
        height: 50,
        alignItems: "center",
    },
    inputStyle: {
        marginLeft: 0,
        fontSize: 20,
        width: '100%',
        height: 40,
        color: 'white',
    },
    addButtonStyle: {
        backgroundColor: "#7274fd",
        flexDirection: "row",
        width: '20%',
        height: 50,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 20,
    },
    addButtonTextStyle: {
        fontSize: 20,
        color: '#e2e2f3',
        marginLeft: 5,
        marginRight: 5,
    },
    press: {
        flexDirection: "row",
    }
});
