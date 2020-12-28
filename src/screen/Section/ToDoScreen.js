import React from 'react';
import { TextInput, TouchableOpacity, View, Text, StyleSheet,Button,ScrollView } from 'react-native';
import {observer,inject} from 'mobx-react'
import TaskList from '../../component/TaskList'

const ToDoScreen = (props) => {
    const{navigation,listStore}=props;
    listStore.loadList();//On initialise les listes sauvegardé
    console.log("")
return(
<View style={{flex:1}}>

          <TaskList Liste={listStore.TodoList} title="Tâche à faire" state='Todo'/>

        {/* </SafeAreaView> */}
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

export default inject('listStore')(observer(ToDoScreen))