import React, {Component} from 'react'
import {Text,Button,StyleSheet,View,Modal} from 'react-native'

class Home extends Component
{
    state = {
        MyID : Math.floor((Math.random() * 999999) + 100000)
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
    }
})

export default Home
