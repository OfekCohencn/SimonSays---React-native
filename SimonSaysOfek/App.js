import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Screens/Home'
import ListScore from './Screens/ListScore'
import { Provider } from 'react-redux';
import { Store } from './Redux/store';

const Stack = createStackNavigator();

export default class App extends Component
{
  render() 
  {
    return (
      <Provider store={Store}>
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ListScore" component={ListScore} />
        </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}