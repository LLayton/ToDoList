import React from 'react';
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
    
};


const TaskContext= React.createContext(Task);
export {Task};
export default TaskContext