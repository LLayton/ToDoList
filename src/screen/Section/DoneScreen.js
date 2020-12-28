import {observer,inject} from 'mobx-react'
import React from 'react';
import { View, Text, StyleSheet,Button } from 'react-native';
import TaskList from '../../component/TaskList'
const DoneScreen = (props) => {
    const{navigation,listStore}=props;
return(
<View style={{flex:1}}>
        <TaskList Liste={listStore.DoneList} title='Tâche faite' state="Done"/>
        <View style={{flex:0.05,marginTop:'5%',backgroundColor:"#901oao" }}>
            <Button
            title="Ajouter une tâche"
            onPress={()=>{ navigation.navigate("AddTask")}}
            />
        </View>
      </View>
)
}

export default inject('listStore')(observer(DoneScreen))