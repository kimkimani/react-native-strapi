import React,{useState,useContext,useEffect} from 'react';
import { StyleSheet, Text, View,Image, TextInput, TouchableOpacity } from 'react-native';

import {authLogin} from '../server/api';
import Context from '../store/context';

export default function Login(props) {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('');
  const {setUserLoggedIn,userLoggedIn,userLogOut} = useContext(Context);

  useEffect( () => {
    // check if the user is already logged in
    if(Object.keys(userLoggedIn).length > 0){
      // log out the user.
      userLogOut();
    }
  },[]);

  const goToForgotPassword = () => {
    props.navigation.navigate('ForgotPassword');
  }

  const goToCreateAccount = () => {
    props.navigation.navigate('Signup');
  }

  const handleLogin = async () => {
    if(email && password) {
       try{   
        let resp = await authLogin(email,password);

        setUserLoggedIn(resp.user);

        setEmail('');
        setPassword('');

        props.navigation.navigate('Dashboard');

       }catch(error){
        setError(error);
       }
    }else{
      setError("Email and Password fields are required");
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/splash.png')} style={styles.image} />
      {
        error ? (
          <Text style={styles.error}>
            {error}
          </Text>
        ) : null
      }
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity onPress={goToForgotPassword}>
        <Text style={styles.forgot_button}>Forgot Password</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToCreateAccount}>
        <Text style={styles.create_account_button}>Create Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      {/* <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    width:200,
    height:100,
    marginBottom:40
  },
  error:{
    color:"red",
    marginBottom:10
  },
  inputView:{
    backgroundColor:"#FFC0CB",
    borderRadius:30,
    width:"70%",
    height:45,
    marginBottom:20,
    alignItems:"center"
  },
  TextInput:{
    height:50,
    flex:1,
    padding:10,
    marginLeft:20
  },
  forgot_button:{
    height:30,
    marginBottom:30
  },
  create_account_button:{
    height:30,
    marginBottom:30
  },
  loginBtn:{
    width:"80%",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    backgroundColor:"#ff1493"
  }
});
