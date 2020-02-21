import React,{Component} from 'react'
import axios  from 'axios'
import {TextInput,StyleSheet,View,Text,Button, Alert} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
class Online extends Component
{
    state={
        name:"",
        password:""
    }

    handleSubmit = async() => {
        await axios.post('https://guarded-everglades-05881.herokuapp.com/auth/login',this.state)
        .then(async(res)=>{
            console.log(res.data.token)
            await AsyncStorage.setItem('tokens',res.data.token)

        }).catch(e=>{
            this.setState({name:"",password:""})
            Alert.alert("Wrong credentials")
    })

    }

    render()
    {
        return(
        <View style = {styles.modal}>  
        <Text style = {styles.text}>Enter credentials:{"\n"}</Text> 
        <TextInput
            placeholder='Name'
            style={{height: 40,width:200, borderColor: 'gray', borderWidth: 1,margin:10,backgroundColor:'white',borderRadius:10}}
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
        />
        <TextInput
            placeholder='Password'
            secureTextEntry={true}
            style={styles.default}
            style={{height: 40,width:200, borderColor: 'gray', borderWidth: 2,backgroundColor:'white',borderRadius:10}}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
        />
        <Text>{"\n"}</Text>
              <Button color="black" title=" LOGIN " onPress ={this.handleSubmit}/> 
          </View> 
        )
    }
}

const styles = StyleSheet.create({  
    container: {  
      flex: 1,  
      alignItems: 'center',  
      justifyContent: 'center',  
      backgroundColor: '#ecf0f1',  
    },  
    modal: {  
    justifyContent: 'center',  
    alignItems: 'center',   
    backgroundColor : "#00BCD4",   
    height: 300 ,  
    width: '80%',  
    borderRadius:10,  
    borderWidth: 1,  
    borderColor: '#fff',    
    marginTop: 80,  
    marginLeft: 40,  
     
     },  
     text: {  
        color: '#3f2949',  
        marginTop: 10 ,
        fontSize:20 
     }  
  });  


export default Online