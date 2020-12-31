import {observer,inject} from 'mobx-react'
import React from 'react';
import { View } from 'react-native';
import TaskList from '../../component/TaskList'
import { Button } from 'react-native-elements';

const DoneScreen = (props) => {
    const{navigation,listStore}=props;
return(
<View style={{flex:1}}>
        <TaskList Liste={listStore.DoneList} title='Tâche faite' state="Done"/>
        <View style={{flex:0.1,marginTop:'5%',backgroundColor:"#901oao" }}>
            <Button
            title="Ajouter une tâche"
            type="outline"
            onPress={()=>{ navigation.navigate("AddTask")}}
            />
        </View>
      </View>
)
}

export default inject('listStore')(observer(DoneScreen))