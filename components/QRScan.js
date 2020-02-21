'use strict';
import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import AsyncStorage from '@react-native-community/async-storage';

class QRScan extends PureComponent {
    state = {
        barcodes: [],
        count:0
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

  barcodeRecognized = async({ barcodes }) => {
    if(this.state.count==0)
    {
        console.warn(barcodes[0].data)
        const str = barcodes[0].data.split('*').reverse().join('')
        const ar=str.split('-')
        const DeviceId = await AsyncStorage.getItem('DeviceID')

        if(ar[0]==DeviceId)
        {
          this.setState({count:1})
          let currBalance = await AsyncStorage.getItem('balance')
            currBalance=parseInt(currBalance)+parseInt(ar[1])
            console.log(currBalance)
            await AsyncStorage.setItem('balance',currBalance.toString())
        }
        this.setState({ barcodes });
    }
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