import {observer,inject} from 'mobx-react'
import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import TaskList from '../../component/TaskList'

const InProgressScreen = (props) => {
    const{navigation,listStore}=props;

return(
<View style={{flex:1}}>
  <TaskList Liste={listStore.InProgressList} title='Tâche en cours' state="InProgress"/>
  <View style={{flex:0.1,marginTop:'5%',backgroundColor:"#901oao" }}>
    <Button
     title="Ajouter une tâche"
     type="outline"
     onPress={()=>{ navigation.navigate("AddTask")        
     }}
            />
   </View>
</View>
)
}

export default inject('listStore')(observer(InProgressScreen))