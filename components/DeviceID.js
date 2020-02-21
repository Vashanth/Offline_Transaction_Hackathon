import React,{Component} from 'react'
import {Text,View,StyleSheet,Button,TextInput} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

class DeviceID extends Component
{
    state={
        DeviceID:100,
        amount:100
    }

    fun = async() => {
        let balance=await AsyncStorage.getItem('balance')
        if(parseInt(balance)-parseInt(this.state.amount)>=0)
        {
        await AsyncStorage.setItem('balance',(parseInt(balance)-parseInt(this.state.amount)).toString())
        this.props.navigation.navigate('QRGenerate',this.state)
        }
        else 
        console.warn("Insufficient balance")
    }

    render()
    {
        return(
            <>
              <View style = {styles.modal}>  
        <Text style = {styles.text}>Enter the details:{"\n"}</Text> 
        <TextInput
            placeholder='Device ID'
            keyboardType='numeric'
            style={{height: 40,width:140, borderColor: 'gray', borderWidth: 1,margin:10,backgroundColor:'white'}}
            onChangeText={(DeviceID) => this.setState({DeviceID})}
            value={this.state.DeviceID}
        />
        <TextInput
            placeholder='Amount'
            keyboardType='numeric'
            style={{height: 40,width:140, borderColor: 'gray', borderWidth: 1,backgroundColor:'white'}}
            onChangeText={(amount) => this.setState({amount})}
            value={this.state.amount}
        />
        <Text>{"\n"}</Text>
              <Button color="black" title=" Generate " onPress ={this.fun}/>  
          </View>  
            </>
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

export default DeviceID