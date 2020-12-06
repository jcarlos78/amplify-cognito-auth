import {StyleSheet, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;

export const FormStyles = StyleSheet.create({
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