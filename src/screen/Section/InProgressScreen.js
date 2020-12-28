import {observer,inject} from 'mobx-react'
import React from 'react';
import { TextInput, TouchableOpacity, View, Text, StyleSheet,Button,ScrollView } from 'react-native';
import TaskList from '../../component/TaskList'

const InProgressScreen = (props) => {
    const{navigation,listStore}=props;

return(
<View style={{flex:1}}>
  <TaskList Liste={listStore.InProgressList} title='Tâche en cours' state="InProgress"/>
  <View style={{flex:0.05,marginTop:'5%',backgroundColor:"#901oao" }}>
    <Button
     title="Ajouter une tâche"
     onPress={()=>{ navigation.navigate("AddTask")        
     }}
            />
   </View>
</View>
)
}

export default inject('listStore')(observer(InProgressScreen))