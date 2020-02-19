import React, {Component} from 'react'
import {Text,Button,StyleSheet,View} from 'react-native'

class Home extends Component
{
    scan = () => {
        this.props.navigation.navigate('QRScan')
    }

    generate = () => {
        this.props.navigation.navigate('QRGenerate')
    }
    render()
    {
        return(
        <View>
        <Text style={styles.headerText}>MENU PAGE:</Text>
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
