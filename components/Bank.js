import React, {Component} from 'react'
import {Text,Button,TextInput,View, Alert,StyleSheet} from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
class Bank extends Component
{
    state={
        amount:"",
        bankBalance:100
    }

    putBank = async() =>{
        const amount=this.state.amount
        let bal = await AsyncStorage.getItem('balance')
        if(this.state.amount<bal)
        {
            await axios.put('https://guarded-everglades-05881.herokuapp.com/payment/put/',{amount})
            .then(res=>{
                Alert.alert("Succesful Transaction Hooray!")
            }).catch(e=>Alert.alert(e.message))        
        }
        else{
            Alert.alert("Insufficient funds")
        }
    }

    render()
    {
        return(
            <View>
                <TextInput
                    placeholder='Amount'
                    keyboardType='numeric'
                    style={{height: 40,width:300, borderColor: 'gray', borderWidth: 1,marginLeft:25,marginTop:30, backgroundColor:'white',borderRadius:10}}
                    onChangeText={(amount) => this.setState({amount})}
                    value={this.state.amount}
                />
            <Text>{"\n"}</Text>
            <Button title="Put into Bank" color="red" onPress={this.putBank}/>
        <Text>{"\n"}</Text>
            <Button title="Get from Bank" color="red" onPress={this.getBank}/>
        <Text>{"\n"}</Text>
            <Text style={{fontSize:15,fontWeight:'bold'}}>                     BALANCE IN BANK:</Text>
            <View style={styles.square}>
                <Text style={styles.textStyle}>      ₹{this.state.bankBalance}</Text>
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerText:{
        padding:15,
        fontSize:20,
        alignContent:"center"
    },
    viewStyle:{
        padding:10,
        margin:10
    },
    square: {
        width: 200,
        height: 50,
        backgroundColor: 'lightgreen',
        marginLeft:80,
        marginTop:20,
        borderStyle:'dotted',
        borderWidth:2
    },
    textStyle:{
        fontSize:25,
        fontWeight:'bold'
    }
})


export default Bank