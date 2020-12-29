import React from 'react';
import { Alert } from 'react-native';

class TaskClass  {
    state='';
    title='';
    desc='';

    //GETTEUR
    GetState= ()=>{
        return this.state;
    }
    GetTitle=()=>{
        return this.title;
    }
    GetDesc=()=>{
        return this.desc
    }
    //SETTEUR
    setToDo =()=>{
        this.state='Todo';
    }
    setDone =()=>{
        this.state='Done';
    }
    setInProgress =()=>{
        this.state='InProgress'
    }
    setTitle=(SomeText)=>{
        this.title=SomeText;
    }
    setDesc=(SomeText)=>{
        this.desc=SomeText;
    }
    
    constructor(UnState,UnTitle,UneDesc){
            this.state=UnState
            this.title=UnTitle
            this.desc=UneDesc
        };
        
}

 
const Task = {
    CreateOneTask:  (state,title,desc) => {
         return new TaskClass(state,title,desc);
    },
    Alerte : ()=>{
            Alert.alert(
                "Erreur",
                "Un des champs saisie est vide",
                [
                 { text: "OK" }
                ],
                 { cancelable: false }
            );
    }
};


const TaskContext= React.createContext(Task);
export {Task};
export default TaskContext