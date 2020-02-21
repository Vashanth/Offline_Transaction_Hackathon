import {createStackNavigator}  from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import Home from '../components/Home'
import QRScan from '../components/QRScan'
import QRGenerate from '../components/QRGenerate'
import DeviceID from'../components/DeviceID'
import Online from '../components/Online'
const screens = {
    Home : {
        screen:Home
    },
    QRScan : {
        screen:QRScan
    },
    QRGenerate : {
        screen:QRGenerate
    },
    DeviceID: {
        screen:DeviceID
    },
    Online:{
        screen:Online
    }
}

export default createAppContainer(createStackNavigator(screens))