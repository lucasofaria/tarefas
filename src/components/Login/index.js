import React, {useState} from "react";
import { SafeAreaView, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";

import firebase from "../../services/firebaseConnection";

export default function Login({ changeStatus }){
    const [type, setType] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin(){
      if(type === 'login'){
        // Login
        const user = firebase.auth().signInWithEmailAndPassword(email, password)
        .then( (user) => {
          changeStatus(user.user.uid)
        })
        .catch( (error) => {
          alert('Ops, algo deu errado.');
          console.log(error);
          return;
        })

      }else{
        // Cadastro
        const user = firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( (user) => {
          changeStatus(user.user.uid)
        })
        .catch( (error) => {
          if(error.code === 'auth/weak-password'){
            alert('A senha deve conter ao menos 6 caracteres');
            console.log(error);
            return;
          }
          if(error.code === 'auth/invalid-email'){
            alert('Email invalido');
            console.log(error);
            return;
          }
          else{
            alert('Ops, algo deu errado');
            console.log(error);
            return;
          }
        })
      }
    }
  
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Tela de Login</Text>

         
            <TextInput
                placeholder="Seu email"
                style={styles.input}
                value={email}
                onChangeText={ (text) => setEmail(text) }
            />

            <TextInput
                placeholder="********"
                style={styles.input}
                value={password}
                onChangeText={ (text) => setPassword(text) }
            />

            <TouchableOpacity
                style={[styles.handleLogin, {backgroundColor: type === 'login' ? '#3EA6F2' : '#141414' }]}
                onPress={handleLogin}
            >
                <Text style={styles.textHandle}>
                  { type === 'login' ? 'Acessar' : 'Cadastrar' }
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={ () => setType(type => type === 'login' ? 'cadastrar' : 'login') }>
                <Text style={{ textAlign: 'center', fontSize: 15 }}>
                  { type === 'login' ? 'Criar uma conta' : 'Já possuo uma conta' }
                </Text>
            </TouchableOpacity>    
        </SafeAreaView>   
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 15,
    backgroundColor: '#F2F6FC' 
  },
  input: {
    height: 45,
    padding: 5,
    fontSize: 18,
    marginBottom: 10,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#141414'
  },
  textHandle:{
    fontSize: 18,
    color: '#FFF'
  },
  title:{
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 5
  },
  handleLogin:{
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    borderRadius: 4,
    marginBottom: 5
  }
})