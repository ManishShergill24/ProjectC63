import React from 'react';
import { View } from 'react-native';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import Homescreen from './Screens/HomeScreen'

export default function App() {
  return (
    <View>
      <AppContainer/>
    </View>
  );
}

var AppNavigator = createSwitchNavigator({
  Homescreen: Homescreen,
});

const AppContainer = createAppContainer(AppNavigator);