import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import {Authenticator} from 'aws-amplify-react-native'
import {Auth} from 'aws-amplify'
import {
  ConfirmSignIn, 
  // ForgotPassword,
} from 'aws-amplify-react-native';
import SignUp from './src/components/SignUp'
import ConfirmSignUp from './src/components/ConfirmSignUp'
import SignIn from './src/components/SignIn'
import ForgotPassword from './src/components/ForgotPassword'

const usernameAttributes = 'email';

Amplify.configure(awsconfig);

function Home(props){
  if(props.authState === 'signedIn'){
    return <Text onPress={signOut}>Sign Out</Text>;
  } else {
    return <></>
  } 

  function signOut() {
    Auth.signOut()
      .then(() => {
        props.onStateChange('signedOut', null);
      })
      .catch(err => {
        console.log('err: ', err)
      })
  }

}




export default function App() {
  return (
    <View style={styles.container}>
      <Authenticator 
        usernameAttributes="email" 
        hideDefault={true} 
        authState="signIn"
        onStateChange={(authState) => console.log("authState ...",authState)} >
        <Home/>
        <SignUp/>
        <SignIn/>
        <ConfirmSignUp/>
        <ConfirmSignIn/>
        <ForgotPassword/>
      </Authenticator>
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: "center",
    alignItems:"center",
  }
});