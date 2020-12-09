import React, {useState} from 'react'

import {
    View,
    Text,
    Button,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native'
import Amplify from 'aws-amplify';
import {Auth} from 'aws-amplify'
import {validateEmail,validatePassword} from '../validation'
import awsconfig from '../../aws-exports';
import {FormStyles} from '../styles/FormStyles'

Amplify.configure(awsconfig);

export default function SignIn(props){
    
    const [state, setState] = useState({
        email: '',
        password: '',
    });
    const [error,setErrors] = useState({
        email:'',password:''
    });

    async function onSubmit() {
        const emailError = validateEmail(state.email);
        
        if(emailError) {
            setErrors({email:emailError});
        }else{
            try{
                console.log({
                    username: state.email,
                    password: state.password,
                })
                const user = await Auth.signIn({
                    username: state.email,
                    password: state.password,
                });
                setErrors({email: ''});
                props.onStateChange('confirmSignUp',user);
            }catch(errorMsg){
                Alert.alert(errorMsg);
            }
        }
    }

    if(props.authState === 'signIn'){
        return (
            <View style={FormStyles.container}>
                <Text style={FormStyles.title}>Entrar</Text>
                <Text style={FormStyles.space}></Text>
                <Text style={FormStyles.label}>Email:</Text>
                <TextInput
                style={FormStyles.input}
                onChangeText={(text) => setState({...state, email: text.toLowerCase()})}
                placeholder="Seu email"
                value={state.email}
                />
                <Text style={FormStyles.error}>{error.email}</Text>
                <Text style={FormStyles.label}>Senha:</Text>
                <TextInput
                style={FormStyles.input}
                onChangeText={(text) => setState({...state, password: text})}
                placeholder="Sua senha"
                value={state.password}
                secureTextEntry={true}
                />
                <Text style={FormStyles.space}></Text>
                <TouchableOpacity
                    style={FormStyles.button}
                    onPress={() => onSubmit()}>
                    <Text style={FormStyles.buttonText}>Entrar</Text>
                </TouchableOpacity>
                <View style={FormStyles.links}>
                    <Button
                    onPress={() => props.onStateChange('forgotPassword', {})}
                    title="Esqueci Minha Senha"
                    color="black"
                    accessibilityLabel="esqueci minha senha"
                    />
                    <Button
                    onPress={() => props.onStateChange('signUp', {})}
                    title="Criar Conta"
                    color="black"
                    accessibilityLabel="criar conta"
                    />
                </View>
            </View>
        )
    }else{
        return <></>
    }
}