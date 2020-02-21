import React, {Component} from 'react'
import {Text, StyleSheet,View} from 'react-native'
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-community/async-storage';

var aesjs = require('aes-js')

class QRGenerate extends Component
{
    state = {
        DeviceID:"",
        amount:"",
        hashValue:"",
    }

    componentWillMount()
    {
        this.setState({
            DeviceID:this.props.navigation.state.params.DeviceID.toString(),
            amount:this.props.navigation.state.params.amount.toString()
        })
        const  str=(this.props.navigation.state.params.DeviceID.toString()+"-"+this.props.navigation.state.params.amount.toString())
        this.encrypt(str)
    }

    encrypt = (stri) =>{
        var ar = stri.split('-');
        var DeviceID = ar[0]
        var amount = ar[1]
        
        let str=DeviceID
        let noOfx = 16-amount.length - DeviceID.length
        for(let i=0;i<noOfx;i++)
            str+='x'
        str+=amount

        var textAsBytes = aesjs.utils.utf8.toBytes(str)
        var key = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3];
        var aes = new aesjs.AES(key);
         
        // encrypt...
        var encryptedBytes = aes.encrypt(textAsBytes);
        console.log(encryptedBytes);
        // [136, 15, 199, 174, 118, 133, 233, 177, 143, 47, 42, 211, 96, 55, 107, 109] 
         
        // To print or store the binary data, you may convert it to hex
        var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
        console.log(encryptedHex);
        // "880fc7ae7685e9b18f2f2ad360376b6d"
         this.setState({hashValue:encryptedHex})
        
    }

    render()
    {
        return(
            <View style={styles.viewStyle}>
            <QRCode
            value={this.state.hashValue}
            size={250}
          />
          </View>
        )
    }
}

const styles = StyleSheet.create({
    viewStyle:{
        padding:50,
        margin:10
    }
})

export default QRGenerate
