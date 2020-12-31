import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DoneScreen from '../screen/Section/DoneScreen';
import InProgressScreen from '../screen/Section/InProgressScreen';
import ToDoScreen from '../screen/Section/ToDoScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {observer,inject} from 'mobx-react'
const TabNav = createBottomTabNavigator();
const TabNavigation = (props) => {
  const{navigation,listStore}=props;

  return (
    <TabNav.Navigator 
    screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Todo') {
            iconName = focused ? 'notifications-circle-outline' : 'notifications-circle-outline';
          } else{
            if (route.name === 'InProgress') {
              iconName = focused ? 'hourglass' : 'hourglass';
            }else{
              if(route.name ==='Done'){
                iconName = focused ? 'ios-checkmark-done-sharp' : 'ios-checkmark-done-sharp';
              }
            }
            
          } 
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <TabNav.Screen
        name="Todo"
        component={ToDoScreen}
        options={{ tabBarBadge: listStore.TodoList.length  }}
      />

      <TabNav.Screen
        name="InProgress"
        component={InProgressScreen}
        options={{ tabBarBadge: listStore.InProgressList.length  }}

      />
      <TabNav.Screen
        name="Done"
        component={DoneScreen}
        options={{ tabBarBadge: listStore.DoneList.length  }}
      />

    </TabNav.Navigator>
  );
}

export default inject('listStore')(observer(TabNavigation))