import React, {Component} from 'react'
import {Text, StyleSheet,View} from 'react-native'
import QRCode from 'react-native-qrcode-svg';

class QRGenerate extends Component
{
    state = {
        data:"900-12100"
    }
    render()
    {
        const str = this.state.amount+";"+this.state.deviceId
        return(
            <View style={styles.viewStyle}>
            <QRCode
            value={this.state.data}
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
