import React, {useState} from 'react'
import {View,Text,Button,TextInput} from 'react-native'

export default function SignUp(props){
    const [state, setState] = useState({
        email: '',
        password: '',
    });

    if(props.authState === 'signUp'){
        return (
            <View>
                <Text>SignUp</Text>
                <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={(text) => setState({...state, email: text})}
                value={''}
                />
                <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={(text) => setState({...state, password: text})}
                value={''}
                />
                <Button
                onPress={() => props.onStateChange('signIn', {})}
                title="Voltar para Login"
                color="#841584"
                accessibilityLabel="Voltar para Login"
                />
                <Button
                onPress={() => props.onStateChange('confirmSignUp', {})}
                title="Confirmar código"
                color="#841584"
                accessibilityLabel="Confirmar código"
                />
            </View>
        )
    }else{
        return <></>
    }
}