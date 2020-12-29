import React from 'react';
import { View, Text,ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import {observer,inject} from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-elements';

const TaskList = (props) => {
    const{Liste,title,listStore,state}=props;
    const navigation=useNavigation();//Dans un composant on ne peux pas avoir navigation dans les props

return(
<View style={{flex:0.9}} contentContainerStyle={{flexGrow:0}}>
      <ScrollView  >
        <Card > 
        <Card.Title>{title}</Card.Title>
        <Card.Divider/>
        {
            Liste.map((task, key) => {
            return (
                    <View key={key} style={{marginTop:'10%',marginLeft:"2.5%",marginRight:"2.5%",flexDirection:'row',width:'100%'}}>
                      <View style={{flex:0.5}}>
                        <Text style={{borderWidth:1,fontSize:15,fontWeight: "bold"}}>Titre de la tâche</Text>
                        <Text style={{borderWidth:1,fontSize:15}}>{task.GetTitle() }</Text>
                        <Text style={{borderWidth:1,fontSize:15,fontWeight: "bold"}}>Descripton</Text>
                        <Text style={{borderWidth:1,fontSize:15}}>{task.GetDesc()}</Text>
                      </View>
                      <View style={{flexDirection:'column',justifyContent: 'space-around',flex:0.5}}>
                      <Button 
                      title='Modifier'
                      type="outline"
                      onPress={()=>{
                        listStore.setTask(task);
                        navigation.navigate("UpdateTask",{
                        key:key
                      })
                      }}/>
                      <Button
                      title='Supprimer'
                      type="outline"
                      onPress={()=>{
                        listStore.deleteInList(state,key);
                        listStore.saveList();
                      }}
                      />
                      </View>
                    </View>
                    
            );
            })
        }
        </Card>
        </ScrollView>
        {/* </SafeAreaView> */}
        
      </View>
)
}
export default inject('listStore')(observer(TaskList))
