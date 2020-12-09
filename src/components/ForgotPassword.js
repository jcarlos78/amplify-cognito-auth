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

export default function ForgotPassword(props){
    
    const [state, setState] = useState({
        email: '',
        password: '',
        sentCode: false,
        confirmationCode: '',
    });
    const [error,setErrors] = useState({
        email:'',password:''
    });

    async function onSubmitForCode() {
        const emailError = validateEmail(state.email);
        if(emailError) {
            setErrors({email:emailError});
        }else{
            try{
                await Auth.forgotPassword(state.email)
                setState({...state, sentCode: true});
                props.onStateChange('forgotPassword');
            }catch(errorMsg){
                setState({...state, sentCode: false});
                Alert.alert(JSON.stringify(errorMsg));
            }
        }
    }

    async function onSubmitNewPassword() {
        const passwordError = validatePassword(state.password);
        if(passwordError) {
            setErrors({password:passwordError});
        }else{
            try{
                console.log({
                    username: state.email
                })
                await Auth.forgotPasswordSubmit(state.email,state.confirmationCode,state.password);
                setState({...state, sentCode: true});
                props.onStateChange('signIn');
            }catch(errorMsg){
                Alert.alert(errorMsg);
            }
        }
    }
    
    if(props.authState === 'forgotPassword'){

        if(state.sentCode){
            return (
                <View style={FormStyles.container}>
                    <Text style={FormStyles.title}>Criar Nova Senha</Text>
                    <Text style={FormStyles.space}></Text>
                    <Text style={FormStyles.label}>Código de Confirmação:</Text>
                    <TextInput
                    style={FormStyles.input}
                    onChangeText={(text) => setState({...state, confirmationCode: text})}
                    placeholder="Código de Confirmação"
                    value={state.confirmationCode}
                    />
                    <Text style={FormStyles.space}></Text>
                    <Text style={FormStyles.label}>Nova Senha:</Text>
                    <TextInput
                    style={FormStyles.input}
                    onChangeText={(text) => setState({...state, password: text})}
                    placeholder="Sua nova senha"
                    value={state.password}
                    secureTextEntry={true}
                    />
                    <Text style={FormStyles.error}>{error.password}</Text>

                    <TouchableOpacity
                        style={FormStyles.button}
                        onPress={() => onSubmitNewPassword()}>
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
                        onPress={() => setState({...state, sentCode:false})}
                        title="Novo código"
                        color="black"
                        accessibilityLabel="Novo código"
                        />
                    </View>
                </View>
            )
        }
        return (
            <View style={FormStyles.container}>
                <Text style={FormStyles.title}>Criar Nova Senha</Text>
                <Text style={FormStyles.space}></Text>
                <Text style={FormStyles.label}>Email:</Text>
                <TextInput
                style={FormStyles.input}
                onChangeText={(text) => setState({...state, email: text.toLowerCase()})}
                placeholder="Seu email"
                value={state.email}
                />
                <Text style={FormStyles.error}>{error.email}</Text>
                
                <TouchableOpacity
                    style={FormStyles.button}
                    onPress={() => onSubmitForCode()}>
                    <Text style={FormStyles.buttonText}>Enviar</Text>
                </TouchableOpacity>
                <View style={FormStyles.links}>
                    <Button
                    onPress={() => props.onStateChange('signIn', {})}
                    title="Voltar para Login"
                    color="black"
                    accessibilityLabel="voltar para login"
                    />
                </View>
            </View>
        )
        
    }else{
        return <></>
    }
}