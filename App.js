import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {configure} from 'mobx';
import { Provider } from 'mobx-react';
import {listStore} from './src/store/TaskLisStore';
import NavigationTab from './src/navigation/NavigationTab';
import { NavigationContainer } from '@react-navigation/native';

configure({
  enforceActions:'never'
});
export default function App() {
  const stores = {listStore}
  return (
    <Provider {...stores}>
      <NavigationContainer>
        <NavigationTab/>
      </NavigationContainer>
    </Provider>
  );
}

