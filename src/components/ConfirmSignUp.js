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
import {validateEmail} from '../validation'
import awsconfig from '../../aws-exports';
import {FormStyles} from '../styles/FormStyles'

Amplify.configure(awsconfig);

export default function ConfirmSignUp(props){
    
    const [state, setState] = useState({
        email: '',
        confirmationCode: '',
    });
    const [error,setErrors] = useState({email:''});

    async function onSubmit() {
        const {email: username, confirmationCode: code} = state;
        const emailError = validateEmail(state.email);
        if(emailError) {
            setErrors({email:emailError});
        }else{
            try{
                console.log({
                    username: state.email,
                    password: state.password,
                })
                const user = await Auth.confirmSignUp(username, code);
                setState({confirmationCode: '', email: ''});
                props.onStateChange('signIn',user);
            }catch(errorMsg){
                Alert.alert(errorMsg);
            }
        }
    }

    if(props.authState === 'confirmSignUp'){
        return (
            <View style={FormStyles.container}>
                <Text style={FormStyles.title}>Confirmar Conta</Text>
                <Text style={FormStyles.label}>Email:</Text>
                <TextInput
                style={FormStyles.input}
                onChangeText={(text) => setState({...state, email: text.toLowerCase()})}
                placeholder="Seu email"
                value={state.email}
                />
                <Text style={FormStyles.error}>{error.email}</Text>
                <Text style={FormStyles.label}>Código de Confirmação:</Text>
                <TextInput
                style={FormStyles.input}
                onChangeText={(text) => setState({...state, confirmationCode: text})}
                placeholder="Código de Confirmação"
                value={state.confirmationCode}
                />
                
                <TouchableOpacity
                    style={FormStyles.button}
                    onPress={() => onSubmit()}>
                    <Text style={FormStyles.buttonText}>Enviar</Text>
                </TouchableOpacity>
                <View style={FormStyles.links}>
                    <Button
                    onPress={() => props.onStateChange('signIn', {})}
                    title="Voltar para Login"
                    color="black"
                    accessibilityLabel="voltar para login"
                    />
                    <Button
                    onPress={() => props.onStateChange('signUp', {})}
                    title="Voltar para Cadastro"
                    color="black"
                    accessibilityLabel="voltar para cadastro"
                    />
                </View>
            </View>
        )
    }else{
        return <></>
    }
}