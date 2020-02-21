import React, {Component} from 'react'
import {Text,Button,StyleSheet,View,Modal,Image, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

class Home extends Component
{
    state = {
        MyID : Math.floor((Math.random() * 999999) + 100000),
        balance:0
    }

    componentWillMount()
    {
        this.setDeviceID()
        this.getBalance()
    }

    componentDidUpdate()
    {
        this.getBalance()
    }

    setDeviceID = async() => {
        try{
            await AsyncStorage.setItem('DeviceID',this.state.MyID.toString())
        }
        catch(e){}
    }

    storeBalance = async () => {
        try {
          await AsyncStorage.setItem('balance', '10000')
        } catch (e) {}
      }

      getBalance = async () => {
        try {
          const value = await AsyncStorage.getItem('balance')
          if(value !== null) {
            this.setState({balance:parseInt(value)})
          }
          else
          this.storeBalance()
        } catch(e) {}
      }

      updateBalance = (e) => {
          console.log(e)
      }

    scan = () => {
        this.props.navigation.navigate('QRScan',this.state.MyID)
    }

    generate = () => {
        this.props.navigation.navigate('DeviceID')
    }
    render()
    {
        return(
        <View>
        <Text style={styles.headerText}>DEVICE ID = ( {this.state.MyID} )</Text>
        <View style={styles.viewStyle}>
            <Button title="QR Scanner" color="red" onPress={this.scan}/>
        <Text>{"\n"}</Text>
            <Button title="QR Generator" color="red" onPress={this.generate}/>
        </View>

        <Text style={{fontSize:15,fontWeight:'bold'}}>                     BALANCE IN WALLET:</Text>
        <View style={styles.square}>
        <Text style={styles.textStyle}>      {this.state.balance}</Text>
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
        backgroundColor: 'lightgray',
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

export default Home
