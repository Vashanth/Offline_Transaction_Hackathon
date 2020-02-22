'use strict';
import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, Alert, BackHandler } from 'react-native';
import { RNCamera } from 'react-native-camera';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationEvents} from 'react-navigation'
// import RNExitApp from 'react-native-exit-app'
var aesjs = require('aes-js')

class QRScan extends PureComponent {
    state = {
        barcodes: [],
        count:0
      }
      componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
      }
      handleBackButton(){
         
      }
 
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={this.barcodeRecognized}
        >
        </RNCamera>

      </View>
    );
  }

  decrypt = (encryptedHex) => {
    var key = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3];
    var aes = new aesjs.AES(key);
    var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);
    var decryptedBytes = aes.decrypt(encryptedBytes);
    // [65, 66, 108, 111, 99, 107, 73, 115, 49, 54, 66, 121, 116, 101, 115, 33]
    
    
    // decode the bytes back into our original text
    var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);

    return decryptedText
}

  barcodeRecognized = async({ barcodes }) => {
    if(this.state.count==0)
    {
      let i=0
        const intermediateStr = this.decrypt(barcodes[0].data)

       let DeviceID = ""
        let amount=""
        for(i=0;i<intermediateStr.length;i++)
        if(intermediateStr[i]=='x')
          break
        else
          DeviceID+=intermediateStr[i]

        for(let j=i;j<intermediateStr.length;j++)
        if(intermediateStr[j]=='x')
          continue
        else
          amount+=intermediateStr[j]

        const DeviceId = await AsyncStorage.getItem('DeviceID')

        if(DeviceID==DeviceId)
        {
          this.setState({count:1})
          let currBalance = await AsyncStorage.getItem('balance')
          console.log("hai",currBalance,amount)
            currBalance=parseInt(currBalance)+parseInt(amount)
            console.log(currBalance)
            await AsyncStorage.setItem('balance',currBalance.toString())
        }
        else
        {
          console.warn("Wrong Device ID")
        }
        this.setState({ barcodes });
    }
    //RNExitApp.exitApp();
    BackHandler.exitApp();
    // this.props.navigation.goBack()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default QRScan