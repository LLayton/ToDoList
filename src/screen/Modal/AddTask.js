import React,{useState,useContext} from 'react';
import { TextInput, TouchableOpacity, View, Text, StyleSheet,Button } from 'react-native';
import { RadioButton } from 'react-native-paper';
import TaskContext from '../../store/ClassTask'
import {listStore} from '../../store/TaskLisStore'
import {observer,inject} from 'mobx-react'

const AddTask = (props) => {
  const{navigation,listStore}=props;
  const[Titre,setTitre]=useState('');
  const[Description,setDescription]=useState('');
  const[checked,setChecked]=useState('Todo');
    //Contect contenant la fonction permettant de créer une task
  const context = useContext(TaskContext)
  const createTask  =()=>{
    if(Titre!="" && Description!="" ){
     const task =context.CreateOneTask(checked,Titre,Description)
     switch (checked) {
      case 'Todo':
        listStore.addTodo(task);
        break;
      case 'Done':
        listStore.addDone(task);
        break;
      case 'InProgress':
        listStore.addInProgress(task)
        break;
      default:
        console.log('une erreur est survenue');
    }
    listStore.saveList();
    }
}
    return (
      
        <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'stretch', justifyContent: 'center'}}>  
          <Text>Créer une nouvelle tâche</Text>
              <Text>Titre de la tâche </Text>
              <TextInput
              style={{borderWidth:1}}
              value={Titre}
              onChangeText={(value) => setTitre(value)}
              />    
              <Text>Description de la tâche</Text>
              <TextInput
              style={{borderWidth:1,width:'100%'}}
              value={Description}
              onChangeText={(value) => setDescription(value)}
              />    
            <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}
            onPress={() => setChecked('Todo')}
            >
            <RadioButton
                  value="Todo"
                  status={ checked === 'Todo' ? 'checked' : 'unchecked' }
                  onPress={() => setChecked('Todo')}
              />
            <Text>tâche à faire</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flexDirection:'row',alignItems:'center'}}
              onPress={() => setChecked('InProgress')}
              >
              <RadioButton
                  value="InProgress"
                  status={ checked === 'InProgress' ? 'checked' : 'unchecked' }
                  
              />
              <Text>Tâche en cours</Text>
              </TouchableOpacity>

            <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}
            onPress={() => setChecked('Done')}
            >
                <RadioButton
                    value="Done"
                    status={ checked === 'Done' ? 'checked' : 'unchecked' }
                    
                />
                <Text>tâche faite</Text>
              </TouchableOpacity>            
            <View  style={{flexDirection:'row',justifyContent:'space-around'}}>
            <Button onPress={() => {
            createTask();
            navigation.goBack();
            }
            } title="Créer votre tâche" />
            <Button onPress={() => navigation.goBack()} title="Retour" />
            </View>   
        </View>
      
      
    );
  }
export default inject('listStore')(observer(AddTask))
