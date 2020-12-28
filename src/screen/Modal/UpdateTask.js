import React,{useState,useEffect} from 'react';
import { TextInput, TouchableOpacity, View, Text, StyleSheet,Button } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Card } from 'react-native-elements';
import {observer,inject} from 'mobx-react';

const UpdateTask = (props) => {
  //Avoir les informations passé en paramètre
  const{route,navigation,listStore}=props;     
  const{key}=route.params;
  const Task= listStore.Task;
  //C'est la qu'on stockera la valeurs des champs
  const[Titre,setTitre]=useState(Task.GetTitle());
  const[Description,setDescription]=useState(Task.GetDesc());
  const[checked,setChecked]=useState(Task.GetState());
  


  const UpTask  =()=>{
    if(Titre!="" && Description!="" ){
      Task.setTitle(Titre);
      Task.setDesc(Description);
     switch (checked) {
      case 'Todo'://Dans le cas où l'input est sur Todo
        switch(Task.GetState()){//Si on modifie la task on va devoir connaitre son type afin de la retirer de la bonne liste
          case 'Todo'://j'enlève et je remet l'objet dans 
          listStore.deleteTodo(key)
          listStore.addTodo(Task)
          break;
          case 'Done'://Avant changement la task était Done donc on va la retirer de la liste DONE
          listStore.deleteDone(key);
          Task.setToDo()
          listStore.addTodo(Task)  
          break;
          case 'InProgress':
          listStore.deleteInProgress(key);
          Task.setToDo()
          listStore.addTodo(Task)  
          
          break;
        }
        break;
      case 'Done':
        switch(Task.GetState()){//Si on modifie la task on va devoir connaitre son type afin de la retirer de la bonne liste
          case 'Done':
            listStore.deleteDone(key)
            listStore.addDone(Task)
            break;
          case 'Todo'://Avant changement la task était Done donc on va la retirer de la liste DONE
            listStore.deleteTodo(key);
            Task.setDone();
            listStore.addDone(Task);    
            break;
          case 'InProgress':
            listStore.deleteInProgress(key);
            Task.setDone();
            listStore.addDone(Task);
            break;
        }
        break;
      case 'InProgress':
        switch(Task.GetState()){//Si on modifie la task on va devoir connaitre son type afin de la retirer de la bonne liste
          case 'InProgress':
            listStore.deleteInProgress(key)
            listStore.addInProgress(Task)
            break;
          case 'Todo'://Avant changement la task était Done donc on va la retirer de la liste DONE
            listStore.deleteTodo(key);
            Task.setInProgress();
            listStore.addInProgress(Task);    
            break;
          case 'Done':
            listStore.deleteDone(key);
            Task.setInProgress();
            listStore.addInProgress(Task);
            break;
        }
        break;
      default:
        console.log('une erreur est survenue');
    }
    listStore.saveList();
    listStore.setTask(Task);
    }
}


    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'stretch', justifyContent: 'center'}}>  
        <Card > 
        <Card.Title>Modifier une tâche</Card.Title>
        <Card.Divider/>
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
            <Text>Tâche à faire</Text>
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
                <Text>Râche faite</Text>
              </TouchableOpacity>
            
            <View  style={{flexDirection:'row',justifyContent:'space-around'}}>
            <Button onPress={() => { 
              UpTask() ;
              navigation.goBack();
            }} title="Modifier la tâche" />
            <Button onPress={() => navigation.goBack()} title="Retour" />
            </View>   
            </Card>
        </View>
      </View>
    );
  }
  export default inject('listStore')(observer(UpdateTask))
