import React from 'react';
import { TextInput, TouchableOpacity, View, Text, StyleSheet,Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigation from './TabNavigation';
import AddTask from '../screen/Modal/AddTask'
import { Icon } from 'react-native-elements';
import UpdateTask from '../screen/Modal/UpdateTask';
import {observer,inject} from 'mobx-react'


const RootStack = createStackNavigator();
const NavigationTab = (props) => {
  const{navigation,listStore}=props;
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="TabNavigation"
        component={TabNavigation}
        options={({ navigation }) => ({
          title: 'Bienvenue',
          })}/>
    

      <RootStack.Screen name="UpdateTask" 
      component={UpdateTask} 
      options={{ headerShown: false }}
      />
      <RootStack.Screen name="AddTask"
      component={AddTask}
      options={{ headerShown: false }}
      />
  

    </RootStack.Navigator>
  );
}
export default inject('listStore')(observer(NavigationTab))