import React from 'react';
import { View } from 'react-native';
import {observer,inject} from 'mobx-react'
import TaskList from '../../component/TaskList'
import { Button } from 'react-native-elements';

const ToDoScreen = (props) => {
    const{navigation,listStore}=props;
    listStore.loadList();//On initialise les listes sauvegardé
return(
<View style={{flex:1}}>

          <TaskList Liste={listStore.TodoList} title="Tâche à faire" state='Todo'/>

        {/* </SafeAreaView> */}
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

export default inject('listStore')(observer(ToDoScreen))