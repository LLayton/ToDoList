import {observable,action, makeObservable} from 'mobx'
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskContext from './ClassTask';
import React,{useContext} from 'react';
class ListStore {
    TodoList=[];
    DoneList=[];
    InProgressList=[];
    //Quand un objet est transmit en paramètre un erreur s'affiche 'Non-serializable values were found in the navigation state'
    //Pour éviter se message intempestif j'enregistre la task ici
    Task={};
    
    //TODO
    setTask=(task)=>{
        this.Task=task;
    }
    addTodo=(Task)=>{
        this.TodoList.push(Task)
    }
    deleteTodo=(index)=>{
        this.TodoList.splice(index, 1)
    }
    //DONE
    addDone=(Task)=>{
        this.DoneList.push(Task)
    }
    deleteDone=(index)=>{
        this.DoneList.splice(index, 1)
    }
    //InProgress
    addInProgress=(Task)=>{
        this.InProgressList.push(Task);
    }

    deleteInProgress=(index)=>{
        this.InProgressList.splice(index, 1)
    }
    deleteInList=(state,index)=>{
        switch(state){
            case 'Done':
                this.deleteDone(index)
                break;
            case 'InProgress':
                this.deleteInProgress(index)
                break;
            case 'Todo':
                this.deleteTodo(index)
                break;
          }
  
    }
    //Charge la liste des tâche stocké
    loadList=()=>{
        const context=useContext(TaskContext)
        this.getData().then((result) => {
           result[0].forEach(element => {
            const task= context.CreateOneTask(element.state,element.title,element.desc);
            this.addTodo(task);
           });
                       
           result[1].forEach(element =>{
            const task= context.CreateOneTask(element.state,element.title,element.desc);
            this.addDone(task);
           })
           result[2].forEach(element =>{
            const task= context.CreateOneTask(element.state,element.title,element.desc);
            this.addInProgress(task);
           })
        }).catch(err=>{
            console.log("Les listes sont vides")
        })
    }
    
    //Sauvegarde la liste des objets 
    saveList=()=>{
        //Je stocke un array de met tableau
        const data = [this.TodoList,this.DoneList,this.InProgressList];
        this.storeData(data).then(res=>{
                console.log('Sauvegarde effectuée')
              }).catch(err =>{
                console.log("Une erreur à eu lieu");
                
              })
        
    }
    //Fonction assyncstorage
    getData = async () => {
        try {
        const jsonValue = await AsyncStorage.getItem('@storage_Key')
        return JSON.parse(jsonValue);
        } catch(e) {
          
        }
    }

    storeData = async (value) => {
        try {
          const data = JSON.stringify(value)
          await AsyncStorage.setItem('@storage_Key', data)
        } catch (e) {
        }
      }
    constructor(){
        makeObservable(this,{
            InProgressList:observable,//Listes des tâches en cours
            TodoList:observable,
            DoneList:observable,
            Task:observable,//Tâche qui sert à éviter un message d'avertissement
            setTask:action,
            addTodo:action,
            addDone:action,
            addInProgress:action,
            deleteTodo:action,
            deleteDone:action,
            deleteInProgress:action,
            storeData:action,//stocke des donnée
            getData:action,//récupère des donnée
            saveList:action,//utilise storeData pour stocker les liste
            loadList:action,//utilise getData pour récupérer les liste
            deleteInList:action,//Supprime un élément pour un state donné 
        });
    }
}

const listStore = new ListStore();
export {listStore};