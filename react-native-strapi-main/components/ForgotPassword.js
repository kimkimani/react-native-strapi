import React,{useState,useEffect, useContext} from 'react';
import { StyleSheet, Text, View,Image, TextInput, TouchableOpacity } from 'react-native';
import Context from '../store/context';
import {forgotPassword} from '../server/api';

export default function ForgotPassword(props) {

  const [email,setEmail] = useState('');
  const [error,setError] = useState('');
  const [message,setMessage] = useState('');
  const {userLoggedIn,userLogOut} = useContext(Context);

  useEffect( () => {
    // check if user is already logged in.
    if(Object.keys(userLoggedIn).length > 0){
      // log out the logged in user.
      userLogOut();
    }
  },[]);

  const goToLogin = () => {
    props.navigation.navigate('Login');
  }

  const handleForgotPassword = async () => {
    if(email){
      try{
        await forgotPassword(email);

        setMessage('Reset Password Email has been sent');
        // reset the email fields.
        setEmail('');
      }catch(error){
        setError(error);
      }
    }else{
      setError("Email is required");
      return;
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/splash.png')} style={styles.image} />
      {
        error ? (
          <Text style={styles.error}>{error}</Text>
        ) : null
      }
      {
        message ? (
          <Text style={styles.message}>{message}</Text>
        ) : null
      }
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={setEmail}
        />
      </View>
      <TouchableOpacity onPress={goToLogin}>
        <Text style={styles.login_button}>Back to Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.resetBtn} onPress={handleForgotPassword}>
        <Text style={styles.resetText}>RESET PASSWORD</Text>
      </TouchableOpacity>
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
  error:{
    color:'red',
    marginBottom:10
  },
  message:{
    color:'green',
    marginBottom:10
  },
  image:{
    width:200,
    height:100,
    marginBottom:40
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
  login_button:{
    height:30,
    marginBottom:30
  },
  resetBtn:{
    width:"80%",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    backgroundColor:"#ff1493"
  }
});
