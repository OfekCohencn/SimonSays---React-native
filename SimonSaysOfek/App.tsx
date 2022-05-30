/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React from 'react';

 import { NavigationContainer } from '@react-navigation/native';
 import { createStackNavigator } from '@react-navigation/stack';
 import Home from './src/Screens/Home'
 import ListScore from './src/Screens/ListScore'
 import { Provider } from 'react-redux';
 import { store } from './src/Redux/store';
 
 const Stack = createStackNavigator();

const App = () => 
{
  return (
    <Provider store={store}>
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ListScore" component={ListScore} />
        </Stack.Navigator>
        </NavigationContainer>
      </Provider>
  );
};

export default App;
