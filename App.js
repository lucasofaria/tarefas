import React, {useState, useEffect, useRef} from "react";
import { 
  SafeAreaView, 
  Text, 
  StyleSheet, 
  TextInput, 
  View, 
  TouchableOpacity,
  FlatList,
  Keyboard 
} from "react-native";

import Login from "./src/components/Login";
import TaskList from "./src/components/TaskList";
import firebase from './src/services/firebaseConnection';
import Feather from 'react-native-vector-icons/Feather';

export default function App(){
  const [user, setUser] = useState(null);
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [key, setKey] = useState('');

  const inputRef = useRef(null);

  useEffect(() => {
    function getUser(){
      if(!user){
        return;
      }

      firebase.database().ref('tarefas').child(user).once('value', (snapshot) => {
        setTasks([]);

        snapshot?.forEach((childItem) => {
          let data = {
            key: childItem.key,
            nome: childItem.val().nome
          }

          setTasks((oldTasks) => [...oldTasks, data])
        })

      })

    }

    getUser();

  }, [user])
  
  function handleAdd(){
    if(newTask === ''){
      return;
    }

    // Editar e alterar tarefas
    if(key !== ''){
      firebase.database().ref('tarefas').child(user).child(key).update({
        nome: newTask
      }).then(() => {
        const taskIndex = tasks.findIndex((item) => item.key === key) //identifica o index do objeto
        const taskClone = tasks; // clona a tarefa
        taskClone[taskIndex].nome = newTask; // altera apenas o nome da tarefa

        setTasks([...taskClone]); // adiciona a tarefa editada
      })

      Keyboard.dismiss();
      setNewTask('');
      setKey('');
      return;
    }

    let tarefas = firebase.database().ref('tarefas').child(user);
    let chave = tarefas.push().key;

    tarefas.child(chave).set({
      nome:newTask
    })
    .then(() => {
      const data = {
        key: chave,
        nome: newTask
      };

      setTasks( (oldTasks) => [...oldTasks, data])
    })

    Keyboard.dismiss();
    setNewTask('')
  }

  function handleDelete(key){
    firebase.database().ref('tarefas').child(user).child(key).remove()
    .then(() => {
      const findTasks = tasks.filter(item => item.key !== key)
      setTasks(findTasks) 
    })
  }

  function handleEdit(data){
    setKey(data.key);
    setNewTask(data.nome);
    inputRef.current.focus();
  }

  function cancelEdit(){
    setKey('');
    setNewTask('');
    Keyboard.dismiss;
  }

  if(!user){
    return <Login changeStatus={ (user) => setUser(user) }/>
  }
  
  return(
    <SafeAreaView style={styles.container}>
      
      { key.length > 0 && (
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <TouchableOpacity onPress={cancelEdit}>
            <Feather name='x-circle' size={20} color='#FF0000'/>
          </TouchableOpacity>
          <Text style={{ fontSize: 15, marginLeft: 5, color:'#FF0000' }}>
            Você está editando uma tarefa
          </Text>
        </View>
      )}
      
      <View style={styles.containerAddTarefas}>
        <TextInput
          style={styles.input}
          placeholder="O que irá fazer hoje?"
          onChangeText={(text) => setNewTask(text)}
          value={newTask}
          ref={inputRef}
        >

        </TextInput>
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <Text style={styles.textButton}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={ item => item.key }
        renderItem={ ({ item }) => (
          <TaskList data={item} deleteItem={handleDelete} editItem={handleEdit}/>
        )}
      />
    </SafeAreaView>   
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 10,
    backgroundColor: '#F2F6FC'
  },
  containerAddTarefas:{
    flexDirection: 'row'
  },
  input:{
    height: 45,
    borderWidth: 1,
    borderColor: '#141414',
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10
  },
  buttonAdd:{
    backgroundColor: '#141414',
    height: 45,
    paddingHorizontal: 15,
    marginLeft: 5,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textButton:{
    color: '#FFF',
    fontSize: 22
  }
})