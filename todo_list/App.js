import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import TodoScreen from "./screens/TodoScreen";
import TodoForm from "./screens/TodoForm";
import {TodoContextProvider} from "./store/TodoContext";


const Stack = createNativeStackNavigator();

const CustomHeaderTitle = () => (
    <Text style={styles.headerTitle}>
        <Text style={styles.headerTitlePart1}>to</Text>
        <Text style={styles.headerTitlePart2}>do</Text>
    </Text>
);

export default function App() {
  return (
      <TodoContextProvider>
          <NavigationContainer>
              <Stack.Navigator screenOptions={{
                  contentStyle: { backgroundColor: '#191919' },
                  statusBarColor : '#0d0d0d',
                  headerStyle: { backgroundColor: '#0d0d0d' },
                  headerTintColor : 'white',
                  headerTitleAlign: 'center', // Başlık ortalama
                  headerTitle: props => <CustomHeaderTitle {...props} />
              }}>
                  <Stack.Screen name={'Todos'} component={TodoScreen}></Stack.Screen>
                  <Stack.Screen name={'TodoForm'} component={TodoForm}></Stack.Screen>
              </Stack.Navigator>
          </NavigationContainer>
      </TodoContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    headerTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        justifyContent : "center",
        alignItems : "center"
    },
    headerTitlePart1: {
        color: '#f3d03e', // Sarı renk
    },
    headerTitlePart2: {
        color: '#6455f7', // Mavi renk
    },
});


/*
<View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
 */
