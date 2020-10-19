import React, {useState} from 'react'
import {
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Alert
} from 'react-native'
import Amplify from 'aws-amplify';
import {Auth} from 'aws-amplify'
import {validateEmail,validatePassword} from '../validation'
import awsconfig from '../../aws-exports';

Amplify.configure(awsconfig);

const windowWidth = Dimensions.get('window').width;

export default function SignUp(props){
    
    const [state, setState] = useState({
        email: '',
        password: '',
    });
    const [error,setErrors] = useState({
        email:'',password:''
    });

    async function onSubmit() {
        const emailError = validateEmail(state.email);
        const passwordError = validatePassword(state.password);
        if(emailError || passwordError) {
            setErrors({email:emailError,password:passwordError});
        }else{
            try{
                console.log({
                    username: state.email,
                    password: state.password,
                })
                const user = await Auth.signUp({
                    username: state.email,
                    password: state.password,
                });
            }catch(errorMsg){
                Alert.alert(errorMsg);
            }
        }
    }

    if(props.authState === 'signUp'){
        return (
            <View style={styles.container}>
                <Text style={styles.title}>SignUp</Text>
                <Text style={styles.label}>Email:</Text>
                <TextInput
                style={styles.input}
                onChangeText={(text) => setState({...state, email: text.toLowerCase()})}
                placeholder="Seu email"
                value={state.email}
                />
                <Text style={styles.error}>{error.email}</Text>
                <Text style={styles.label}>Senha:</Text>
                <TextInput
                style={styles.input}
                onChangeText={(text) => setState({...state, password: text})}
                placeholder="Sua senha"
                value={state.password}
                />
                <Text style={styles.error}>{error.password}</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onSubmit()}>
                    <Text style={styles.buttonText}>Press Here</Text>
                </TouchableOpacity>
                <View style={styles.links}>
                    <Button
                    onPress={() => props.onStateChange('signIn', {})}
                    title="Voltar para Login"
                    color="black"
                    accessibilityLabel="Voltar para Login"
                    />
                    <Button
                    onPress={() => props.onStateChange('confirmSignUp', {})}
                    title="Confirmar código"
                    color="black"
                    accessibilityLabel="Confirmar código"
                    />
                </View>
            </View>
        )
    }else{
        return <></>
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        height:'100%',
        justifyContent : 'center',
        width : windowWidth,
        padding: 20,
    },
    button: {
        backgroundColor : '#4682B4',
        height : 40,
        borderRadius : 5,
        justifyContent:'center',
    },
    buttonText: {
        textTransform: 'uppercase',
        color:'white',
        textAlign:'center',
    },
    input: { 
        height: 40, 
        borderColor: 'lightgray', 
        borderWidth: 1,
        marginBottom: 5,
        borderRadius: 5,
        padding: 10,
    },
    links:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    label: {
        marginLeft: 5,
        marginBottom: 5,
    },
    error: {
        color: 'red',
        paddingBottom: 10,
        marginLeft: 5,
    },
  });