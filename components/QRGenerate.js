import React, {Component} from 'react'
import {Text, StyleSheet,View} from 'react-native'
import QRCode from 'react-native-qrcode-svg';

class QRGenerate extends Component
{
    state = {
        DeviceID:"",
        amount:"",
    }

    componentWillMount()
    {
        this.setState({
            DeviceID:this.props.navigation.state.params.DeviceID.toString(),
            amount:this.props.navigation.state.params.amount.toString()
        })
    }

    render()
    {
        const  str=this.state.DeviceID+"-"+this.state.amount
        console.log(this.state.DeviceID)
        return(
            <View style={styles.viewStyle}>
            <QRCode
            value={str}
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
