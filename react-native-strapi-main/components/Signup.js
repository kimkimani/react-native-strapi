import React,{useState,useContext,useEffect} from 'react';
import { StyleSheet, Text, View,Image, TextInput, TouchableOpacity } from 'react-native';
import Context from '../store/context';
import {authSignup} from '../server/api';

export default function Signup(props) {

  const [email,setEmail] = useState('');
  const [username,setUserName] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('');
  const {setUserLoggedIn,userLogOut,userLoggedIn} = useContext(Context);

  const goToLogin = () => {
    props.navigation.navigate('Login');
  }

  useEffect(() => {
    // check if we have a logged in user.
    if(Object.keys(userLoggedIn).length > 0){
      // log the user out.
      userLogOut();
    }
  },[]);

  const handleSignup = async () => {
    if(username && email && password){

      try {

        let resp = await authSignup(username,email,password);

        // set the data to context.
        setUserLoggedIn(resp.data.user);

        // pre-empty the fields.
        setUserName('');
        setEmail('');
        setPassword('');
        setError('');
        
        // Navigate to the dashboard page
        props.navigation.navigate('Dashboard');

      }catch(error){
        setError(error);
      }

    }else{
      setError("All fields are required");
      return;
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
          placeholder="User Name"
          placeholderTextColor="#003f5c"
          value={username}
          onChangeText={setUserName}
        />
      </View>
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
      <TouchableOpacity onPress={goToLogin}>
        <Text style={styles.login_button}>Already have an account?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.createAccountBtn} onPress={handleSignup}>
        <Text style={styles.signupText}>Create Account</Text>
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
  error:{
    color:"red",
    marginBottom:10
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
  createAccountBtn:{
    width:"80%",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    backgroundColor:"#ff1493"
  }
});
