import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import {Authenticator} from 'aws-amplify-react-native'
import { withAuthenticator,
  SignIn, 
  ConfirmSignUp,
  ConfirmSignIn,
  ForgotPassword, 
} from 'aws-amplify-react-native';
import SignUp from './src/components/signUp'


// const signUpConfig = {
//   header: 'Sat Editor',
//   hideAllDefaults: true,
//   defaultCountryCode: 55,
//   signUpFields: [
//     {
//       label: 'Email',
//       key: 'email',
//       required: true,
//       displayOrder: 1,
//       type: 'string'
//     },
//     {
//       label: 'Senha',
//       key: 'password',
//       required: true,
//       displayOrder: 1,
//       type: 'password'
//     }
//   ]
// };

const usernameAttributes = 'email';


//export default withAuthenticator(App, {signUpConfig,usernameAttributes})

Amplify.configure(awsconfig);

function Home(props){
  if(props.authState === 'signedIn'){
    return <Text>Home</Text>;
  } else {
    return <></>
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