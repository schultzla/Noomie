import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native'
import Login from './components/Login';
import Header from './components/Header';
import Survey from './components/Survey';
import Matches from './components/Matches';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './components/RootNavigation';
import MatchList from './components/MatchList';
import Chat from './components/Chat';
import * as RootNavigation from './components/RootNavigation.js';
import GroupChat from './components/GroupChat';

const Stack = createStackNavigator();

export default class App extends Component {

  render() {
    console.disableYellowBox = true;
    console.log(RootNavigation.navigationRef.current?.getRootState.routeName)
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator 
          initialRouteName='Matches'>
          <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />
          <Stack.Screen name="Survey" options={{headerShown: false}} component={Survey} />
          <Stack.Screen name="Matches" options={{headerShown: false}} component={Matches} />
          <Stack.Screen name="Match List" component={MatchList}/>
          <Stack.Screen name="Chat" component={Chat}/>
          <Stack.Screen name="Group Chat" component={GroupChat}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}